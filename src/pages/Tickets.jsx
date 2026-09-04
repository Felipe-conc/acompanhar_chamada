import { useState, useEffect } from "react";
import { IconShieldCheck } from '@tabler/icons-react';
import { Megaphone, Ticket, ClockFading } from 'lucide-react';
import { useLocation, Link } from "react-router-dom";
import { informacaoSenha, ultimasSenhasChamadas } from '../services/senhaService';
import { TicketContext } from "../context/TicketContext";
import Carousel from "../components/Carousel";
import { useContext } from "react";
import rice from "../assets/rice.webp"


function Tickets() {    
    const [isSenhaChamada, setIsSenhaChamada] = useState(false);
    const [possuiSenha, setPossuiSenha] = useState(false);
    const [ultimasSenhas, setUltimasSenhas] = useState([]);
    const [senhaChamadaAgora, setSenhaChamadaAgora] = useState("");

    const { ticket, toggleTicket } = useContext(TicketContext);
    const location = useLocation();   

    const array_senha = location.state?.[0];
    const siglaSenhaApi = array_senha?.sigla;
    const sequencial = array_senha?.sequencial;
    
    const sigla_senha = array_senha
        ? `${siglaSenhaApi}-${String(sequencial).padStart(4, "0")}`
        : ticket || "•••";
    
    useEffect(() => {
        async function buscarSenhas() {
            if (sigla_senha !== "•••") {
                const sigla = sigla_senha.split("-");
                const senhas = await ultimasSenhasChamadas(sigla[0]);
                setUltimasSenhas(senhas);
            }
        }
        
        buscarSenhas();
    }, []);

    useEffect(() => {
        if (ultimasSenhas.length > 0) {
            const senha = ultimasSenhas[0];
            
            const sigla_senha = senha.sigla + "-" + String(senha.sequencial).padStart(4, "0");

            setSenhaChamadaAgora(sigla_senha);
        }
    }, [ultimasSenhas]);
    
    useEffect(() => {
        if (array_senha) {
            toggleTicket(sigla_senha);
        }
    }, [array_senha?.id_senha]);

    useEffect(() => {
        setPossuiSenha(Boolean(location.state?.[0] || ticket));
    }, [location.state]);

    useEffect(() => {
        if (possuiSenha && !isSenhaChamada) {
            const timer = setInterval(async () => {
                console.log(
                    "Timer executado:",
                    new Date().toLocaleTimeString()
                );
                const response = await informacaoSenha(sigla_senha);

                const sigla = sigla_senha.split("-");
                const senhas = await ultimasSenhasChamadas(sigla[0]);
                setUltimasSenhas(senhas);

                if (response[0]?.data_chamado) {
                    setIsSenhaChamada(!isSenhaChamada);
                }
            }, 2000);

            return () => clearInterval(timer);
        }
    }, [possuiSenha, isSenhaChamada, array_senha]);

    return (
        <div className="flex flex-col m-3 gap-3">
            {isSenhaChamada ? (
                <div className="flex flex-row justify-around p-4 gap-7 border border-gray-300 rounded-xl items-center text-green-600 font-semibold shadow-sm">
                    <div className="w-25 h-25 bg-green-100 rounded-full flex justify-center items-center">
                        <Ticket size={75} className="rotate-150" />
                    </div>
                    <span className="border h-20 border-gray-200"></span>
                    <div className="flex flex-col items-center">
                        <h2 className="text-xl">Senha chamada!</h2>
                        <h1 className="text-4xl font-bold">{ ticket ?  sigla_senha  : "•••" }</h1>
                        <span className="flex w-48 h-8 gap-2 rounded-full bg-green-100 justify-center items-center">Dirija-se ao guichê 03</span>
                    </div>
                </div>
            ) : (
                <div className="flex flex-row justify-around p-4 gap-7 border border-gray-300 rounded-xl items-center text-primary font-semibold shadow-sm">
                    <div className="w-25 h-25 bg-blue-100 rounded-full flex justify-center items-center">
                        <Ticket size={75} className="rotate-150" />
                    </div>
                    <span className="border h-20 border-gray-200"></span>
                    <div className="flex flex-col items-center">
                        <h2 className="text-xl">Sua senha </h2>
                            <h1 className="text-4xl max-[398px]:text-3xl font-bold">{ ticket ?  sigla_senha  : "•••" }</h1> 
                        <span className="flex w-40 h-8 gap-2 rounded-full bg-blue-100 justify-center items-center"><ClockFading /> Aguardando</span>
                    </div>
                </div>
            )}                                    
            <div className="flex flex-row items-center justify-between p-6 gap-20 border border-gray-300 rounded-xl text-white bg-blue-900 font-medium shadow-md">
                <div>
                    <h2 className="text-md">Última senha chamada</h2>
                    <h1 className="text-3xl font-bold">{ senhaChamadaAgora ? senhaChamadaAgora : "•••" }</h1>
                    {/* <p>Guichê 3</p> */}
                </div>
                <div>
                    <Megaphone size={75} />
                </div>                
            </div> 

            <div className="flex flex-col p-4 gap-3 border border-gray-300 rounded-xl text-black font-medium shadow-sm">
                <div className="flex flex-row justify-between items-center">
                    <h2 className="text-md justify-start">Últimas Chamadas</h2>
                    <Link to="/historico-senhas" className="flex justify-center items-center rounded-md h-6 w-20 bg-blue-100 text-primary text-xs hover:border">Ver todas</Link>
                </div>
                
                <div className="flex flex-col w-full gap-2">
                    {ultimasSenhas.map((senha, index) => {
                        let sigla_senha = "";

                        sigla_senha = senha.sigla + "-" + String(senha.sequencial).padStart(4, 0);
                        const data = new Date(senha.data_chamado);
                        const hora = data.toLocaleTimeString("pt-BR", {
                            hour: "2-digit",
                            minute: "2-digit"
                        });

                        return (
                            <div key={index} className="flex flex-col w-full gap-2">
                                <div className="flex flex-row justify-between items-center">
                                    <h1 className="w-35">{sigla_senha}</h1>
                                    <div className="flex flex-1 justify-between">
                                        <small>Guichê 3</small>
                                        <small className="right-0">{hora}</small>
                                    </div>
                                </div>
                                {index < ultimasSenhas.length - 1 && (
                                    <span className="border-t border-gray-200"></span>
                                )}
                            </div>
                        );
                    })}

                </div>
            </div>            
            {/* <div className="mt-1 bottom-0 flex justify-center gap-2">
                <IconShieldCheck size={18} className="text-blue-600"/>
                <small>Atualizado em tempo real</small>                
            </div> */}
            <div className="flex flex-col p-4 border border-gray-300 rounded-xl text-black shadow-sm">
                <h1 className="font-bold text-xl">Ofertas para você</h1>
                <p className="text-sm text-gray-500">Aproveite descontos especiais</p>
                <div className="flex flex-row gap-3 justify-around w-full mt-3">
                    <Carousel />
                    {/* <div className="flex flex-col flex-1 h-55 border border-gray-300 rounded-md">
                        <div className="absolute p-1 m-1 text-sm text-white font-bold bg-red-600 rounded-xl">
                            -15%
                        </div>
                        <div className="flex-1 bg-gray-200 border border-gray-200 rounded-t-md overflow-hidden">
                            <img src={rice} alt="Sem senha" className="w-full h-full object-contain" />
                        </div>
                        <div className="p-2">
                            <h2 className="text-md text-red-600 font-bold">R$ 23,50 <span className="text-gray-500 font-light text-xs line-through">R$ 27,50</span></h2>
                            <h3 className="text-xs">Arroz São João 5kg</h3>
                        </div>
                    </div>

                    <div className="flex flex-col flex-1 h-55 border border-gray-300 rounded-md">
                        <div className="absolute p-1 m-1 text-sm text-white font-bold bg-red-600 rounded-xl">
                            -15%
                        </div>
                        <div className="flex-1 bg-gray-200 border border-gray-200 rounded-t-md overflow-hidden">
                            <img src={rice} alt="Sem senha" className="w-full h-full object-contain" />
                        </div>
                        <div className="p-2">
                            <h2 className="text-md text-red-600 font-bold">R$ 23,50 <span className="text-gray-500 font-light text-xs line-through">R$ 27,50</span></h2>
                            <h3 className="text-xs">Arroz São João 5kg</h3>
                        </div>
                    </div> */}
                </div>
            </div>
        </div>
    );
}

export default Tickets;
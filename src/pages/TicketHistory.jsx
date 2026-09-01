import { useEffect, useState } from "react";
import { filaSenhas } from "../services/senhaService";
import imagemSemSenha from "../assets/sem_senha_historico.png"

function TicketHistory() {
    const [senhas, setSenhas] = useState([]);

    useEffect(() => {
        async function buscarSenhas() {
            const response = await filaSenhas();
            setSenhas(response);
        }

        buscarSenhas();

        const timer = setInterval(buscarSenhas, 3000);

        return () => clearInterval(timer);

    }, []);
    
    return (        
        <div className="flex flex-col m-3">
            <h1 className="flex justify-center text-3xl font-bold my-3">Histórico de<span className="text-primary ml-2">Senhas</span></h1>

            {!senhas.length && (
                <div className="flex flex-col items-center justify-center ">
                    <img src={imagemSemSenha} alt="Sem senha" className="mt-10 w-90 hover:scale-105 transition-transform" />
                    <h1 className="font-medium text-xl">Nenhuma senha encontrada</h1>
                    <p className="text-center text-gray-500">Ainda não há registros de senhas <span className="block">no histórico</span></p>
                </div>
            )}
            
            {senhas.map((senha) => {       
                const sigla = senha.sigla + "-" + String(senha.sequencial).padStart(4, 0);
                const data = new Date(senha.data_chamado ? senha.data_chamado : senha.data_emissao);
                const dataFormatada = data.toLocaleDateString("pt-BR");
                const hora = data.toLocaleTimeString("pt-BR", {
                    hour: "2-digit",
                    minute: "2-digit"
                });
                return (
                    <div key={senha.id_senha} className="flex flex-col border border-gray-200 shadow-sm hover:shadow-md transition rounded-xl my-1 p-3 text-gray-700 ">
                        <div className="flex items-center justify-between">
                            <h1 className="font-bold text-2xl text-black">{sigla}</h1>
                            <p>{senha.data_chamado ? <p className="text-green-600 font-semibold">Atendido</p> : <p className="text-yellow-500 font-semibold">Aguardando</p>}</p>
                            {/* <p>{dataFormatada}</p> */}
                        </div>
                        <div className="flex justify-between">
                            <h1 className="">Guichê 04</h1>
                            <p>{senha.data_chamado ? hora : ""}</p>
                        </div>
                    </div>
                )
            })}
        </div>
    )

// data_chamado: "2026-08-27 10:04:20"
// data_emissao: "2026-08-27 09:17:54"
// id_senha: "4709E847-A0E6-43FE-AA77-C49F3CA560BD"
// prioridade: 0
// sequencial: 13
// sigla: "CN"
    
}

export default TicketHistory;
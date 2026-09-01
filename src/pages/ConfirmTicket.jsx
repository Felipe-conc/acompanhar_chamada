import { useLocation, useNavigate } from "react-router-dom";
import { ChevronLeft, Ticket } from 'lucide-react';
import { criarSenha } from "../services/senhaService"
import { TicketContext } from "../context/TicketContext";
import { useContext } from "react";
import Button from "../components/Button";

function ConfirmTicket() {
    const location = useLocation();
    const { nome, sigla } = location.state || {};
    const { toggleTicket } = useContext(TicketContext);
    const navigate = useNavigate();

    async function retirarSenha() {
        const response = await criarSenha(sigla);            
        const sigla_senha = response[0].sigla + "-" + String(response[0].sequencial).padStart(4, "0");
        toggleTicket(sigla_senha);
        
        navigate("/senhas", {
            state: response
        });
    }

    return (
        <div className="flex flex-col p-6 items-center">
            {/* <button
                type="button"
                className="flex mr-auto gap-3 mb-3 text-primary font-semibold"
                onClick={() => {
                    navigate("/");
                }}
            >                
                <ChevronLeft />
                Voltar
            </button> */}
            <div className="flex flex-col justify-center items-center gap-4 w-full">
                <div className="flex justify-center items-center p-3 w-25 h-25 bg-blue-100 text-blue-600 rounded-full">
                    <Ticket size={50} className='rotate-150' />
                </div>
                <h1 className="text-2xl font-bold">{nome}</h1>            
                <p className="text-center">Você está retirando uma senha <br /> para {nome}</p>
                <div className="flex flex-col w-full gap-2 ">
                    <Button name="Clique para pegar sua senha" variant="filled" onClick={retirarSenha} />
                    <Button name="Cancelar" to="/" />
                </div>
            </div>
        </div>
    );
}

export default ConfirmTicket;
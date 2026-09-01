import { useEffect } from "react";
import MenuSenha from "../components/MenuSenha";
import { ultimaSenhasChamadas } from "../services/senhaService";
function TakeTicket() {
    useEffect(() => {
        ultimaSenhasChamadas();
    }, [])
    return (
        <div className="flex flex-col h-full p-6 w-full text-black">
            <h1 className="text-4xl font-bold ml-3">Retire sua <span className='text-primary'>senha</span></h1>
            <p className="mt-2 mb-4 ml-3 text-gray-500">Selecione o tipo de atendimento <br/> para continuar</p>
  
            <MenuSenha />
            {/* <div className="mt-2">
                <Button name="Voltar" variant="filled" to="/"/>
            </div> */}
        </div>
    );
}

export default TakeTicket;
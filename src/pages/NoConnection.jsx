import { WifiOff } from 'lucide-react';
import Button from '../components/Button';

function NoConnection() {
    return (
        <div className='flex flex-col items-center justify-center p-10 gap-8'>
            <div className='flex items-center justify-center border border-gray-300 bg-gray-200 rounded-full h-45 w-45 text-gray-700'>
                <WifiOff size={95} />
            </div>
            <div className='flex flex-col gap-8 w-full items-center'>
                <div>
                    <h1 className='font-bold text-3xl text-center'>Sem Conexão</h1>
                    <p className='mt-3 text-center'>Não foi possível atualizar <span    className='block'>as informações</span></p>
                </div>                
                
                <ul className="list-disc ml-5">
                    <li>Verifique sua conexão <span className='block'>com a internet</span></li>
                    <li>Tente novamente em <span className='block'>alguns instantes</span></li>
                </ul>

                <div className='mt-8 w-full'>
                    <Button name='Tentar Novamente' variant='filled' to='/' />
                </div>                
            </div>            
        </div>
    );
}

export default NoConnection;
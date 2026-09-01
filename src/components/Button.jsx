import { IconQrcode } from '@tabler/icons-react';
import { Link } from 'react-router-dom';

function Button(props) {
    const conteudo = (
        <>
            {props.icon === 'qrcode' ? <IconQrcode className='' /> : ''}
            {props.name}            
            
            {props.isLoading &&(
                <div className='w-5 h-5 ml-2 rounded-full border-3 border-t-transparent  animate-spin'></div>        
            )}
        </>
    );

    const className = `
        flex w-full items-center justify-center p-5 rounded-xl font-bold shadow-md 
        transform transition-all active:scale-[0.98]
        ${props.variant === 'filled'
            ? 'bg-primary text-white hover:bg-[#1D4ED8]'
            : 'bg-transparent border-2 border-primary text-primary hover:bg-[#EFF6FF]'}
        ${props.icon ? 'gap-1' : ''}
    `;

    return props.to ? (
        <Link
            to={props.to}
            state={props.state}
            className={className}>
            
            {conteudo}
        </Link>
    ) : (
        <button 
            type='button'
            className={className}
            onClick={props.onClick}
        >            
                {conteudo}
        </button>
    );   
}

export default Button;
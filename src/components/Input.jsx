import { IconTicket } from '@tabler/icons-react';

function Input(props) {
    return (        
        <input
            type="text"
            placeholder={props.placeholder}
            className="p-4 rounded-xl border border-gray-100 shadow-md focus:ring-2 focus:ring-primary transition duration-200 ease-out outline-none"
            />
    );
}

export default Input;
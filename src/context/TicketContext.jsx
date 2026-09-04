import { createContext, useState } from "react";
import { v4 as uuidv4 } from 'uuid';

export const TicketContext = createContext();

export const TicketProvider = ({ children }) => {
    const [ticket, setTicket] = useState("");

    const [browserId] = useState(() => {
        let id = localStorage.getItem("browserId");

        if (!id) {            
            id = uuidv4();

            localStorage.setItem("browserId", id);
        }

        return id;
    });

    const toggleTicket = (ticket) => {
        setTicket(ticket);
    };

    return (
        <TicketContext.Provider value={{ ticket, toggleTicket, browserId }}>
            {children}
        </TicketContext.Provider>
    );
};
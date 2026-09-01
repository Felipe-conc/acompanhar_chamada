import { createContext, useState } from "react";

export const TicketContext = createContext();

export const TicketProvider = ({ children }) => {
    const [ticket, setTicket] = useState("");

    const [browserId] = useState(() => {
        let id = localStorage.getItem("browserId");

        if (!id) {
            id = crypto.randomUUID();
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
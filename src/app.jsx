import { Route, Routes } from "react-router-dom";
import NavBar from "./components/NavBar";
import Tickets from "./pages/Tickets";
import TakeTicket from "./pages/TakeTicket";
import ConfirmTicket from "./pages/ConfirmTicket";
import TicketHistory from "./pages/TicketHistory";

function App() {
    return (
        <div className="min-h-screen flex flex-col">
            <NavBar />

            <main className="flex-1">
                <Routes>
                    <Route path="/" element={<TakeTicket />} />
                    <Route path="/senhas" element={<Tickets />} />
                    <Route path="/confirmar-senha" element={<ConfirmTicket />} />
                    <Route path="/historico-senhas" element={<TicketHistory />} />
                    <Route path="*" element={<h1>Not found</h1>} />
                </Routes>
            </main>
        </div>
    );
    
}

export default App;
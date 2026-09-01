import { NavLink } from "react-router-dom";
import { Menu } from "@boxicons/react";
import { IconHome, IconKey, IconHistory, IconX, IconMoon, IconSun } from '@tabler/icons-react';
import Logo from '../assets/logoLucedata_HD.png'
import { useState } from "react";

function NavBar() {

    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [darkMode, setDarkMode] = useState(false);

    const mobileLinkCss = ({ isActive }) => `flex rounded-2xl w-full hover:bg-blue-100 transition-color duration-300 p-4 ${isActive ? "text-primary bg-blue-50" : ""}`;

    return (
        <nav className="relative z-50 flex justify-between items-center text-white bg-primary py-6 px-6">
            <NavLink to="/"><img src={Logo} alt="Logo Lucedata" className="w-30 hover:scale-105 transition-all" /></NavLink>
            <ul className="hidden xl:flex items-center gap-12 font-semibold text-base">
                <NavLink to="/" className="p-3 hover:bg-sky-400 hover:text-white rounded-md transition-all">Retire sua senha</NavLink>
                <NavLink to="/senhas" className="p-3 hover:bg-sky-400 hover:text-white rounded-md transition-all">Acompanhar senhas</NavLink>
                <NavLink to="/historico-senhas" className="p-3 hover:bg-sky-400 hover:text-white rounded-md transition-all">Histórico</NavLink>
            </ul>

            <Menu className="xl:hidden block size-8 cursor-pointer" onClick={() => setIsMenuOpen(!isMenuOpen)} />
 
            {/* Deixa a tela principal desfocada */}
            {isMenuOpen && (
                <div
                    className="fixed inset-0 z-40 bg-black/50"
                    onClick={() => setIsMenuOpen(false)}
                />
            )}
            <div className={`fixed top-0 right-0 z-50 h-screen w-70 bg-white text-black flex flex-col transition-transform duration-300 ${isMenuOpen ? "translate-x-0" : "translate-x-full"}`}>
                <div className="flex items-center justify-between p-6 top-0 w-full h-20 bg-primary">
                    <h1 className="font-bold text-white text-2xl">Menu</h1>
                    <IconX color="white" className="size-8 hover:cursor-pointer" onClick={() => setIsMenuOpen(!isMenuOpen)} />
                </div>
                
                <div className="p-3">                    
                        <NavLink to="/" className={mobileLinkCss}  onClick={() => setIsMenuOpen(false)}>
                            <IconHome size={25} className="mr-2" /> Retire sua senha
                        </NavLink>

                        <NavLink to="/senhas" className={mobileLinkCss}  onClick={() => setIsMenuOpen(false)}>
                            <IconKey size={25} className="mr-2"/> Acompanhar senhas
                        </NavLink>
                        
                        <NavLink to="/historico-senhas" className={mobileLinkCss}  onClick={() => setIsMenuOpen(false)}>
                            <IconHistory size={25} className="mr-2"/> Histórico
                        </NavLink>
                </div>

                <div className="mt-auto flex items-center justify-between w-full p-5 text-center bottom-0 bg-gray-50 border-t border-gray-300 text-black">
                    <div className="flex gap-2 transition-all duration-300">
                        {darkMode ? (
                            <>
                                <IconMoon /> 
                                <p>Modo Escuro</p>  
                            </>
                            
                        ) : (
                            <>
                                <IconSun />
                                <p>Modo Claro</p>
                            </>
                        )}
                        
                    </div>
                    
                    <button
                        type="button"
                        onClick={() => setDarkMode(!darkMode)}
                        className={`relative h-6 w-11 rounded-full transition-colors duration-300
                        ${darkMode
                                ? "bg-primary"
                                : "bg-gray-300"
                        }`}>
                    
                        <span className={`absolute top-0.5 left-0.5 h-5 w-5 bg-white rounded-full transition-transform duration-300 ${darkMode ? "translate-x-5" : "translate-x-0"}`  }>
                            
                        </span> 
                    </button>                    
                </div>
                
                <div className="w-full p-5 text-center bottom-0 bg-gray-50 border-t border-gray-300 text-gray-500">
                    <small>Acompanhamento de Senha v1.0</small><br />
                    <small>© 2026 Lucedata Tecnologia</small>
                </div>
            </div>
        </nav>
    );
}

export default NavBar;
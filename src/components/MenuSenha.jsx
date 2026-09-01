import { useEffect, useState } from 'react';
import { estruturarMenus } from '../services/menuService'
import { listarTipoSenhas } from '../services/senhaService';
import { ChevronRight, ChevronLeft, Ticket } from 'lucide-react';
import { useNavigate } from "react-router-dom";

function MenuSenha() {
    const [dados, setDados] = useState([]);
    const [senhaSelecionada, setSenhaSelecionada] = useState(null);

    useEffect(() => {
        async function carregarDados() {
            const response = await listarTipoSenhas();
            setDados(response);
        }

        carregarDados();
    }, []);

    const menus = estruturarMenus(dados);

    return (
        <div>
            <RenderizarMenus
                menus={menus}
                onSelecionar={setSenhaSelecionada}
                senhaSelecionada={senhaSelecionada}
            />
        </div>
    );
}

function RenderizarMenus({ menus, onSelecionar, senhaSelecionada }) {
    const navigate = useNavigate();
    const [caminho, setCaminho] = useState([]);
    const menuAtual = caminho[caminho.length - 1]?.filhos ?? menus;

    function abrirMenu(nome, menu) {
        if (Object.keys(menu.filhos).length > 0) {
            setCaminho([...caminho, { nome, filhos: menu.filhos }]);
            return;
        }

        navigate("/confirmar-senha", {
            state: {
                nome,
                sigla: menu.sigla
            }
        });
    }

    return (
        <div>
            {caminho.length > 0 && (
                <button
                    type="button"
                    className="flex items-center gap-3 mb-3 text-primary font-semibold"
                    onClick={() => setCaminho(caminho.slice(0, -1))}
                >
                    <ChevronLeft />
                    Voltar
                </button>                
            )}

            <div className="flex flex-col gap-2">
                {Object.entries(menuAtual).map(([nome, menu]) => {
                    const selecionado = senhaSelecionada?.sigla === menu.sigla;

                    return (
                        <button
                            key={nome}
                            type="button"
                            className={`flex items-center gap-4 bg-white shadow-sm text-black font-semibold p-4 w-full rounded-2xl border border-gray-200 text-left hover:shadow-md transition`}
                            onClick={() => abrirMenu(nome, menu)}
                        >
                            <div className="p-3 bg-blue-100 text-blue-600 rounded-xl">
                                <Ticket size={24} className='rotate-150' />
                            </div>
                            <span className="flex-1 text-left font-medium">{nome}</span>
                            {!menu.sigla && (
                                <ChevronRight />
                            )}
                        </button>
                    );
                })}
            </div>
        </div>
    );
}

export default MenuSenha;
import api from "./api";

export async function listarTipoSenhas() {
    const response = await api.get("/srv1/tipoSenhas");
    return response.data;
}

export async function criarSenha(sigla) {
    const formData = new FormData();

    formData.append("sigla", sigla);
    formData.append("prioridade", "0");

    const response = await api.post("/srv1/criarSenha", formData);

    return response.data;
}

export async function informacaoSenha(senha) {
    const response = await api.get(`/srv1/informacaoSenha/?senha=${senha}`);
    return response.data;
}

export async function filaSenhas() {
    const response = await api.get(`/srv1/listarSenhas`);
    return response.data;
}

export async function ultimasSenhasChamadas(sigla) {
    const response = await api.get(`/srv1/listarSenhas`);
    const array = response.data;
    const senhasChamadas = [];

    array.toReversed().map((item) => {
        if (item?.data_chamado && item?.sigla === sigla) {
            senhasChamadas.push(item);
        }
    });

    const senhasOrdenadas = senhasChamadas.toSorted((a, b) =>
        new Date(b.data_chamado) - new Date(a.data_chamado)
    );  

    return senhasOrdenadas.slice(0, 4);
}
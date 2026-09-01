export function estruturarMenus(dados) {
    const raiz = {};

    dados.forEach(item => {
        const partes = item.ds_senha.split("_");

        let atual = raiz;

        partes.forEach((parte, index) => {
            if (!atual[parte]) {
                atual[parte] = {
                    filhos: {}
                };
            }

            if (index === partes.length - 1) {
                atual[parte].sigla = item.sigla;
            }

            atual = atual[parte].filhos;
        });
    });

    return raiz;
}
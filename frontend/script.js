async function buscarFilmes() {
    const tabelaBody = document.getElementById("tabela-filmes");

    try {
        const resposta = await fetch("http://localhost:3000/filmes");
        
        if (!resposta.ok) {
            throw new Error("Erro ao buscar dados do servidor");
        }

        const filmes = await resposta.json();

        // Limpa as linhas anteriores da tabela
        tabelaBody.innerHTML = "";

        // Adiciona uma nova linha (tr) para cada filme recebido
        filmes.forEach((filme) => {
            tabelaBody.innerHTML += `
                <tr>
                    <td>${filme.id}</td>
                    <td><strong>${filme.title}</strong></td>
                    <td>${filme.genre}</td>
                    <td>${filme.duration} min</td>
                    <td>${filme.age_rating}</td>
                </tr>
            `;
        });
    } catch (erro) {
        console.error("Erro:", erro);
        tabelaBody.innerHTML = `
            <tr>
                <td colspan="5" style="color: red; text-align: center;">
                    Erro ao carregar os filmes. O backend está rodando?
                </td>
            </tr>
        `;
    }
}

buscarFilmes();
const api = "http://localhost:3000/solicitacoes";
const $solicitacoes = document.querySelector(".solicitacoes");
const $formulario = document.querySelector(".formulario");
const $sistema = document.querySelector(".sistema");
const $requisicao = document.querySelector(".requisicao");
const $solicitante = document.querySelector(".solicitante");
const $relevancia = document.querySelector(".relevancia");

const JSClock = () => {
    let tempo = new Date();
    let hora = tempo.getHours();
    let minuto = tempo.getMinutes();
    let segundo = tempo.getSeconds();
    let temp = "" + (hora > 12 ? hora - 12 : hora);
    if (hora == 0) temp = "12";
    temp += (minuto < 10 ? ":0" : ":") + minuto;
    temp += (segundo < 10 ? ":0" : ":") + segundo;
    temp += hora >= 12 ? " P.M." : " A.M.";
    return temp;
}


const solicitacao = {
    id: parseInt(Math.random() * 100),
    data: new Date().getDate() + "/" + new Date().getMonth() + "/" + new Date().getFullYear(),
    hora: JSClock(),
    sistema: $sistema.value,
    requisicao: $requisicao.value,
    solicitante: $solicitante.value,
    relevancia: $relevancia.value,
};



const criarSolicitacao = async (solicitacao) => {
    const response = await fetch(api, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(solicitacao),
    });
    const data = await response.json();
    console.log(data);
}
$formulario.addEventListener("submit", (e) => {
    e.preventDefault();
    criarSolicitacao(solicitacao);
});

const consulta = async () => {
    const response = await fetch(api);
    const data = await response.json();
    data.forEach((solicitacao) => {
        const $div = document.createElement("div");
        $div.innerHTML = `
            <p>${solicitacao.id}</p>
            <p>${solicitacao.data}</p>
            <p>${solicitacao.hora}</p>
            <p>${solicitacao.sistema}</p>
            <p>${solicitacao.requisicao}</p>
            <p>${solicitacao.solicitante}</p>
            <p>${solicitacao.relevancia}</p>
        `;
        $solicitacoes.appendChild($div);
    });
}


consulta();

const aceitar = async (id) => {
    const response = await fetch(api + "/" + id, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            status: "aceito",
        }),
    });
    const data = await response.json();
    console.log(data);
}
const excluir = async (id) => {
    const response = await fetch(api + "/" + id, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            status: "excluido",
        }),
    });
    const data = await response.json();
    console.log(data);
}

const finalizar = async (id) => {
    const response = await fetch(api + "/" + id, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            status: "finalizado",
        }),
    });
    const data = await response.json();
    console.log(data);
}

const atualizarPagina = async () => {
    consulta();
}


const formulario = document.querySelector(".formulario");

const api = "http://localhost:3000/solicitacoes";

const $sistema = document.querySelector(".sistema");
const $requisicao = document.querySelector(".requisicao");
const $solicitante = document.querySelector(".solicitante");
const $relevancia = document.querySelector(".relevancia");

function JSClock() {
    var tempo = new Date();
    var hora = tempo.getHours();
    var minuto = tempo.getMinutes();
    var segundo = tempo.getSeconds();
    var temp = "" + ((hora > 12) ? hora - 12 : hora);
    if (hora == 0)
      temp = "12";
    temp += ((minuto < 10) ? ":0" : ":") + minuto;
    temp += ((segundo < 10) ? ":0" : ":") + segundo;
    temp += (hora >= 12) ? " P.M." : " A.M.";
    return temp;
}
  

document.querySelector(".formulario").addEventListener("submit", (e) => {
    e.preventDefault();
    const solicitacao = {
        id: parseInt(Math.random()*100),
        data: new Date().getDate() + "/" + new Date().getMonth() + "/" + new Date().getFullYear(),
        hora: JSClock(),
        sistema: $sistema.value,
        requisicao: $requisicao.value,
        solicitante: $solicitante.value,
        relevancia: $relevancia.value
    };
    console.log(solicitacao);
    async function postSolicitacao(solicitacao) {
        const response = await fetch(api, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(solicitacao)
        });
        const data = await response.json();
        console.log(data);
    }
    postSolicitacao(solicitacao);
    consulta();
});

const $solicitacoes = document.querySelector(".solicitacoes");

const consulta = async () => {
  const response = await fetch(api);
  const data = await response.json();
    data.forEach(solicitacao => {
        console.log(solicitacao);
        const $solicitacao = document.createElement("div");
        $solicitacao.classList.add("solicitacao");
        for(let key in solicitacao) {
            const $info = document.createElement("p");
            $info.classList.add("info");
            $info.innerHTML = `${key.toLocaleUpperCase()}: ${solicitacao[key]}`;
            $solicitacao.appendChild($info);
        }
        const $button = document.createElement("button");
        $button.classList.add("button-aceite");
        $button.id = solicitacao.id;
        $button.innerHTML = "Aceitar";
        $button.addEventListener("click", (e) => {
            aceita(e.target.id, prompt("Qual desenvolvedor irá atender?"));
        } );
            
        $solicitacao.appendChild($button);
        $solicitacoes.appendChild($solicitacao);
    } );
};
consulta();


const aceita = async(id, desenvolvedor) => {


    const response = await fetch(api + "/" + id, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            status: "Aceito",
            desenvolvedor: desenvolvedor,
            data_aceite: new Date().getDate() + "/" + new Date().getMonth() + "/" + new Date().getFullYear(),
            hora_aceite: JSClock()
        })
    });
    const data = await response.json();
    console.log(data);
    consulta();
};
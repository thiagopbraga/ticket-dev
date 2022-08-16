const formulario = document.querySelector(".formulario");
const $solicitacoes = document.querySelector(".solicitacoes");

const api = "http://localhost:3000/solicitacoes";

const $sistema = document.querySelector(".sistema");
const $requisicao = document.querySelector(".requisicao");
const $solicitante = document.querySelector(".solicitante");
const $relevancia = document.querySelector(".relevancia");

const consulta = async () => {
    const response = await fetch(api);
    const data = await response.json();
    data.forEach((solicitacao) => {
      const $solicitacao = document.createElement("div");
      $solicitacao.classList.add("solicitacao");
      for (let key in solicitacao) {
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
      });
  
      const $button2 = document.createElement("button");
      $button2.classList.add("button-delete");
      $button2.id = solicitacao.id;
      $button2.innerHTML = "Excluir";
      $button2.addEventListener("click", (e) => {
        exclui(e.target.id);
      });
  
      $solicitacao.appendChild($button);
      $solicitacao.appendChild($button2);
      $solicitacoes.appendChild($solicitacao);
      });
  };
  consulta();

function JSClock() {
  var tempo = new Date();
  var hora = tempo.getHours();
  var minuto = tempo.getMinutes();
  var segundo = tempo.getSeconds();
  var temp = "" + (hora > 12 ? hora - 12 : hora);
  if (hora == 0) temp = "12";
  temp += (minuto < 10 ? ":0" : ":") + minuto;
  temp += (segundo < 10 ? ":0" : ":") + segundo;
  temp += hora >= 12 ? " P.M." : " A.M.";
  return temp;
}

document.querySelector(".formulario").addEventListener("submit", async(e) => {
  e.preventDefault();
  $solicitacoes.innerHTML = "";
  const solicitacao = {
    id: parseInt(Math.random() * 100),
    data:
      new Date().getDate() +
      "/" +
      new Date().getMonth() +
      "/" +
      new Date().getFullYear(),
    hora: JSClock(),
    sistema: $sistema.value,
    requisicao: $requisicao.value,
    solicitante: $solicitante.value,
    relevancia: $relevancia.value,
  };
  const postSolicitacao = async () => {
    const response = await fetch(api, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(solicitacao),
    });
    const data = await response.json();
    return data;
};
await postSolicitacao();
await consulta();
});

const aceita = async (id, desenvolvedor) => {
  const response = await fetch(api + "/" + id, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      status: "Aceito",
      desenvolvedor: desenvolvedor,
      data_aceite:
        new Date().getDate() +
        "/" +
        new Date().getMonth() +
        "/" +
        new Date().getFullYear(),
      hora_aceite: JSClock(),
    }),
  });
  const data = await response.json();
  console.log(data);
  $solicitacoes.innerHTML = "";
  await consulta();
};

const exclui = async (id) => {
  if (confirm("Tem certeza que deseja excluir?")) {
    const response = await fetch(api + "/" + id, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
};

$solicitacoes.innerHTML = "";
await consulta();
};

document.querySelector('body').addEventListener ('load', consulta);

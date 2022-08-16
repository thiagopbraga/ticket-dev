/* PESQUISAR CHAVE DESENVOLVEDOR ARQUIVO JSON */
const pesquisar = async () => {
    const response = await fetch(api);
    const data = await response.json();
    const $thiago = document.querySelector("#thiago");
    const $carlos = document.querySelector("#carlos");
    for(let i = 0; i < data.length; i++){
        if(data[i].desenvolvedor == "Thiago"){
            
            $thiago.innerHTML += `
            <div class="chamados">
                <p>Data: ${data[i].data}</p>
                <p>Hora: ${data[i].hora}</p>
                <p>Sistema: ${data[i].sistema}</p>
                <p>Requisição: ${data[i].requisicao}</p>
                <p>Solicitante: ${data[i].solicitante}</p>
                <p>Relevância: ${data[i].relevancia}</p>
                <p>Status: ${data[i].status}</p>
                <p>Desenvolvedor: ${data[i].desenvolvedor}</p>
                <p>Data Aceite: ${data[i].data_aceite}</p>
                <p>Hora Aceite: ${data[i].hora_aceite}</p>
                <button onclick="aceita(${data[i].id}, '${data[i].desenvolvedor}')">Aceitar</button>
                <button onclick="exclui(${data[i].id})">Excluir</button>
            </div>
            `;
        }else if(data[i].desenvolvedor == "Carlos"){
            $carlos.innerHTML += `
            <div class="chamados">
                <p>Data: ${data[i].data}</p>
                <p>Hora: ${data[i].hora}</p>
                <p>Sistema: ${data[i].sistema}</p>
                <p>Requisição: ${data[i].requisicao}</p>
                <p>Solicitante: ${data[i].solicitante}</p>
                <p>Relevância: ${data[i].relevancia}</p>
                <p>Status: ${data[i].status}</p>
                <p>Desenvolvedor: ${data[i].desenvolvedor}</p>
                <p>Data Aceite: ${data[i].data_aceite}</p>
                <p>Hora Aceite: ${data[i].hora_aceite}</p>
                <button onclick="aceita(${data[i].id}, '${data[i].desenvolvedor}')">Aceitar</button>
                <button onclick="exclui(${data[i].id})">Excluir</button>
            </div>
            `;
        }else {
            return 0;
        }
    }
}

pesquisar();
    
    /* forEach((solicitacao) => {
        const $solicitacao = document.createElement("div");
        $solicitacao.classList.add("solicitacao");
        for (let key in solicitacao) {
          const $info = document.createElement("p");
          $info.classList.add("info");
          $info.innerHTML = `${capitalizeFirstLetter(key)}: ${solicitacao[key]}`;
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
    }); */


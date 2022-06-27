let lindoNome = prompt("Seu lindo nome:");
let listaMensagens= [];

//entrar no servidor

let entrando = () => {

    const entrada = {
        name: lindoNome
    };

    let promise = axios.post("https://mock-api.driven.com.br/api/v6/uol/participants", entrada);
    console.log(promise);

    promise.then(receberMensagens)

    promise.catch()

    
    
}

let online = () => {

    let status = {
        name: lindoNome
    }

    let promise = axios.post("https://mock-api.driven.com.br/api/v6/uol/status", status);
    console.log(promise);
}

//acessar mensagens do servidor

let receberMensagens = () => {

    const promise = axios.get('https://mock-api.driven.com.br/api/v6/uol/messages');
    promise.then(respostaRecebida)

}

let respostaRecebida = (resposta) => {

    listaMensagens = resposta.data;

    renderizarMensagem();
}

let spanMensagemStatus = (msg) => {
    
    return `<span class="status">(${msg.time}) <strong>${msg.from}</strong> ${msg.text}</span>`
}

let spanMensagemTodos = (msg) => {
    
    return `<span class="todos">(${msg.time}) <strong>${msg.from}</strong> para <strong>Todos</strong>: ${msg.text}</span>`
}

let spanMensagemPrivada = (msg) => {
    
    return `<span class="privado">(${msg.time}) <strong>${msg.from}</strong> reservadamente para <strong>${msg.to}</strong>: ${msg.text}</span>`
}

let renderizarMensagem = (mensagens) => {

    let conteudo = document.querySelector(".conteudo");
    conteudo.innerHTML = "";

    for(let i = 0; i < listaMensagens.length; i++) {
        let mensagem = listaMensagens[i];

        if(mensagem.type === "status") {
            conteudo.innerHTML += spanMensagemStatus(mensagem);

        } else if(mensagem.to === "Todos") {
            conteudo.innerHTML += spanMensagemTodos(mensagem);

        } else {
            conteudo.innerHTML += spanMensagemPrivada(mensagem);
        }
    }
    conteudo.scrollIntoView(false);
}

//questão semantica somente
let atualizar = () => {
    receberMensagens();
}

//enviar mensagens para o servidor

let enviarMensagem = () => {

    let mensagemEscrita = document.querySelector(".bottom input").value;

    let mensagemPronta = {
        from: lindoNome,
        to: "Todos",
        text: mensagemEscrita,
        type: "message"
    }

    const promise = axios.post("https://mock-api.driven.com.br/api/v6/uol/messages", mensagemPronta);

    promise.then(atualizar);

    promise.catch(atualizarPagina);

    document.querySelector(".bottom input").value = "";
}

let interacaoEscrever = () => {

    let valorZerado = document.querySelector(".bottom input");

    if (valorZerado.value === "Escreva aqui...") {

        valorZerado.value = ""
    }
    
    
}
//situação de acerto e de erro baseado na resposta do servidor

let seErrar = () => {

    lindoNome = prompt("O nome já está sendo utilizando, escreva outro lindo nome:");

    const entrada = {
        name: lindoNome
    };

    let promise = axios.post("https://mock-api.driven.com.br/api/v6/uol/participants", entrada);

    promise.then(receberMensagens);

    promise.catch(seErrar);
}

let atualizarPagina = () => window.location.reload();


entrando();
setInterval(online, 5000);
setInterval(atualizar, 3000);
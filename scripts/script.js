let lindoNome = prompt("Seu lindo nome:");
let listaMensagens= [];

//entrar no servidor

let entrando = () => {

    const entrada = {
        name: lindoNome
    };

    let promise = axios.post("https://mock-api.driven.com.br/api/v6/uol/participants", entrada);
    console.log(promise);

    receberMensagens();
    
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
    
    return `<span class="status">(${msg.time}) <strong>${msg.from}<strong> entra na sala...</span>`
}

let spanMensagemTodos = (msg) => {
    
    return `<span class="todos">(${msg.time}) <strong>${msg.from}<strong> para <strong>Todos<strong>: ${msg.text}</span>`
}

let spanMensagemPrivada = (msg) => {
    
    return `<span class="privado">(${msg.time}) <strong>${msg.from}<strong> reservadamente para <strong>${msg.to}<strong>: ${msg.text}</span>`
}

let renderizarMensagem = (mensagens) => {

    let conteudo = document.querySelector(".conteudo");
    conteudo.innerHTML = "";

    for(let i = 0; i < listaMensagens.length; i++) {
        let mensagem = listaMensagens[i];

        if(mensagem.type == "status") {
            conteudo.innerHTML += spanMensagemStatus(mensagem);

        } else if(mensagem.to !== "todos" || mensagem.to !== "status") {
            conteudo.innerHTML += spanMensagemPrivada(mensagem);
        }

        conteudo.innerHTML += spanMensagemTodos(mensagem)
    }
}


//enviar mensagens para o servidor


//situação de acerto e de erro baseado na resposta do servidor

//interações js, html e css

//bonus


entrando();
setInterval(online, 5000);
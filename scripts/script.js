let lindoNome = prompt("Seu lindo nome:");

//entrar no servidor

let entrando = () => {

    const entrada = {
        name: lindoNome
    };

    let promise = axios.post("https://mock-api.driven.com.br/api/v6/uol/participants", entrada);
}

let online = () => {

    let status = {
        name: lindoNome
    }

    let promise = axios.post ("https://mock-api.driven.com.br/api/v6/uol/status", status);
}

entrando();
setInterval(online, 5000);

//acessar mensagens do servidor


//enviar mensagens para o servidor

//situação de acerto e de erro baseado na resposta do servidor

//interações js, html e css

//bonus
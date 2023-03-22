function generateLinks() {
    var numbers = document.getElementById("numbers").value;
    var message = document.getElementById("message").value;
    var numberArray = numbers.split("\n");
    var linkContainer = document.getElementById("link-container");
    var prefix = document.getElementById("prefixo");
    linkContainer.innerHTML = "";

    if (!numbers) {
        alert("Por favor, adicione um ou mais números");
        return;
    }

    for (var i = 0; i < numberArray.length; i++) {
        var number = numberArray[i];
        var link = document.createElement("a");
        link.href = "https://api.whatsapp.com/send?phone=" + (prefix.value) + number + "&text=" + encodeURIComponent(message);

        link.innerHTML = number;
        link.setAttribute("target", "_blank");
        link.addEventListener("click", function () {
            this.style.color = "red";
            if (checkbox.checked) {
                this.remove();
                removeNumber(this.innerHTML); // chama a função removeNumber para atualizar o textarea
            }
        });
        linkContainer.appendChild(link);
    }
    let totalBase = numberArray.length
    document.getElementById("numberslbl").innerHTML = `Números: ${totalBase}`
}

function removeNumber(number) {
    var numbersTextarea = document.getElementById("numbers");
    var numberArray = numbersTextarea.value.split("\n");
    var index = numberArray.indexOf(number);
    if (index !== -1) {
        numberArray.splice(index, 1);
        numbersTextarea.value = numberArray.join("\n");
    }
    let totalBase = numberArray.length
    document.getElementById("numberslbl").innerHTML = `Números: ${totalBase}`

}

function limpaNumeros() {
    document.getElementById('numbers').value = '';
    document.getElementById("numberslbl").innerHTML = `Números:`
}

//funçoes de salvar as mensagens

function clearMessage() {
    document.getElementById("message").innerText;
}


let messages = JSON.parse(localStorage.getItem("messages")) || [];
let showList = false;

function saveMessage() {
    let message = document.getElementById("message").value;
    if (message == "") {
        window.alert("Digite uma mensagem na caixa de texto para poder salvar")
    } else {
        messages.push(message);
        localStorage.setItem("messages", JSON.stringify(messages));
        showMessages();
    }
}

function showMessages() {
    let messageList = document.getElementById("message-list");
    let messageSaveTip = document.getElementById("messageSaveTip")
    messageList.innerHTML = "";
    for (let i = 0; i < messages.length; i++) {
        let message = messages[i];
        let listItem = document.createElement("li");
        listItem.innerHTML = message;
        listItem.addEventListener("click", function () {
            document.getElementById("message").value = message;
            messageList.style.display = "none";
            messageSaveTip.style.display = "none"
            showList = false;
        });
        let deleteButton = document.createElement("button");
        deleteButton.innerHTML = "excluir";
        deleteButton.addEventListener("click", function () {
            messages.splice(i, 1);
            localStorage.setItem("messages", JSON.stringify(messages));
            document.getElementById('message').value = '';
            showMessages();
        });
        listItem.appendChild(deleteButton);

        messageList.appendChild(listItem);
    }
    messageSaveTip.style.display = showList ? "block" : "none";
    messageList.style.display = showList ? "block" : "none";
    showList = !showList;

    if (messageList.style.display != "none") {
        if (language.value == "2") {
            document.getElementById("mostraMsgBtn").innerText = "Hide saved messages"
        } else {
            document.getElementById("mostraMsgBtn").innerText = "Ocultar mensagens salvas"
        }
    } else {
        if (language.value == "2") {
            document.getElementById("mostraMsgBtn").innerText = "Saved messages"
        } else {
            document.getElementById("mostraMsgBtn").innerText = "Mensagens salvas"
        }
    }
}


//funçoes salva numeros
var btnSalvanum = document.getElementById("btnSaveNum")
var btnMostraNum = document.getElementById("btnShowNum")

// Função que salva os dados do textarea no local storage
function salvaNum() {
    const numerosSalvos = localStorage.getItem("numerosSalvos"); // Obtém os dados salvos no local
    if (numerosSalvos) { // Verifica se existem dados salvos
        localStorage.removeItem("numerosSalvos"); // Deleta os dados salvos do local storage
    }
    const numeros = document.getElementById("numbers").value; // Obtém os dados do textarea
    if(!numeros){
        alert("Digite os numeros antes de salvar")
    }else{
    localStorage.setItem("numerosSalvos", numeros); // Salva os dados no local storage com a chave 
    }
}

// Função que mostra os dados salvos do local storage no textarea e deleta esses dados do local storage
function mostraNum() {
    const numerosSalvos = localStorage.getItem("numerosSalvos"); // Obtém os dados salvos no local storage com a chave "numerosSalvos"
    if (numerosSalvos) { // Verifica se existem dados salvos
        document.getElementById("numbers").value = numerosSalvos; // Coloca os dados no textarea
        localStorage.removeItem("numerosSalvos"); // Deleta os dados salvos do local storage
    }
   
}


//seletor de modo escuro-claro

function mudatema() {
    var checkboxt = document.getElementById("modoClaroEscuro")
    if (checkboxt.checked) {
        if (language.value == "2") {
            document.getElementById("modoClaroEscurolbl").innerHTML = "Dark theme"
        } else {
            document.getElementById("modoClaroEscurolbl").innerHTML = "Tema Escuro"
        }
        document.getElementById("imgMenu").src = "/images/config-esc.png";
        document.getElementById("imgInfo").src = "/images/info-escuro.png";
        document.documentElement.style.setProperty('--azul-fundo', 'white');
        document.documentElement.style.setProperty('--azul-claro', 'black');
        document.documentElement.style.setProperty('--branco', 'black');
        document.body.style.backgroundImage = "url('/images/fundo-escuro.png')";
        console.log("escuro ativado")
    } else {
        if (language.value == "2") {
            document.getElementById("modoClaroEscurolbl").innerHTML = "Light theme"
        } else {
            document.getElementById("modoClaroEscurolbl").innerHTML = "Tema Claro"
        }
        document.getElementById("imgMenu").src = "/images/config-claro.png";
        document.getElementById("imgInfo").src = "/images/info-claro.png";
        document.documentElement.style.setProperty('--azul-fundo', '#1c87c9');
        document.documentElement.style.setProperty('--azul-claro', '#f6fcff');
        document.documentElement.style.setProperty('--branco', 'white');
        document.body.style.backgroundImage = "url('/images/fundo-claro.png')";
        console.log("claro ativado")
    }
}


//seletor de idioma
var language = document.getElementById("idiomaSelect")
language.addEventListener("change", function () {

    if (language.value == "2") {

        document.getElementById("btnSaveNum").innerHTML = "Save Numbers"
        document.getElementById("btnShowNum").innerHTML = "Saved Numbers"
        document.getElementById("prefixol").innerHTML = "Country code:"
        document.getElementById("checkboxl").innerHTML = "Delete number after sending"
        document.getElementById("numberslbl").innerHTML = "Numbers:"
        document.getElementById("numbers").placeholder = "Enter WhatsApp numbers with area code, one on each line"
        document.getElementById("btnDeletenum").innerHTML = "Delete numbers"
        document.getElementById("messagelbl").innerHTML = "Message:"
        document.getElementById("limpaMsgBtn").innerHTML = "Delete"
        document.getElementById("salvaMsgBtn").innerHTML = "Save"
        document.getElementById("message").placeholder = "Enter your message"
        document.getElementById("mostraMsgBtn").innerHTML = "Saved messages"
        document.getElementById("messageSaveTip").innerHTML = "Click on the saved message to add it to the text box or press 'delete' to remove the saved message"
        document.getElementById("btnGerar").innerHTML = "Generate"
        document.getElementById("menuFecharbtn").innerHTML = "Close"
        document.getElementById("menuh1").innerHTML = "Settings"
        document.getElementById("idiomalbl").innerHTML = "Language:"
        console.log("english mode")
    } else {

        document.getElementById("btnSaveNum").innerHTML = "Salvar"
        document.getElementById("btnShowNum").innerHTML = "Numeros salvos"
        document.getElementById("prefixol").innerHTML = "Prefixo:"
        document.getElementById("checkboxl").innerHTML = "Excluir numero após enviar"
        document.getElementById("numberslbl").innerHTML = "Números:"
        document.getElementById("numbers").placeholder = "Insira os números de WhatsApp com DDD, um em cada linha"
        document.getElementById("btnDeletenum").innerHTML = "Apagar números"
        document.getElementById("messagelbl").innerHTML = "Mensagem:"
        document.getElementById("limpaMsgBtn").innerHTML = "limpar"
        document.getElementById("salvaMsgBtn").innerHTML = "Salvar"
        document.getElementById("message").placeholder = "Insira a sua mensagem"
        document.getElementById("mostraMsgBtn").innerHTML = "Mensagens salvas"
        document.getElementById("messageSaveTip").innerHTML = "Clique na mensagem salva para adiciona-la na caixa de texto ou aperte em <strong>excluir</strong> para apagar a mensagem salva"
        document.getElementById("btnGerar").innerHTML = "Gerar"
        document.getElementById("menuFecharbtn").innerHTML = "Fechar"
        document.getElementById("menuh1").innerHTML = "Opções"
        document.getElementById("idiomalbl").innerHTML = "Idioma:"


        console.log("portugues ativado")
    }
})

//menu
var menubtn = document.getElementById("menu")

function fecharmenu() {
    menubtn.style.display = "none"
}

function abrirmenu() {
    menubtn.style.display = "block"
}

//info
var infoBtn = document.getElementById("infoSobreposicao")
function fecharInfo(){
    infoBtn.style = "display:none"
}

function abrirInfo() {
    infoBtn.style.display = "block"
}
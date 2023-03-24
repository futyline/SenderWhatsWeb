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
    if (!numeros) {
        alert("Digite os numeros antes de salvar")
    } else {
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
        document.getElementById("imgCorta").src = "/images/tesoura-esc.png";
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
        document.getElementById("imgCorta").src = "/images/tesoura-claro.png";
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
        document.getElementById("apresentacao").innerHTML = `
        <h2>SenderWhats is a WhatsApp message sending application that offers several useful functionalities to optimize your communication with your contacts. Let's take a look at the application's features:</h2>
        
        <p>
            Sending messages to a list of numbers:<br>
            With SenderWhats, you can easily send a message to multiple contacts. Just input the list of numbers and the message you want to send. Then, the application generates buttons for each number in the list, allowing you to click on each one and be directed to WhatsApp with the chosen message ready to send.
        </p>
        
        <p>
            Saving pre-defined messages:<br>
            To further streamline the message sending process, the application allows you to save pre-defined messages for future use. This means you don't have to type the same message repeatedly, just select the saved message and send it with just one click.
        </p>
        
        <p>
            Saving numbers to send later:<br>
            In addition to saving messages, you can also save numbers to send later. This functionality is particularly useful if you want to send messages to a large number of contacts but don't have time to do so immediately. Save the numbers and send the messages when it's convenient for you.
        </p>
        
        <p>
            Number deletion:<br>
            If you need to delete some contacts from your sending list, the application allows you to check the box to delete the numbers from both the text box and the buttons generated when clicked. This means you can customize your sending list according to your specific needs.
        </p>
        
        <p>
            Themes:<br>
            The application offers two different themes to personalize your user experience: light mode and dark mode. This allows you to choose the theme that best fits your viewing preferences.
        </p>
        
        <p>
            Languages:<br>
            The application also supports two different languages: Portuguese and English. This means you can choose the language you prefer to use to interact with the application.
        </p>
        
        <h2>These are the main features of SenderWhats. We hope it helps in your communication with your contacts on WhatsApp.</h2>
        <button class="close-btn" onclick="fecharInfo()">Close</button>
        `

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
        document.getElementById("apresentacao").innerHTML = `<h2>O SenderWhats é um aplicativo de envio de mensagens pelo WhatsApp que oferece diversas funcionalidades úteis para otimizar sua comunicação com seus contatos. Vamos dar uma olhada nas funcionalidades do aplicativo:</h2>

        <p>
            Envio de mensagem para lista de números:<br>
            Com o SenderWhats, você pode facilmente enviar uma mensagem para vários contatos. Basta inserir a lista de números e a mensagem que deseja enviar. Em seguida, o aplicativo gera botões para cada número na lista, permitindo que você clique em cada um deles e seja direcionado ao WhatsApp com a mensagem escolhida pronta para enviar.
        </p>
        
        <p>
            Salvamento de mensagens pré-definidas:<br>
            Para agilizar ainda mais o processo de envio de mensagens, o aplicativo permite que você salve mensagens pré-definidas para uso futuro. Isso significa que você não precisa digitar a mesma mensagem repetidamente, basta selecionar a mensagem salva e enviá-la com apenas um clique.
        </p>
        
        <p>
            Salvar números para enviar depois:<br>
            Além de salvar mensagens, você também pode salvar números para enviar depois. Essa funcionalidade é particularmente útil se você deseja enviar mensagens para um grande número de contatos, mas não tem tempo para fazê-lo imediatamente. Salve os números e envie as mensagens quando for conveniente para você.
        </p>
        
        <p>
            Exclusão de números:<br>
            Se você precisa excluir alguns contatos da sua lista de envio, o aplicativo permite que você marque a caixa para excluir os números tanto da caixa de texto como dos botões gerados ao clicar. Isso significa que você pode personalizar sua lista de envio de acordo com suas necessidades específicas.
        </p>
        
        <p>
            Temas:<br>
            O aplicativo oferece dois temas diferentes para personalizar sua experiência de uso: modo claro e modo escuro. Isso permite que você escolha o tema que melhor se adapta às suas preferências de visualização.
        </p>
        
        <p>
            Idiomas:<br>
            O aplicativo também oferece suporte a dois idiomas diferentes: português e inglês. Isso significa que você pode escolher o idioma que prefere usar para interagir com o aplicativo.
        </p>
        
        <h2>Essas são as principais funcionalidades do SenderWhats. Esperamos que ajude na comunicação com seus contatos no WhatsApp.</h2>
        <button class="close-btn" onclick="fecharInfo()">Fechar</button>`

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

function fecharInfo() {
    infoBtn.style = "display:none"
}

function abrirInfo() {
    infoBtn.style.display = "block"
}


//cortabase
var cortaBtn = document.getElementById("cortaBaseContainer")

function fecharCorta() {
    cortaBtn.style = "display:none"
}

function abrirCorta() {
    cortaBtn.style.display = "block"
}

const btnDividir = document.getElementById('btnDividir');
const btnLimpar = document.getElementById("btnLimpar");
btnLimpar.addEventListener("click", limparNumeros);

function limparNumeros() {
  document.getElementById("numeros").value = "";
  document.getElementById("resultados").innerHTML = "";
}



btnDividir.addEventListener('click', () => {
    const numerosInput = document.getElementById('numeros');
    const quantidadeInput = document.getElementById('quantidade');
    const resultadosDiv = document.getElementById('resultados');
  
    resultadosDiv.innerHTML = '';
  
    const numeros = numerosInput.value.trim().split('\n');
    const quantidade = parseInt(quantidadeInput.value);
  
    const numerosPorSublista = Math.ceil(numeros.length / quantidade);
  
    resultadosDiv.innerHTML += `<p>Total de números: ${numeros.length}</p>`;
  
    for (let i = 0; i < quantidade; i++) {
      const inicio = i * numerosPorSublista;
      const fim = inicio + numerosPorSublista;
      const sublista = numeros.slice(inicio, fim);
  
      const sublistaDiv = document.createElement('div');
      sublistaDiv.innerHTML = `
        <p>Base ${i + 1} (${sublista.length} números):</p>
        <textarea rows="10" id="sublista-${i}">${sublista.join('\n')}</textarea>
        `;
  
      const copyButton = document.createElement('button');
      copyButton.textContent = 'Colar na Pagina Principal';
      copyButton.addEventListener('click', () => {
        document.getElementById("cortaBaseContainer").value = ""
        const sublistaTextarea = sublistaDiv.querySelector(`#sublista-${i}`);
        document.getElementById('numbers').value = sublistaTextarea.value.trim();
        document.getElementById("cortaBaseContainer").style = "display:none"
      });
  
      sublistaDiv.appendChild(copyButton);
      resultadosDiv.appendChild(sublistaDiv);
    }
  });
  
  
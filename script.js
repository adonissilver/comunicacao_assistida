const mensagem=document.getElementById("mensagem");

const historicoLista=
document.getElementById("historicoLista");

const favoritosLista=
document.getElementById("favoritosLista");


let historico=
JSON.parse(
localStorage.getItem("historico")
)||[];


function falar(texto){

speechSynthesis.cancel();

const voz=
new SpeechSynthesisUtterance(texto);

voz.lang="pt-BR";

voz.rate=0.9;

speechSynthesis.speak(voz);

}


function enviarMensagem(texto){

mensagem.value=texto;

falar(texto);

salvarHistorico(texto);

}


function salvarHistorico(texto){

historico.unshift(texto);

historico=[...new Set(historico)];

historico=historico.slice(0,10);

localStorage.setItem(
"historico",
JSON.stringify(historico)
);

mostrarHistoricoLista();

mostrarFavoritos();

}


function mostrarHistoricoLista(){

historicoLista.innerHTML="";

historico.forEach(item=>{

historicoLista.innerHTML+=`

<div
class="itemHistorico"
onclick="enviarMensagem('${item}')">

${item}

</div>

`;

});

}


function mostrarFavoritos(){

favoritosLista.innerHTML="";

historico.slice(0,3)
.forEach(item=>{

favoritosLista.innerHTML+=`

<button
onclick="enviarMensagem('${item}')">

${item}

</button>

`;

});

}


function mostrarInicio(){

document.getElementById(
"home"
).style.display="grid";

document.getElementById(
"historicoTela"
).style.display="none";

}


function mostrarHistorico(){

document.getElementById(
"home"
).style.display="none";

document.getElementById(
"historicoTela"
).style.display="block";

}


document
.getElementById("btnLimpar")
.addEventListener("click",()=>{

mensagem.value="";

});


document
.getElementById("btnFalar")
.addEventListener("click",()=>{

falar(
mensagem.value
);

});

mostrarHistoricoLista();

mostrarFavoritos();
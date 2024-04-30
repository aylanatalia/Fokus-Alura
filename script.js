const html = document.querySelector('html');
const focusBt = document.querySelector('.app__card-button--foco');
const curtoBt = document.querySelector('.app__card-button--curto');
const longoBt = document.querySelector('.app__card-button--longo');
const banner = document.querySelector('.app__image');
const titulo = document.querySelector('.app__title');
const botao = document.querySelectorAll('.app__card-button');
const startPauseBt = document.querySelector('#start-pause');
const musicaFocoInput = document.querySelector('#alternar-musica');
const iniciarOuPausarBt = document.querySelector('#start-pause span');
const iconeComecarPausar = document.querySelector('.app__card-primary-butto-icon');
const tempoNaTela = document.querySelector('#timer');
const musica = new Audio('/sons/luna-rise-part-one.mp3');
const audioPlay = new Audio('/sons/play.wav');
const audioPause = new Audio('/sons/pause.mp3');
const audioTempoFinalizado = new Audio('/sons/beep.mp3');
musica.loop = true;
let tempoCorridoEmSegundos = 1500;
let intervaliId = null;

musicaFocoInput.addEventListener('change', ()=>{
    if(musica.paused){
        musica.play();
    } else{
        musica.pause();
    }
})

focusBt.addEventListener('click', ()=>{
    tempoCorridoEmSegundos = 1500;
    alterarContexto('foco');
    focusBt.classList.add('active');
})

curtoBt.addEventListener('click', ()=>{
    tempoCorridoEmSegundos = 300;
    alterarContexto('descanso-curto');
    curtoBt.classList.add('active');
})

longoBt.addEventListener('click', ()=>{
    tempoCorridoEmSegundos = 900;
    alterarContexto('descanso-longo');
    longoBt.classList.add('active');
})

function alterarContexto(contexto){
    mostrarTempoNaTela();
    botao.forEach(function(contexto){
        contexto.classList.remove('active');
    })
    html.setAttribute('data-contexto', contexto);
    banner.setAttribute('src', `/imagens/${contexto}.png`);
    switch (contexto) {
        case "foco":
            titulo.innerHTML = `
            Otimize sua produtividade,<br>
            <strong class="app__title-strong">mergulhe no que importa.</strong>
            `
        break;

        case "descanso-curto":
            titulo.innerHTML = `
            Que tal dar uma respirada? <strong class="app__title-strong">Faça uma pausa curta!</strong>
            `
        break;
    
        case "descanso-longo":
            titulo.innerHTML = `
            Hora de voltar à superfície.<strong class="app__title-strong"> Faça uma pausa longa.</strong>
            `    
        break;

        default:
        break;
    }
}

const contagemRegressiva = ()=>{
    if(tempoCorridoEmSegundos <= 0){
        audioTempoFinalizado.play();
        zerar();
        alert('Tempo finalizado!');
        return;
    }

    tempoCorridoEmSegundos -= 1;
    mostrarTempoNaTela();
}

startPauseBt.addEventListener('click', iniciarOuPausar);

function iniciarOuPausar(){
    if(intervaliId){
        audioPause.play();
        zerar();
        return;
    }
    audioPlay.play();
    intervaliId = setInterval(contagemRegressiva, 1000);
    iniciarOuPausarBt.textContent = 'Pausar';
    iconeComecarPausar.setAttribute('src', '/imagens/pause.png');
}

function zerar(){
    clearInterval(intervaliId)
    iniciarOuPausarBt.textContent = 'Começar';
    iconeComecarPausar.setAttribute('src', '/imagens/play_arrow.png');
    intervaliId = null;
}

function mostrarTempoNaTela(){
    const tempo = new Date(tempoCorridoEmSegundos*1000);
    const tempoFormatado = tempo.toLocaleString('pt-br',{minute: '2-digit', second: '2-digit'});
    tempoNaTela.innerHTML = `${tempoFormatado}`;
}

mostrarTempoNaTela();
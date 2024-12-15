escreverMensagemInicial();
let listaDeNumerosSorteados = [];
let numeroSecreto = gerarNumeroAleatorio();
let tentativas = 1;

function escreverTextoNaTela(tag, texto){
  let campo = document.querySelector(tag);
  campo.innerHTML = texto;

  responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate:1.2});
}

function escreverMensagemInicial() {
  escreverTextoNaTela('h1', 'Jogo do número secreto');
  escreverTextoNaTela('p', 'Escolha um número entre 1 e 10');
}

function verificarChute() {
  let chute = document.querySelector('input').value;
  
  if(chute == numeroSecreto) {
    let palavraTentativas = tentativas > 1 ? 'tentativas' : 'tentativa';
    let mensagemTentativa = `Você descobriu o número secreto com ${tentativas} ${palavraTentativas}`;
    escreverTextoNaTela('h1', 'Você Acertou!');
    escreverTextoNaTela('p', mensagemTentativa);
    document.getElementById('reiniciar').removeAttribute('disabled');
  } else {
    if(chute > numeroSecreto) {
      escreverTextoNaTela('p', 'O número secreto é menor');
    } else {
      escreverTextoNaTela('p', 'O número secreto é maior');
    }
    tentativas++;
    limparCampo();
  }
}

function limparCampo() {
  chute = document.querySelector('input');
  chute.value = '';
}

function gerarNumeroAleatorio() {
  let numeroEscolhido = parseInt(Math.random() * 10 + 1);

  if(listaDeNumerosSorteados.includes(numeroEscolhido)) {
    return gerarNumeroAleatorio();
  } else {
    listaDeNumerosSorteados.push(numeroEscolhido);
    return numeroEscolhido;
  }
}

function reiniciarJogo() {
  numeroSecreto = gerarNumeroAleatorio();
  limparCampo();
  tentativas = 1;
  escreverMensagemInicial();
  document.getElementById('reiniciar').setAttribute('disabled', true);
}


const images = [
    'w_7.png', 'w_8.png', 'w_10.png', 'w_11.png',
    'w_95.png', 'w_98.png', 'w_Vista.png', 'w_XP.png',
    'w_7.png', 'w_8.png', 'w_10.png', 'w_11.png',
    'w_95.png', 'w_98.png', 'w_Vista.png', 'w_XP.png'
];

let primeiraCarta, segundaCarta;
let cartaVirada = false;
let jogoBloqueado = false;
let paresEncontrado = 0;
let tempoInicial, contadorTempo;

const board = document.getElementById('game');
const timerDisplay = document.getElementById('timer');

function shuffle(array) {
    return array.sort(() => Math.random() - 0.5);
}

function createBoard() {
    const shuffledImages = shuffle(images);
    shuffledImages.forEach(imgSrc => {
        const carta = document.createElement('div');
        carta.classList.add('carta');
        carta.innerHTML = `<img src="./assets/img/png/${imgSrc}" alt="memory card">`;
        carta.addEventListener('click', flipCard);
        board.appendChild(carta);
    });
}

function flipCard() {
    if (jogoBloqueado) return;
    if (this === primeiraCarta) return;

    this.classList.add('flipped');

    if (!cartaVirada) {
        cartaVirada = true;
        primeiraCarta = this;
        if (!tempoInicial) {
            tempoInicial = new Date();
            tempoInicialr();
        }
        return;
    }

    segundaCarta = this;
    checkForMatch();
}

function checkForMatch() {
    if (primeiraCarta.innerHTML === segundaCarta.innerHTML) {
        disableCards();
        paresEncontrado++;
        if (paresEncontrado === 8) {
            endGame();
        }
    } else {
        unflipCards();
    }
}

function disableCards() {
    primeiraCarta.removeEventListener('click', flipCard);
    segundaCarta.removeEventListener('click', flipCard);
    resetBoard();
}

function unflipCards() {
    jogoBloqueado = true;
    setTimeout(() => {
        primeiraCarta.classList.remove('flipped');
        segundaCarta.classList.remove('flipped');
        resetBoard();
    }, 1000);
}

function resetBoard() {
    [cartaVirada, jogoBloqueado] = [false, false];
    [primeiraCarta, segundaCarta] = [null, null];
}

function tempoInicialr() {
    contadorTempo = setInterval(() => {
        const elapsedTime = Math.floor((new Date() - tempoInicial) / 1000);
        timerDisplay.textContent = `Tempo: ${elapsedTime}s`;
    }, 1000);
}

function endGame() {
    clearInterval(contadorTempo);
    alert('Parabéns! Você encontrou todos os pares!');
}

createBoard();
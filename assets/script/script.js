const images = [
    'w_7.png', 'w_8.png', 'w_10.png', 'w_11.png',
    'w_95.png', 'w_98.png', 'w_Vista.png', 'w_XP.png',
    'w_7.png', 'w_8.png', 'w_10.png', 'w_11.png',
    'w_95.png', 'w_98.png', 'w_Vista.png', 'w_XP.png'
];

let firstCard, secondCard;
let hasFlippedCard = false;
let lockBoard = false;
let pairsFound = 0;
let startTime, timerInterval;

const board = document.getElementById('game');
const timerDisplay = document.getElementById('timer');

function shuffle(array) {
    return array.sort(() => Math.random() - 0.5);
}

function createBoard() {
    const shuffledImages = shuffle(images);
    shuffledImages.forEach(imgSrc => {
        const card = document.createElement('div');
        card.classList.add('card');
        // Atualizando o caminho da imagem
        card.innerHTML = `<img src="./assets/img/png/${imgSrc}" alt="memory card">`;
        card.addEventListener('click', flipCard);
        board.appendChild(card);
    });
}

function flipCard() {
    if (lockBoard) return;
    if (this === firstCard) return;

    this.classList.add('flipped');

    if (!hasFlippedCard) {
        hasFlippedCard = true;
        firstCard = this;
        if (!startTime) {
            startTime = new Date();
            startTimer();
        }
        return;
    }

    secondCard = this;
    checkForMatch();
}

function checkForMatch() {
    if (firstCard.innerHTML === secondCard.innerHTML) {
        disableCards();
        pairsFound++;
        if (pairsFound === 8) {
            endGame();
        }
    } else {
        unflipCards();
    }
}

function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
    resetBoard();
}

function unflipCards() {
    lockBoard = true;
    setTimeout(() => {
        firstCard.classList.remove('flipped');
        secondCard.classList.remove('flipped');
        resetBoard();
    }, 1000);
}

function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}

function startTimer() {
    timerInterval = setInterval(() => {
        const elapsedTime = Math.floor((new Date() - startTime) / 1000);
        timerDisplay.textContent = `Tempo: ${elapsedTime}s`;
    }, 1000);
}

function endGame() {
    clearInterval(timerInterval);
    alert('Parabéns! Você encontrou todos os pares!');
}

createBoard();

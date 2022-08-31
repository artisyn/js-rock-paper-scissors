console.log('Initial stage');

//////// creating necessary elements

//stage I elements
const title = document.createElement('h1');
title.classList.add('game-title');
title.innerHTML = `
Welcome To <span class="rock">Rock</span>
<span class="paper">Paper</span>
<span class="scissors">Scissors</span> For
<span class="red-text">Your Life</span> !
`;

const main = document.createElement('div');
main.classList.add('main');
main.innerHTML = `
	<div class="message-box">
		<p>
			You are serving a life sentence in prison for the crimes you
			did not commit.
		</p>
		<p>
			One day you are approached by a suspicious man, who offers
			you to play a game of rock paper scissors.
		</p>
		<p>
			If you <span class="green-text">win or draw</span> - you will walk
			as a free man
		</p>
		<p>
			If you <span class="red-text">loose</span> - you will die...
		</p>
	</div>
	<div class="button-container">
		<button class="btn-start">START GAME</button>
		<span class="decoration right-t"></span>
		<span class="decoration right-b"></span>
		<span class="decoration left-t"></span>
		<span class="decoration left-b"></span>
	</div>
	<div class="img-container">
		<img src="./assets/paper.svg" />
	</div>
`;

//stage II elements
const cardPaperMarkup = document.createElement('div');
cardPaperMarkup.classList.add('card');
cardPaperMarkup.innerHTML = `
	<div class="card-paper"></div>
	<h3 class="title-paper">Paper</h3>
`;
const cardRockMarkup = document.createElement('div');
cardRockMarkup.classList.add('card');
cardRockMarkup.innerHTML = `
	<div class="card-rock"></div>
	<h3 class="title-rock">Rock</h3>
`;
const cardScissorsMarkup = document.createElement('div');
cardScissorsMarkup.classList.add('card');
cardScissorsMarkup.innerHTML = `
	<div class="card-scissors"></div>
	<h3 class="title-scissors">Scissors</h3>
`;
const cardEmptyMarkup = document.createElement('div');
cardEmptyMarkup.classList.add('card');
cardEmptyMarkup.innerHTML = `
	<div class="card-empty"></div>
`;
const playerLivesMarkup = document.createElement('div');
playerLivesMarkup.classList.add('player-life--container', 'display-none');
playerLivesMarkup.innerHTML = `
	<h2>Your lives:</h2>
	<div class="player-life">
		<div class="life-circle life1"></div>
		<div class="life-circle life2"></div>
		<div class="life-circle life3"></div>
	</div>				
`;
const skullMarkup = document.createElement('img');
skullMarkup.src = './assets/skull2.svg';
const roseMarkup = document.createElement('img');
roseMarkup.src = './assets/heart.svg';
const suspiciousManMarkup = document.createElement('div');
suspiciousManMarkup.classList.add('suspicious-man', 'display-none');
suspiciousManMarkup.innerHTML = `
	<h2>Suspicious Man</h2>
	<div class="img-container">
		<img src="./assets/suspiciousman.jpg" />
	</div>
`;
const suspiciousCardMarkup = document.createElement('div');
suspiciousCardMarkup.classList.add(
	'suspicious-card--container',
	'display-none'
);
suspiciousCardMarkup.appendChild(cardEmptyMarkup.cloneNode(true));
const playerSelectedMarkup = document.createElement('div');
playerSelectedMarkup.classList.add('player-selected', 'display-none');
playerSelectedMarkup.appendChild(cardEmptyMarkup.cloneNode(true));
const playerCardsMarkup = document.createElement('div');
playerCardsMarkup.classList.add('player-cards', 'display-none');
playerCardsMarkup.innerHTML = `
	<div class="card1">
		<div class="card">
			<div class="card-rock"></div>
			<h3 class="title-rock">Rock</h3>
		</div>
	</div>
	<div class="card2">
		<div class="card">
			<div class="card-paper"></div>
			<h3 class="title-paper">Paper</h3>
		</div>
	</div>
	<div class="card3">
		<div class="card">
			<div class="card-scissors"></div>
			<h3 class="title-scissors">Scissors</h3>
		</div>
	</div>
`;
const btnRoundMarkup = document.createElement('div');
btnRoundMarkup.classList.add('btn-round--container', 'display-none');
btnRoundMarkup.innerHTML = `
<div class='round-message'>test</div>
<button class="btn-round pointer-none">Start Round</button>
`;
const timerMarkup = document.createElement('div');
timerMarkup.classList.add('timer-container', 'display-none');
timerMarkup.innerHTML = `<h1 class ='timer-text'></h1>`;
const playerNameMarkup = document.createElement('h2');
playerNameMarkup.classList.add('player', 'display-none');
playerNameMarkup.innerHTML = `You`;

/////// adding stage I elements to the page

document.body.appendChild(title);
document.body.appendChild(main);

// selecting stage I variables
const gameTitle = document.querySelector('.game-title');
const startBtn = document.querySelector('.btn-start');
const mainDiv = document.querySelector('.main');
const btnContainer = document.querySelector('.button-container');
const messageBox = document.querySelector('.message-box');

////// adding stage II elements to the page;
mainDiv.appendChild(playerLivesMarkup);
mainDiv.appendChild(suspiciousManMarkup);
mainDiv.appendChild(suspiciousCardMarkup);
mainDiv.appendChild(playerSelectedMarkup);
mainDiv.appendChild(playerCardsMarkup);
mainDiv.appendChild(btnRoundMarkup);
mainDiv.appendChild(timerMarkup);
document.body.append(playerNameMarkup);

// selecting stage II variables
const suspiciousCardContainer = document.querySelector(
	'.suspicious-card--container'
);
const timerContainer = document.querySelector('.timer-container');
const timerText = document.querySelector('.timer-text');
const playerLivesContainer = document.querySelector('.player-life--container');
const playerLife1 = document.querySelector('.life1');
const playerLife2 = document.querySelector('.life2');
const playerLife3 = document.querySelector('.life3');
const playerSelectedCardContainer = document.querySelector('.player-selected');
const roundBtn = document.querySelector('.btn-round');
const playerCardsContainer = document.querySelector('.player-cards');
const roundMessage = document.querySelector('.round-message');
const player = document.querySelector('.player');

////////// main variables

let timer;
let selectedCard = 'none';
let computerCard = 'none';
let currentRound = 0;
let score = {
	round1: '',
	round2: '',
	round3: '',
};

/////funcions

//helper functions

// function that waits for timeInSec and executes func
const wait = (timeInSec, func) => {
	const time = timeInSec * 1000;
	setTimeout(() => {
		func();
	}, time);
};
const changeRoundMessage = (message) => {
	roundMessage.innerText = message;
};
const changeSelctedCard = (card) => {
	playerSelectedCardContainer.innerHTML = '';
	playerSelectedCardContainer.appendChild(card);
};
const changeSuspiciousCard = (card) => {
	suspiciousCardContainer.innerHTML = '';
	suspiciousCardContainer.appendChild(card);
};
const changeTimerText = (text) => {
	timerText.innerText = text;
};
const showTimerXTimes = (times) => {
	let x = times;
	// adding interval to a variable to be able to remove it later
	timer = setInterval(() => {
		if (x === 0) {
			clearInterval(timer);
			changeTimerText('');
			return;
		}
		console.log(x);
		timerText.innerText = x;
		x--;
	}, 1000);
};

const generateRandomCard = () => {
	const cards = ['rock', 'paper', 'scissors'];
	const card = cards[Math.floor(Math.random() * 3)];
	computerCard = card;
};
const determineRoundWinner = () => {
	//draw
	if (selectedCard === computerCard) {
		console.log('draw');
		changeTimerText('Its a Draw!');
		score[`round${currentRound}`] = 'draw';
		return;
	}
	// player selectes rock
	if (selectedCard === 'rock') {
		if (computerCard === 'paper') {
			console.log('computer wins');
			changeTimerText('You Loose!');
			score[`round${currentRound}`] = 'computer';
		}
		if (computerCard === 'scissors') {
			console.log('player wins');
			changeTimerText('You Win!');
			score[`round${currentRound}`] = 'player';
		}
	}
	// player selects paper
	if (selectedCard === 'paper') {
		if (computerCard === 'rock') {
			console.log('player wins');
			changeTimerText('You Win!');
			score[`round${currentRound}`] = 'player';
		}
		if (computerCard === 'scissors') {
			console.log('computer wins');
			changeTimerText('You Loose!');
			score[`round${currentRound}`] = 'computer';
		}
	}
	// player selects scissors
	if (selectedCard === 'scissors') {
		if (computerCard === 'rock') {
			console.log('computer wins');
			changeTimerText('You Loose!');
			score[`round${currentRound}`] = 'computer';
		}
		if (computerCard === 'paper') {
			console.log('player wins');
			changeTimerText('You Win!');
			score[`round${currentRound}`] = 'player';
		}
	}
};

const showSuspiciousCard = () => {
	if (computerCard === 'paper') {
		changeSuspiciousCard(cardPaperMarkup.cloneNode(true));
	}
	if (computerCard === 'rock') {
		changeSuspiciousCard(cardRockMarkup.cloneNode(true));
	}
	if (computerCard === 'scissors') {
		changeSuspiciousCard(cardScissorsMarkup.cloneNode(true));
	}
};

const updatePlayerLife = () => {
	const life = document.querySelector(`.life${currentRound}`);
	if (score[`round${currentRound}`] === 'draw')
		life.appendChild(roseMarkup.cloneNode(true));
	if (score[`round${currentRound}`] === 'player')
		life.appendChild(roseMarkup.cloneNode(true));
	if (score[`round${currentRound}`] === 'computer')
		life.appendChild(skullMarkup.cloneNode(true));
};

const resetRound = () => {
	checkIfGameOver();
	//reset
	changeSuspiciousCard(cardEmptyMarkup.cloneNode(true));
	changeSelctedCard(cardEmptyMarkup.cloneNode(true));
	changeTimerText('');
	changeRoundMessage('Pick A Card');
	playerCardsContainer.classList.remove('pointer-none');
};
const removeElements = () => {};
const loadWinningScreen = () => {
	const finalMessage = document.createElement('h1');
	finalMessage.classList.add('final-message');
	mainDiv.remove();
	const lastDiv = document.createElement('div');
	lastDiv.classList.add('main');
	lastDiv.classList.add('pointer-none');
	lastDiv.style.opacity = '0';
	lastDiv.style.backgroundImage = 'url(../assets/freeMan.jpg)';
	finalMessage.innerText = 'Congratulations You Walk As A Free Man!';
	lastDiv.appendChild(finalMessage);
	document.body.prepend(lastDiv);
	setTimeout(() => {
		lastDiv.style.opacity = 1;
	}, 1000);
};
const loadLosingScreen = () => {
	const finalMessage = document.createElement('h1');
	finalMessage.classList.add('final-message');
	mainDiv.innerHtml = '';
	mainDiv.remove();
	const lastDiv = document.createElement('div');
	lastDiv.classList.add('main');
	lastDiv.classList.add('pointer-none');
	lastDiv.style.opacity = '0';
	lastDiv.style.backgroundImage = 'url(../assets/died.jpg)';
	finalMessage.style.color = 'red';
	finalMessage.innerText = 'Oops You Died...';
	lastDiv.appendChild(finalMessage);
	document.body.prepend(lastDiv);
	setTimeout(() => {
		lastDiv.style.opacity = 1;
	}, 1000);
};
const checkIfGameOver = () => {
	if (currentRound === 3) {
		let x = 0;
		for (let i = 1; i < 4; i++) {
			if (
				score[`round${i}`] === 'player' ||
				score[`round${i}`] === 'draw'
			)
				x++;
		}

		if (x >= 2) {
			console.log('player won');
			// new screen player won
			//fade screen
			mainDiv.style.opacity = 0; // fadeOut animation
			player.style.opacity = 0;
			//show screen
			wait(2, loadWinningScreen);
		}
		if (x <= 1) {
			console.log('computer won');
			// new screen player lost
			//fade screen
			mainDiv.style.opacity = 0; // fadeOut animation
			player.style.opacity = 0;

			//show screen
			wait(2, loadLosingScreen);
		}
	}
};

///main functions

// function that transitions the game to stage 2
const stage2Transition = () => {
	// hiding stage I elements
	gameTitle.style.display = 'none';
	messageBox.innerHTML = '';
	messageBox.style.display = 'none';
	btnContainer.style.display = 'none';
	mainDiv.style.backgroundImage = 'url(../assets/outcell.jpg)';

	// revealing stage II elements
	playerLivesMarkup.classList.remove('display-none');
	suspiciousManMarkup.classList.remove('display-none');
	suspiciousCardMarkup.classList.remove('display-none');
	playerSelectedMarkup.classList.remove('display-none');
	playerCardsMarkup.classList.remove('display-none');
	btnRoundMarkup.classList.remove('display-none');
	timerMarkup.classList.remove('display-none');
	playerNameMarkup.classList.remove('display-none');

	mainDiv.style.opacity = 1; // fadeIn animation

	// adding message pick a card
	changeRoundMessage('Pick A Card');
	mainGame();
};
const playerVsComputer = () => {
	generateRandomCard();
	determineRoundWinner();
	showSuspiciousCard();
	updatePlayerLife();
};
const playRound = () => {
	// disable start round button and player cards
	roundBtn.classList.add('pointer-none');
	playerCardsContainer.classList.add('pointer-none');
	// set the rounds played count
	currentRound = currentRound + 1;
	changeRoundMessage('');
	// start timer
	showTimerXTimes(3);
	wait(4, playerVsComputer);
	wait(8, resetRound);
};

// main game logic
const mainGame = () => {
	console.log('Main stage');
	// adding event listener for player cards
	playerCardsContainer.addEventListener('click', (e) => {
		if (e.target.classList.contains('card1')) {
			changeSelctedCard(cardRockMarkup.cloneNode(true));
			changeRoundMessage('Press Start');
			roundBtn.classList.remove('pointer-none');
			selectedCard = 'rock';
			console.log(selectedCard);
			return;
		}
		if (e.target.classList.contains('card2')) {
			changeSelctedCard(cardPaperMarkup.cloneNode(true));
			changeRoundMessage('Press Start');
			roundBtn.classList.remove('pointer-none');
			selectedCard = 'paper';
			console.log(selectedCard);
			return;
		}
		if (e.target.classList.contains('card3')) {
			changeSelctedCard(cardScissorsMarkup.cloneNode(true));
			changeRoundMessage('Press Start');
			roundBtn.classList.remove('pointer-none');
			selectedCard = 'scissors';
			console.log(selectedCard);
			return;
		}
	});
	roundBtn.addEventListener('click', (e) => {
		// dont start the game if card is not selected
		if (selectedCard === 'none') return;
		console.log('start round');
		playRound();
		return;
	});
};
// events logic

startBtn.addEventListener('click', (e) => {
	console.log('Transitioning to main stage');
	mainDiv.style.opacity = 0; // fadeOut animation
	gameTitle.style.opacity = 0;
	wait(2, stage2Transition);
});

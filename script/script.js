console.log('Initial stage');

//////// creating necessary elements

const title = document.createElement('h1');
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
					If you <span class="green-text">win</span> - you will walk
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
/////// adding elements to the page

document.body.appendChild(title);
document.body.appendChild(main);

///// variables

//initial stage variables
const startBtn = document.querySelector('.btn-start');
const mainDiv = document.querySelector('.main');
const btnContainer = document.querySelector('.button-container');
const messageBox = document.querySelector('.message-box');

//main stage variables
const suspiciousCardContainer = document.querySelector(
	'.suspicious-card--container'
);
const timerContainer = document.querySelector('.timer-container');
// const playerLivesContainer = document.querySelector('.player-life--container');
const playerLife1 = document.querySelector('.life1');
const playerLife2 = document.querySelector('.life2');
const playerLife3 = document.querySelector('.life3');
const playerSelectedCardContainer = document.querySelector('.player-selected');
const roundBtn = document.querySelector('.btn-round');
const playerCardsContainer = document.querySelector('.player-cards');
/////funcions

//helper functions

// function that waits for timeInSec and executes func
const wait = (timeInSec, func) => {
	const time = timeInSec * 1000;
	setTimeout(() => {
		func();
	}, time);
};

///main functions

// function that transitions the game to stage 2
const stage2Transition = () => {
	messageBox.innerHTML = '';
	messageBox.style.display = 'none';
	btnContainer.style.display = 'none';
	mainDiv.style.backgroundImage = 'url(../assets/outcell.jpg)';
	mainDiv.style.opacity = 1; // fadeIn animation
};

// events logic

startBtn.addEventListener('click', (e) => {
	console.log('Transitioning to main stage');
	mainDiv.style.opacity = 0; // fadeOut animation
	wait(2, stage2Transition);
});

roundBtn.addEventListener('click', (e) => {
	console.log('start round');
});

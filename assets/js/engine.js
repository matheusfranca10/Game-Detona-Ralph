const state = {
	view: {
		squares: document.querySelectorAll(".square"),
		enemy: document.querySelector(".enemy"),
		timeLeft: document.querySelector("#time-left"),
		score: document.querySelector("#score"),
		lives: document.querySelector("#lives")
	},

	values: {
		gameVelocity: 1000,
		hitPosition: 0,
		result: 0,
		curretTime: 60,
		currentLives: 3,
	},

	actions: {
		timerId: setInterval(randomSquare, 1000),
		countDownTimerId: setInterval(countDown, 1000),
	},
};


function updateLivesDisplay() {
    state.view.lives.textContent = 'x' + state.values.currentLives;
}


function playSound () {
	let audio = new Audio ("./assets/audios/hit.m4a");
	audio.volume = 0.2;
	audio.play();
}

function playErrorSound() {
    let audio = new Audio("./assets/audios/error.mp3");
    audio.volume = 0.2;
    audio.play();
}

function countDown () {
	state.values.curretTime--;
	state.view.timeLeft.textContent = state.values.curretTime;

	if (state.values.curretTime <= 0) {
		clearInterval(state.actions.countDownTimerId);
		clearInterval(state.actions.timerId);
		alert('Game Over! O seu resultado foi: ' + state.values.result);
	}
}


function randomSquare () {
	state.view.squares.forEach((square) => {
		square.classList.remove("enemy")
	});

	let randomNumber = Math.floor(Math.random()*9);
	let randomSquare = state.view.squares[randomNumber];
	randomSquare.classList.add("enemy");

	state.values.hitPosition = randomSquare.id;
};


/*function moveEnemy () {
	state.values.timeId = setInterval(randomSquare, state.values.gameVelocity);
};*/


function addListenerHitBox () {
	state.view.squares.forEach((square) => {
		square.addEventListener("mousedown", () => {
			if (square.id === state.values.hitPosition) {
				state.values.result++;
				state.view.score.textContent = state.values.result;
				state.values.hitPosition = null;
				playSound();
			}
			else {
				if (state.values.currentLives > 0) {
                    state.values.currentLives--;
                    updateLivesDisplay();
                    playErrorSound();
                }

                if (state.values.currentLives === 0) {
                    clearInterval(state.actions.countDownTimerId);
                    clearInterval(state.actions.timerId);
                    alert('Game Over! O seu resultado foi: ' + state.values.result);
                }
			}
		})
	});
};

function initialize () {
	// moveEnemy();
	addListenerHitBox();
};

initialize();
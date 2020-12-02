'use strict';

// selecting elements
let score0 = document.querySelector('#score--0');
let score1 = document.getElementById('score--1');
const diceImg = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
let current0 = document.getElementById('current--0');
let current1 = document.getElementById('current--1');
const player0 = document.querySelector('.player--0');
const player1 = document.querySelector('.player--1');

// starting values function
const initial = function () {
  score0.textContent = 0;
  score1.textContent = 0;
  totalScores = [0, 0];
  current0.textContent = 0;
  current1.textContent = 0;
  currentScore = 0;
  activePlayer = 0;

  playing = true;
  diceImg.classList.add('hidden');
  player0.classList.add('player--active');
  player1.classList.remove('player--active');
  player0.classList.remove('player--winner');
  player1.classList.remove('player--winner');
};

// switch to the next player function
const switchPlayer = function () {
  document.querySelector(`#current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0.classList.toggle('player--active');
  player1.classList.toggle('player--active');
};

// Rolling dice functionality
btnRoll.addEventListener('click', function () {
  // generating a random number
  if (gamePlaying) {
    const diceRoll = Math.trunc(Math.random() * 6) + 1;

    // display dice
    diceImg.classList.remove('hidden');
    diceImg.src = `dice-${diceRoll}.png`;

    // add dice to the current score
    currentScore += Number(diceRoll);
    console.log(currentScore);
    document.querySelector(
      `#current--${activePlayer}`
    ).textContent = currentScore;

    // check for dice = 1 if true : swich to next player
    if (diceRoll == 1) {
      // switch to the next player
      switchPlayer();
    }
  }
});

// set hold button
btnHold.addEventListener('click', function () {
  // add curent score to scores
  if (gamePlaying) {
    scores[activePlayer] += currentScore;
    console.log(scores[activePlayer]);
    document.querySelector(`#score--${activePlayer}`).textContent =
      scores[activePlayer];

    // check if scores < 100 or not
    // if yes: switch player and continue playing
    if (scores[activePlayer] < 20) switchPlayer();
    // if no: finish the game
    else {
      // set the winner background and the message
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      // stop toggling between activePlayers
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
      document.querySelector(`#current--${activePlayer}`).textContent =
        '🎉 Congrats';
      diceImg.classList.add('hidden');
      gamePlaying = false;
    }
  }
});

// setting new game
btnNew.addEventListener('click', function () {
  initial();
});

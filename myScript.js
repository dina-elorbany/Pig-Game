'use strict';

// select elements
let score0 = document.querySelector('#score--0');
let score1 = document.querySelector('#score--1');
let diceImg = document.querySelector('.dice');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const btnNew = document.querySelector('.btn--new');
let current0 = document.querySelector('#current--0');
let current1 = document.querySelector('#current--1');
let activePlayer = document.querySelector('.player--active');
const player0 = document.querySelector('.player--0');
const player1 = document.querySelector('.player--1');

let playing, currentScore, totalScores;

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

// switch player function
const switchPlayer = function () {
  currentScore = 0;
  document.querySelector(`#current--${activePlayer}`).textContent = 0;

  activePlayer = activePlayer === 0 ? 1 : 0;

  player0.classList.toggle('player--active');
  player1.classList.toggle('player--active');
};

initial();

// setting 🎲 Roll dice btn
btnRoll.addEventListener('click', function () {
  if (playing) {
    // generating a random dice number
    const diceRoll = Math.trunc(Math.random() * 6) + 1;
    console.log(diceRoll);

    // display dice number
    diceImg.src = `dice-${diceRoll}.png`;
    diceImg.classList.remove('hidden');

    // add dice roll to current score
    currentScore += diceRoll;
    console.log(currentScore);

    document.querySelector(
      `#current--${activePlayer}`
    ).textContent = currentScore;

    if (diceRoll === 1) {
      switchPlayer();
    }
  }
});

// setting 📥 Hold btn
btnHold.addEventListener('click', function () {
  if (playing) {
    // add current score to score
    totalScores[activePlayer] += currentScore;
    console.log(totalScores[activePlayer]);
    document.querySelector(`#score--${activePlayer}`).textContent =
      totalScores[activePlayer];

    // check if total scores < 100
    if (totalScores[activePlayer] < 100) switchPlayer();
    else {
      // add winner theme
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');

      // display congrats message
      document.querySelector(`#current--${activePlayer}`).textContent =
        '🎉 Congrats';
      playing = false;

      // remove active class
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    }
  }
});

// setting 🔄 New game btn
btnNew.addEventListener('click', function () {
  initial();
});

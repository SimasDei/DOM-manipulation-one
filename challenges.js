let scores, RoundScore, activePlayer, gameSession, prevDice;

init();

document.querySelector('.btn-roll').addEventListener('click', function() {
  if (gameSession) {
    // 1. Random Number
    let dice = Math.floor(Math.random() * 6) + 1;

    // 2. Display result
    let diceDOM = document.querySelector('.dice');
    diceDOM.style.display = 'block';
    diceDOM.src = `dice-${dice}.png`;

    // 3. Updated round Score IF roll was NOT 1
    if (dice === 6 && prevDice === 6) {
      // Total Score Lost
      scores[activePlayer] = 0;
      document.querySelector(`#score-${activePlayer}`).textContent = 0;
      nextPlayer();
    } else if (dice !== 1) {
      // Add Score
      roundScore += dice;
      document.querySelector(
        `#current-${activePlayer}`
      ).textContent = roundScore;
    } else {
      // Next Player
      nextPlayer();
    }

    prevDice = dice;
  }
});

document.querySelector('.btn-hold').addEventListener('click', function() {
  if (gameSession) {
    // Add CURRENT score to GLOBAL score
    scores[activePlayer] += roundScore;
    // Update the UI
    document.querySelector('#score-' + activePlayer).textContent =
      scores[activePlayer];

    // Check if Played Won
    if (scores[activePlayer] >= 20) {
      document.querySelector('#name-' + activePlayer).textContent =
        'You are Winrar!';
      document.querySelector('.dice').style.display = 'none';
      document
        .querySelector('.player-' + activePlayer + '-panel')
        .classList.add('winner');
      document
        .querySelector('.player-' + activePlayer + '-panel')
        .classList.remove('active');
      gameSession = false;
    } else {
      // Next Player
      nextPlayer();
    }
  }
});

function nextPlayer() {
  activePlayer === 0 ? (activePlayer = 1) : (activePlayer = 0);
  roundScore = 0;

  document.getElementById('current-0').textContent = '0';
  document.getElementById('current-1').textContent = '0';

  document.querySelector('.player-0-panel').classList.toggle('active');
  document.querySelector('.player-1-panel').classList.toggle('active');
  document.querySelector('.dice').style.display = 'none';
}

document.querySelector('.btn-new').addEventListener('click', init);

function init() {
  scores = [0, 0];
  activePlayer = 0;
  roundScore = 0;
  gameSession = true;

  document.querySelector('.dice').style.display = 'none';
  document.getElementById('score-0').textContent = '0';
  document.getElementById('score-1').textContent = '0';
  document.getElementById('current-0').textContent = '0';
  document.getElementById('current-1').textContent = '0';

  document.querySelector('#name-0').textContent = 'Player 1';
  document.querySelector('#name-1').textContent = 'Player 2';

  document.querySelector('.player-0-panel').classList.remove('winner');
  document.querySelector('.player-1-panel').classList.remove('winner');
  document.querySelector('.player-0-panel').classList.remove('active');
  document.querySelector('.player-1-panel').classList.remove('active');

  document.querySelector('.player-0-panel').classList.add('active');
}

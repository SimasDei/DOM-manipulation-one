let scores, RoundScore, activePlayer, gameSession, prevDice;

init();

document.querySelector('.btn-roll').addEventListener('click', function() {
  if (gameSession) {
    // 1. Random Number
    let dice1 = Math.floor(Math.random() * 6) + 1;
    let dice2 = Math.floor(Math.random() * 6) + 1;

    // 2. Display result
    document.getElementById('dice-1').style.display = 'block';
    document.getElementById('dice-2').style.display = 'block';
    document.getElementById('dice-1').src = `dice-${dice1}.png`;
    document.getElementById('dice-2').src = `dice-${dice2}.png`;

    // 3. Updated round Score IF roll was NOT 1
    if (dice1 !== 1 && dice2 !== 1) {
      // Add Score
      roundScore += dice1 + dice2;
      document.querySelector(
        `#current-${activePlayer}`
      ).textContent = roundScore;
    } else {
      // Next Player
      nextPlayer();
    }
  }
});

document.querySelector('.btn-hold').addEventListener('click', function() {
  if (gameSession) {
    // Add CURRENT score to GLOBAL score
    scores[activePlayer] += roundScore;
    // Update the UI
    document.querySelector('#score-' + activePlayer).textContent =
      scores[activePlayer];

    let input = document.querySelector('.final-score').value;
    console.log(input);
    let winningScore;

    // Undefined, 0, null or '' are COERCED to FALSE
    if (input) {
      winningScore = input;
    } else {
      winningScore = 100;
    }

    // Check if Played Won
    if (scores[activePlayer] >= winningScore) {
      document.querySelector('#name-' + activePlayer).textContent =
        'You are Winrar!';

      document.getElementById('dice-1').style.display = 'none';
      document.getElementById('dice-2').style.display = 'none';

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

  document.getElementById('dice-1').style.display = 'none';
  document.getElementById('dice-2').style.display = 'none';
}

document.querySelector('.btn-new').addEventListener('click', init);

function init() {
  scores = [0, 0];
  activePlayer = 0;
  roundScore = 0;
  gameSession = true;

  document.getElementById('dice-1').style.display = 'block';
  document.getElementById('dice-2').style.display = 'block';

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

/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

init();

var scores, roundScore, activePlayer, gamePlaying;

function init() {
  scores = [0, 0];
  roundScore = 0;
  activePlayer = 0;
  document.getElementById('score-0').textContent = '0';
  document.getElementById('score-1').textContent = '0';
  document.getElementById('current-0').textContent = '0';
  document.getElementById('current-1').textContent = '0';
  document.querySelector('.dice').style.display = 'none';
  document.getElementById('name-0').textContent = 'Player 1';
  document.getElementById('name-1').textContent = 'Player 2';
  document.querySelector('.player-0-panel').classList.remove('winner');
  document.querySelector('.player-1-panel').classList.remove('winner');
  document.querySelector('.player-0-panel').classList.remove('active');
  document.querySelector('.player-1-panel').classList.remove('active');
  document.querySelector('.player-0-panel').classList.add('active');
  gamePlaying = true;
}

var prevDice;

document.querySelector('.btn-roll').addEventListener('click', function () {
  if (gamePlaying) {
    var dice = Math.floor(Math.random() * 6) + 1;
    var diceDOM = document.querySelector('.dice');
    diceDOM.style.display = 'block';
    diceDOM.src = 'dice-' + dice + '.png';
    if (dice === prevDice && dice === 6) {
      scores[activePlayer] = 0;
      document.querySelector('#score-' + activePlayer).textContent =
        scores[activePlayer];
      nextPlayer();
    } else if (dice !== 1) {
      //Add Score
      roundScore += dice;
      document.querySelector('#current-' + activePlayer).textContent =
        roundScore;
    } else {
      nextPlayer();
    }
    prevDice = dice;
  }
});

document.querySelector('.btn-hold').addEventListener('click', function () {
  var maxScore = document.getElementById;
  //Add Current score to Global Score
  scores[activePlayer] += roundScore;

  //Update the UI
  if (gamePlaying) {
    document.querySelector('#score-' + activePlayer).textContent =
      scores[activePlayer];
    var input = document.querySelector('.final-score').value;

    if (input) {
      var winningScore = input;
    } else {
      winningScore = 25;
    }

    //Check if the player won
    if (scores[activePlayer] >= winningScore) {
      document.querySelector('#name-' + activePlayer).textContent = 'WINNER!';
      document.querySelector('.dice').style.display = 'none';
      document
        .querySelector('.player-' + activePlayer + '-panel')
        .classList.add('winner');
      document
        .querySelector('.player-' + activePlayer + '-panel')
        .classList.remove('active');
      gamePlaying = false;
    } else {
      nextPlayer();
    }
  }
});

function nextPlayer() {
  activePlayer === 0 ? (activePlayer = 1) : (activePlayer = 0);
  roundScore = 0;

  document.getElementById('current-0').textContent = 0;
  document.getElementById('current-1').textContent = 0;

  document.querySelector('.player-0-panel').classList.toggle('active');
  document.querySelector('.player-1-panel').classList.toggle('active');

  document.querySelector('.dice').style.display = 'none';
}

document.querySelector('.btn-new').addEventListener('click', init);

/*console.log(dice);

document.querySelector('#current-' + activePlayer).textContent = dice;
//document.querySelector('#current-' + activePlayer).innerHTML = '<em>' + dice + '</em>';*/

/*

1)make a prevDice var
2)store a random value like 0 in it temp
3)after conditions store value of dice in prevDice
4)after new dice roll check if prevDice === dice
5)if true check if dice === 6
6)if true scores[activePlayer]= 0;

*/

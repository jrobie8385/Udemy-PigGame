/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score.
  After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

/*
YOUR 3 CHALLENGES
Change the game to follow these rules:

1. A player looses his ENTIRE score when he rolls two 6 in a row. After that, it's the next player's turn.
   (Hint: Always save the previous dice roll in a separate variable)
2. Add an input field to the HTML where players can set the winning score, so that they can change the
   predefined score of 100. (Hint: you can read that value with the .value property in JavaScript.
   This is a good oportunity to use google to figure this out :)
3. Add another dice to the game, so that there are two dices now. The player looses his current score when
   one of them is a 1. (Hint: you will need CSS to position the second dice, so take a look at the CSS
   code for the first one.)
*/

let scores, roundScore, activePlayer, gamePlaying, rollSixCounter;

init();

//document.querySelector("#current-" + activePlayer).textContent = dice;
//document.querySelector("#current-" + activePlayer).innerHTML = "<em>" + dice + "</em>"; //must put this in quotes to indicate that it is html and NOT JavaScript.


//the ".querySelector();" method allows us to change HTML as well as read HTML.
//var x = document.querySelector("#score-0").textContent; //this is a "gettter" sice it gets a value.
//console.log(x);

//document.querySelector(".dice").style.display = "none"; // "style" method, "display" property, and then set to "none"

document.querySelector(".btn-roll").addEventListener("click", function() {
  if (gamePlaying) {
    //1. Get random number.
    let dice = Math.floor(Math.random() * 6 + 1);

    //2. Display result.
    let diceDOM = document.querySelector(".dice");
    diceDOM.style.display = "block";
    diceDOM.src = "dice-" + dice + ".png";

    //Part 1 of challenge, check for two straight six rolls.
    //3. Update the round score if the rolled number was NOT a 1.
    if (dice !== 1 && dice !== 6) { //the extra equals sign does NOT do type conversion.
      //Add score
      rollSixCounter = 0;
      roundScore += dice;
      document.querySelector("#current-" + activePlayer).textContent = roundScore;
      //document.getElementById("score-" + activePlayer).textContent = dice;
    } else if (dice === 6 && rollSixCounter === 0) {
      rollSixCounter++;
      roundScore += dice;
      document.querySelector("#current-" + activePlayer).textContent = roundScore;
    } else if (dice === 6) {
      scores[activePlayer] = 0;
      document.querySelector("#score-" + activePlayer).textContent = scores[activePlayer];
      nextPlayer();
    } else {
      //Next player
      nextPlayer();
    }
  }
});

document.querySelector(".btn-hold").addEventListener("click", function() {
  if(gamePlaying) {
    //Add current score to global score.
    scores[activePlayer] += roundScore;

    //Update the UI.
    document.querySelector("#score-" + activePlayer).textContent = scores[activePlayer];


    //Check if player won the game.
    if(scores[activePlayer] >= document.querySelector(".value-entered").value) {
      document.querySelector("#name-" + activePlayer).textContent = "WINNER!!";
      document.querySelector(".dice").style.display = "none";
      document.querySelector(".player-" + activePlayer + "-panel").classList.add("winner");
      document.querySelector(".player-" + activePlayer + "-panel").classList.remove("active");
      gamePlaying = false;
    }

    //Next player.
    nextPlayer();
  }
});


function nextPlayer() {
  activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
  roundScore = 0;
  rollSixCounter = 0;
  document.getElementById("current-0").textContent = "0";
  document.getElementById("current-1").textContent = "0";

  //document.querySelector(".player-0-panel").classList.remove("active");
  //document.querySelector("player-1-panel").classList.add("active");
  document.querySelector(".player-0-panel").classList.toggle("active");
  document.querySelector(".player-1-panel").classList.toggle("active");

  document.querySelector(".dice").style.display = "none";
};

document.querySelector(".btn-new").addEventListener("click", init); //pass the init function into the event listener.  DO NOT pass in the parenthesis, "init()" because that would incorrectly immediately call the function.

function init() {
  scores = [0, 0];
  roundScore = 0;
  activePlayer = 0;
  rollSixCounter = 0;

  document.querySelector(".dice").style.display = "none";

  gamePlaying = true;

  document.getElementById("score-0").textContent = "0";
  document.getElementById("score-1").textContent = "0";
  document.getElementById("current-0").textContent = "0";
  document.getElementById("current-1").textContent = "0";
  document.getElementById("name-0").textContent = "Player 1";
  document.getElementById("name-1").textContent = "Player 2";
  document.querySelector(".player-0-panel").classList.remove("winner");
  document.querySelector(".player-1-panel").classList.remove("winner");
  document.querySelector(".player-0-panel").classList.remove("active");
  document.querySelector(".player-1-panel").classList.remove("active");
  document.querySelector(".player-0-panel").classList.add("active");
};

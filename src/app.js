 /*eslint-env jquery*/
// empty arrays
// level starts at 0
let gameArray = [];
let playerArray = [];
let level = 0;
let gameCheck = false;

function randNum(min, max) {
  return Math.round(Math.random() * (max - min)) + min;
}

function addgameArray() {
  const pValue = randNum(1, 4);

  // add gameArray to array
  gameArray.push(pValue);
}

function removeClicks() {
// removes all events from element
  $('.square').unbind();
}

function createClicks() {
  $('.square').click(function () {
    // check if clicked element is the right square
    const item = playerArray.shift();

    const squareId = $(this).attr('id');

    $(this).animate({ opacity: .2 }, 200).animate({ opacity: 1 }, 100);

    // if yes remove from used gameArray and add to gameArray
    if (item == squareId) {
      // adds item back to gameArray array
      gameArray.push(item);

      if (playerArray.length <= 0) {
        level++;
        $('#level').html('Level: ' + level);

        removeClicks();
        // user is finished clicking through the gameArray successfully
        // add new square to gameArray
        addgameArray();


        // playgameArray();
        setTimeout(playgameArray, 800);
      }
    } else {
      // else game over
      gameCheck = false;
      $('h2').html('Game Over').css({
        fontSize: 58,
        marginBottom: 15,
        paddingTop: 15,
      });
      $('p').html('Click anywhere on circle to Restart');
      // clear out gameArray arrays
      gameArray = [];
      playerArray = [];
    }
  }); // end .square click
} // end create click

// flash function to make the square flash
function flashSquare() {
  const item = gameArray.pop();
  gameCheck = true;

  // pops and removes first item of array
  $('#' + item).animate({
    opacity: 0.2,
  }, 200).animate({
    opacity: 1,
  }, 100);
  // animation takes 300 ms

  playerArray.push(item);
  // take the item  removed from gameArray and add it to used gameArray

  if (gameArray.length <= 0) {
    // add the click event once cpu is finished showing the gameArray
    createClicks();
  }
} // end flashSquare()

function playgameArray() {
// takes gameArray array
  for (let i = 0; i < gameArray.length; i++) {
    const delayTime = i * 600;
    setTimeout(flashSquare, delayTime);
  }
}


function resetGame() {
  level = 0;

  $('#level').html('Level: ' + level);
}
$('p').html('Click circle to Start Game');


function startGame() {
  removeClicks();
  resetGame();
  addgameArray();
  addgameArray();
  playgameArray();
}


// function that starts game when click on middle circle
$('#circle').click(function() {
  if (gameCheck === false) {
    startGame();
  }
});


let submitClick = $('#submitButton').on('click', function(e){

  e.preventDefault();

  $player1 = $('#player1').val()

  $('.landingPage').css('display', 'none');
  $('.content').text(`${$player1}'s `);

});


var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var keysPressed = 0;

$(document).keydown(function (){

  if (keysPressed === 0){

    nextSequence();
    keysPressed++;

    $('#score').text("");
    $('#restart').text("");

  }

})

$(".btn").click(function () {

  if (keysPressed === 1) {
    var chosenColor = $(this).attr("id");

    userClickedPattern.push(chosenColor);

    playSound(chosenColor);
    btnAnnimation(chosenColor);

    checkAnswer(userClickedPattern[userClickedPattern.length - 1], gamePattern[userClickedPattern.length - 1]);
  }

});

function nextSequence(){
  var randomNumber =  Math.floor(Math.random() * 4);
  var randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);
  $("#" + randomChosenColor).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);

  playSound(buttonColors[randomNumber]);

  $("h1").text("Level " + level);

  level++;
  userClickedPattern = [];
}

function checkAnswer(userChoice, gameChoice){

  if (userChoice === gameChoice) {
    if (userClickedPattern.length < gamePattern.length){
      console.log("correct");
    }
    else {
    setTimeout(function(){
      nextSequence();
      }, 1000);
    }

  } else {

    $("body").addClass("game-over");

    setTimeout(function(){
      $("body").removeClass("game-over");
    }, 200);

    $("h1").text("Oops! Game over. 😞");

    gameOver = new Audio ('sounds/wrong.mp3');
    gameOver.play();

    level--

    $('#score').text("You made it to Level " + level);
    $('#restart').text("Press any key to play Again!");

    gamePattern = [];
    userClickedPattern = [];
    level = 0;
    keysPressed = 0;

  }

}

function playSound(color) {

  var audio = new Audio('sounds/' + color + '.mp3');
  audio.play();

}

function btnAnnimation(currentColor) {

  var activeBtn = document.querySelector("#"+currentColor);

  activeBtn.classList.add("pressed");

  setTimeout(function(){
    activeBtn.classList.remove("pressed");
  }, 75);

}

// declaring the starting variables
var gamePattern = [];
var userClickedPattern = [];
var buttonColours = ["red", "blue", "green", "yellow"];
var once = false;
var levelNumber = 0;

// detecting click and after that
$(".btn").click(function() {

  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);

  playSound(userChosenColour);

  animatePress(userChosenColour);

  checkAnswer(userClickedPattern.length - 1);
});

// detecting keydown
$(document).keydown(function() {
  if (!once) {
    nextSequence();
    once = true;
  }
});

// restart function
function startOver(){
  userClickedPattern =[];
  gamePattern = [];
  once = false;
  levelNumber = 0;
}


// sequence that the computer will display
function nextSequence() {
  // intializig the user selected color to zero
  userClickedPattern = [];

  levelNumber++;
  $("#level-title").text("Level " + levelNumber);

  // pushing the color based on random number in the game pattern
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  // effects on the random color displayed
  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
}

// sound
function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

// flash animation on press
function animatePress(clickedButton) {
  $("#" + clickedButton).addClass("pressed");

  setTimeout(function() {
    $("#" + clickedButton).removeClass("pressed");

  }, 100);
}

// checking user and computer values
function checkAnswer(currentLevel) {

  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    console.log("success");

    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function() {
        nextSequence();
      }, 1000);
    }
  } else {
    var wrongSound = new Audio("sounds/wrong.mp3");
    wrongSound.play();

    $("body").addClass("game-over");
    setTimeout(function() {
      $("body").removeClass("game-over");
    },200);

    $("#level-title").text("Game Over, Press Any Key To Restart");

    startOver();
  }
}

var colours = ["red", "blue", "green", "yellow" ];

var gamePattern = [];
var userClickedPattern = [];


var started = false;
var level = 0;

$(document).keypress(function() {
    if(!started) {
        nextSequence();
        
        animatePress(randomChosenColour);
        
        playSound(randomChosenColour);
        started = true;
    }
});

var i = 0

$(".btn").click(function() {
    while(i<gamePattern.length) {
        userClick(this.id);
        if(gamePattern[i] !== userClickedPattern[i]) {
            gameOver(userClickedPattern[i]);
        }
        i++;
    }
});




function  nextSequence() {
    level += 1;
    var randomNumber = Math.floor(Math.random() * 4);
    $("#level-title").text("Level " + level);
    randomChosenColour = colours[randomNumber];
    gamePattern.push(randomChosenColour);
    // return randomNumber;
}


function userClick (clickedColour) {
    var userChosenColourId = $("#" + clickedColour).attr("id");
        playSound(userChosenColourId);
        animatePress(userChosenColourId);
        userClickedPattern.push(userChosenColourId);
    // return userChosenColourId;
}

function  playSound(name) {
    var sound = new Audio("./sounds/" + name + ".mp3");
    sound.play();
}
function animatePress(currentColour) {
    $("#" + currentColour).addClass("pressed");
    setTimeout(function() { $("#" + currentColour).removeClass("pressed"); }, 100);
}

function gameOver(currentColour) {
    level = 0;
    started = false;
    gamePattern = [];
    userClickedPattern = [];

    $('h1').text("Game Over, Press Any Key to Restart");

    var sound = new Audio("./sounds/wrong.mp3");
    sound.play();

    $("body").addClass("game-over");
    playSound(currentColour);
    setTimeout(function() {
        $("body").removeClass("game-over");
    },100);
}
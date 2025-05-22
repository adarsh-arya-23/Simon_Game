const buttonColours = ["red", "blue", "green", "yellow"];
const gamePattern = [];
const userClickedPattern = [];

let level = 0;
let started = false;

$(document).keypress(function() {
    if (!started) {
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
    }
});

$(".btn").click(function() {
    if (!started) return;
    
    const userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    
    animatePress(userChosenColour);
    playSound(userChosenColour);
    checkAnswer(userClickedPattern.length - 1);
});

function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(() => nextSequence(), 1000);
        }
    } else {
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(() => $("body").removeClass("game-over"), 200);
        $("#level-title").html("Game Over!<br>Press Any Key to Restart");
        startOver();
    }
}

function nextSequence() {
    userClickedPattern.length = 0;
    level++;
    $("#level-title").text("Level " + level);
    
    const randomNumber = Math.floor(Math.random() * 4);
    const randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    
    $("#" + randomChosenColour)
        .addClass("game-choice")
        .fadeIn(100)
        .fadeOut(100)
        .fadeIn(100, function() {
            $(this).removeClass("game-choice");
        });
    
    playSound(randomChosenColour);
}

function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed");
    setTimeout(() => {
        $("#" + currentColor).removeClass("pressed");
    }, 100);
}

function playSound(name) {
    const audio = new Audio(name + ".mp3");
    audio.play();
}

function startOver() {
    level = 0;
    gamePattern.length = 0;
    started = false;
}

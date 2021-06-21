var buttonColours =["red", "blue", "green", "yellow"];

var gamePattern =[];

var userClickedPattern =[];

var level=0;

var started=false;

$(document).on("keypress",function(){
    
    if(!started)
    {
        $("#level-title").text("Level " + level);
        nextSequence();
        started=true;
    }   
});



$(".btn").on("click",function() {
    var userChosenColour =$(this).attr("id")
    userClickedPattern.push(userChosenColour);
    console.log(userClickedPattern);
    playSound(userChosenColour);
    animatePress(userChosenColour);

    checkAnswer(userClickedPattern.length-1);
});


function checkAnswer(counter) {

    if(gamePattern[counter]===userClickedPattern[counter])
    {
        console.log("success");
        if (userClickedPattern.length === gamePattern.length){
            setTimeout(function () {
            nextSequence();
            }, 1000);
        }
    }
    else{
        console.log("wrong");

        playSound("wrong");
        startOver();
        
        $("#level-title").html("Game Over, Press Any Key to Restart");

        $("body").addClass("game-over");

        setTimeout(function () {
            $("body").removeClass("game-over");
        },200);
    }
}


function nextSequence()
{
    userClickedPattern = [];

    level++;
    $("#level-title").html("Level "+level);

    var randomNumber=Math.floor(Math.random()*4);
    var randomChosenColour=buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    
    $("#"+randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
    
}



function playSound(name)
{
    var audio=new Audio("sounds/"+name+".mp3");
    audio.play();
}

function animatePress(currentColor) {
    $("#"+currentColor).addClass("pressed");

    setTimeout(function () {
        $("#" + currentColor).removeClass("pressed");
    }, 100);
    
}


function startOver() {
    started=false;
    level=0;
    gamePattern=[];
    userClickedPattern=[];
}




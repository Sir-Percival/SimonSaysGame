let playing = false;
const colours = ["green", "red", "yellow", "blue"];
let gamePattern = [];
let level = 1;
let choiceNumber = 0;

$(document).on("keydown", (event) => {
    if(!playing)
    {
        if($("body").hasClass("game-over"))
        {
            $("body").removeClass("game-over");
            nextLevel();
        }
        else
        {
            if(event.key === "p")
            {
                nextLevel();
            }
        }
    }
    else
    {
        switch (event.key) {
            case "q":
                checkChoice("green");
                break;
            case "w":
                checkChoice("red");
                break;    
            case "a":
                checkChoice("yellow");
                break;
            case "s":
                checkChoice("blue");
                break;
            default:
        }
    }
})

$(".btn").click((event) => {
    if(playing)
    {
        checkChoice(event.currentTarget.id);
    }
})

function nextLevel()
{
    $("h1").text("Level #" + level);
    gamePattern.push(colours[Math.floor(Math.random()*4)]);
    setTimeout(() => {
        playPattern();
        playing = true;
    }, 1000);
    level++;
    choiceNumber = 0;
    console.log(gamePattern);
}

function playPattern()
{
    for(let i=0; i<gamePattern.length; i++)
    {
        setTimeout(() => {
            animateButton(gamePattern[i]);
        }, i * 500);
    }
}

function animateButton(colour)
{
    $("#" + colour).addClass("pressed");
    new Audio("sounds/" + colour + ".mp3").play();
    $("#" + colour).fadeOut(100).fadeIn(100);
    setTimeout(() => {
        $("#" + colour).removeClass("pressed");
    }, 100);
}

function gameOver()
{
    playing = false;
    new Audio("sounds/wrong.mp3").play();
    $("h1").text("Game over! Press any key to restart");
    $("body").addClass("game-over");
    level = 1;
    gamePattern = [];
}

function checkChoice(colour)
{
    animateButton(colour);

    if(gamePattern[choiceNumber] === colour)
    {
        choiceNumber++;
        if(choiceNumber === gamePattern.length)
        {
            nextLevel();
        }
    }
    else
    {
        gameOver();
    }
}
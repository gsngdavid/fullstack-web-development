function getRandomNumber() {
    return randomNumber = Math.floor(Math.random() * 6) + 1;
}

function setImage(number, inThisClass) {
    if(number === 1) {
        document.querySelector(inThisClass).setAttribute("src", "./images/dice1.png");
    } else if (number === 2) {
        document.querySelector(inThisClass).setAttribute("src", "./images/dice2.png");
    } else if (number === 3) {
        document.querySelector(inThisClass).setAttribute("src", "./images/dice3.png");
    } else if (number === 4) {
        document.querySelector(inThisClass).setAttribute("src", "./images/dice4.png");
    } else if (number === 5) {
        document.querySelector(inThisClass).setAttribute("src", "./images/dice5.png");
    } else {
        document.querySelector(inThisClass).setAttribute("src", "./images/dice6.png");
    }
}

var random1 = getRandomNumber();
var random2 = getRandomNumber();

if(random1 > random2) {
    document.querySelector(".container").firstElementChild.innerHTML = "🚩Prayer 1 Wins!";
} else if(random2 > random1) {
    document.querySelector(".container").firstElementChild.innerHTML = "Prayer 2 Wins!🚩";
} else {
    document.querySelector(".container").firstElementChild.innerHTML = "Draw!";
}

setImage(random1, ".img1");
setImage(random2, ".img2");

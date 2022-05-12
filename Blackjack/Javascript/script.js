/* Declaring variables. */
let userName;
let chipsAmount;
let stakeAmount;
let newAmount;
let cards = [];
let sum = 0;
let hasBlackJack = false;
let isAlive = false;
let message = "";
let messageEl = document.getElementById("message-el");
let sumEl = document.getElementById("sum-el");
let cardsEl = document.getElementById("cards-el");
let playerEl = document.getElementById("player-el");

/**
 * Return a random number between 1 and 13, but if the number is greater than 10, return 10, and if the
 * number is 1, return 11.
 * returns A random number between 1 and 13.
 */
function getRandomCard() {
    let randomNumber = Math.floor( Math.random()*13 ) + 1;
    if (randomNumber > 10) {
        return 10;
    } else if (randomNumber === 1) {
        return 11;
    } else {
        return randomNumber;
    }
}

/**
 * It prompts the user for their name and buy in amount, and then calls the startGame() function
 */
function playerInfo() {
    userName = prompt("Enter your name: ");
    chipsAmount = parseInt(prompt("Enter your buy in: "));
    while (chipsAmount < 1000) {
        alert("Minimum Buy in is ₦1000");
        chipsAmount = prompt("Enter your buy in: ");
    }
    startGame();
}

/**
 * It prompts the user to enter a stake amount, checks if the stake amount is less than 100 or greater
 * than the total buy in, and if it is, it prompts the user to enter a new stake amount. If the stake
 * amount is valid, it subtracts the stake amount from the total buy in and renders the game
 */
function startGame() {
    if (chipsAmount <= 0) {
        alert("You are out of money");
        return 0;
    }
    isAlive = true;
    stakeAmount = parseInt(prompt("Enter stake amount: "));
    while (stakeAmount < 100 || stakeAmount > chipsAmount) {
        if (stakeAmount > chipsAmount) {
            alert("Your stake cannot be larger than the total buy in");
            stakeAmount = prompt("Enter stake amount: ");
        }
        else if (stakeAmount < 100){
            alert("Minimum stake is ₦100");
            stakeAmount = prompt("Enter stake amount: ");
        }
    }
    newAmount = chipsAmount - stakeAmount;
    playerEl.textContent = userName + ": ₦" + newAmount;
    chipsAmount = newAmount;
    let firstCard = getRandomCard();
    let secondCard = getRandomCard();
    cards = [firstCard, secondCard];
    sum = firstCard + secondCard;
    renderGame();
}

/**
 * It renders the game by displaying the cards, sum and message
 */
function renderGame() {
    cardsEl.textContent = "Cards: ";
    for (let i = 0; i < cards.length; i++) {
        cardsEl.textContent += cards[i] + " ";
    }   
    sumEl.textContent = "Sum: " + sum;
    if (sum <= 20) {
        message = "Do you want to draw a new card?";
    } else if (sum === 21) {
        message = "You've got Blackjack!";
        hasBlackJack = true;
        chipsAmount += 1.5 * stakeAmount;
        playerEl.textContent = userName + ": ₦" + chipsAmount;    
        dealAgain();
    } else {
        message = "You're out of the game!";
        isAlive = false;
        dealAgain();
    }
    messageEl.textContent = message;
}

/**
 * It takes the reload button, changes its text to 'DEAL AGAIN', makes it visible, and adds an event
 * listener to it that calls the startGame function
 */
function dealAgain() {
    const reloadBtn = document.querySelector('.reload');
    reloadBtn.innerText = 'DEAL AGAIN';
    reloadBtn.style.display = 'inline-block';
    reloadBtn.addEventListener('click', startGame);
}

/**
 * If the player is alive and doesn't have blackjack, then get a random card, add it to the sum and the
 * cards array, and render the game
 */
function newCard() {
    if (isAlive === true && hasBlackJack === false) {
        let card = getRandomCard();
        sum += card;
        cards.push(card);
        renderGame();        
    }
}
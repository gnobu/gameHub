/*

* create a counter

* Handle turn
1. check if tile is blank
- target the btn and check the innerText
2. check whose turn
    - check if turn label says X
3. make the move
    - if X, input X, else, input O
    - change turn label
    - run the counter
4. check if move wins and announce winner, else...
    - check row, then column, then diagonal
    - if any, return true while passing the winner to the global variable
    - if won, announce winner
    - end the game ( set counter to zero)
5. check if board full, announce draw, else...
    - check if counter is finished
    - if finished, announce draw
    - end the game
6. go again

*/

// create a counter
let empty = 9;

// create empty winner
let winner = '';

function makeMove(x) {
    // target button id
    let btn = document.getElementById(x);

    // check if board not complete and chosen tile is blank
    if (empty > 0 && btn.innerText == '') {
        // target the turn statement
        let turn = document.getElementById('turn');

        // If it's X's turn, do the following...
        if (turn.innerText.includes('X')) {
            btn.classList.add('x')  // add the 'x' class to the tile, making it black text
            btn.innerText = 'X';    // add the text to the tile
            turn.innerText = "O's turn";    // change turns
        } else {    // if it was O's turn do the same as above for O
            btn.classList.add('o')
            btn.innerText = 'O';
            turn.innerText = "X's turn";
        }
        // decrease the blank tile counter after each turn
        empty--;
        
        // check if game is won
        if (checkWinner(x)) {
            // declare winner in the turn label
            turn.innerText = `${winner} wins!`;
            
            // end the game by ending the counter
            empty = 0;
        } else if (checkFull(winner)) { // check for draw
            // declare draw in the turn label
            turn.innerText = "Draw!";
        }
    }
}


// function for reset button to clear the tiles and their classes, also reset the counter.
function reset() {
    for (let i = 1; i <= 9; i++) {
        let btn = document.getElementById(`${i}`);
        btn.innerText = '';
        btn.classList.remove('x', 'o');
        turn.innerText = "X's turn";

        empty = 9;
    }
}


// function that returns true if the board is filled and there is no winner.
let checkFull = () => empty == 0 && winner === '';


// function that returns true if row is complete
function checkRow(j) {
    let row1 = document.getElementById('1').innerText === document.getElementById('2').innerText && document.getElementById('1').innerText === document.getElementById('3').innerText && document.getElementById('1').innerText != '';

    let row2 = document.getElementById('4').innerText === document.getElementById('5').innerText && document.getElementById('4').innerText === document.getElementById('6').innerText && document.getElementById('4').innerText != '';

    let row3 = document.getElementById('7').innerText === document.getElementById('9').innerText && document.getElementById('7').innerText === document.getElementById('8').innerText && document.getElementById('7').innerText != '';

    if (['1', '2', '3'].includes(j)) {
        return row1;
    } else if (['4', '5', '6'].includes(j)) {
        return row2;
    } else {
        return row3;
    }
}


// function that returns true if column is complete
function checkColumn(j) {
    let column1 = document.getElementById('1').innerText === document.getElementById('4').innerText && document.getElementById('1').innerText === document.getElementById('7').innerText && document.getElementById('1').innerText != '';

    let column2 = document.getElementById('2').innerText === document.getElementById('5').innerText && document.getElementById('2').innerText === document.getElementById('8').innerText && document.getElementById('2').innerText != '';

    let column3 = document.getElementById('3').innerText === document.getElementById('6').innerText && document.getElementById('3').innerText === document.getElementById('9').innerText && document.getElementById('3').innerText != '';

    if (['1', '4', '7'].includes(j)) {
        return column1;
    } else if (['2', '5', '8'].includes(j)) {
        return column2;
    } else {
        return column3;
    }
}


// function that returns true if first diagonal is complete
function checkDiagonal1() {
    return document.getElementById(`1`).innerText === document.getElementById(`5`).innerText && document.getElementById(`1`).innerText === document.getElementById(`9`).innerText && document.getElementById(`1`).innerText != '';
} 


// function that returns true if second diagonal is complete
function checkDiagonal2() {
    return document.getElementById(`3`).innerText === document.getElementById(`5`).innerText && document.getElementById('3').innerText === document.getElementById(`7`).innerText && document.getElementById('3').innerText != '';
}


// function that checks if game is won
function checkWinner(pos) {
    if (checkRow(pos)) {
        winner = document.getElementById(pos).innerText;
        return true;
    } else if (checkColumn(pos)) {
        winner = document.getElementById(pos).innerText;
        return true;
    } else if (checkDiagonal1()) {
        winner = document.getElementById(pos).innerText;
        return true;
    } else if (checkDiagonal2()) {
        winner = document.getElementById(pos).innerText;
        return true;
    }
}



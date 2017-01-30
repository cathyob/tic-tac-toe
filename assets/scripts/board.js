'use strict';

let gameBoard = ['', '', '', '', '', '', '', '', ''];
let stillPlaying = true; // to stop move after cats game or win
let firstMoveMade = false; // reference to allow created new saved game
let currentPlayer = 'X'; // x is always the first player

let winnerCallback = function(){}; // Called as a function when the game is drawn or has a winner
let turn = function(){}; // Called as a function when each turn is over

let id = 0; // the id of the board on the server

const setWinnerFunction = function(winner) { // Saves a callback we can call when the game is over
  winnerCallback = winner;
};

const setTurn = function(callback) { // Saves a callback we can call at the end of each turn
  turn = callback;
};

const isTileAvailable = function (index) { // Checks if the game is still running and if the array index is '' (no move made there yet)
  return stillPlaying && gameBoard[index] === '';
};

const getTileValue = function (index) { // Gets the current value of the tile
  return gameBoard[index];
};

// Provided function from fundamentals
const allThree = function(player, cellOne, cellTwo, cellThree) {
  return (cellOne === player) && (cellTwo === player) && (cellThree === player);
};

// Provided function from fundamentals
const winnerIs = function(player) {
  // ROWS BELOW
  return allThree(player, getTileValue('0'), getTileValue('1'), getTileValue('2')) ||
         allThree(player, getTileValue('3'), getTileValue('4'), getTileValue('5')) ||
         allThree(player, getTileValue('6'), getTileValue('7'), getTileValue('8')) ||
  // COLUMNS BELOW
         allThree(player, getTileValue('0'), getTileValue('3'), getTileValue('6')) ||
         allThree(player, getTileValue('1'), getTileValue('4'), getTileValue('7')) ||
         allThree(player, getTileValue('2'), getTileValue('5'), getTileValue('8')) ||
  // DIAGONALS BELOW
         allThree(player, getTileValue('0'), getTileValue('4'), getTileValue('8')) ||
         allThree(player, getTileValue('2'), getTileValue('4'), getTileValue('6'));
};

// Checks if the tile is not blank for isDraw for cat's game determination
const checkTile = function (tile) {
    return tile !== '';
};

// Checks if the game is a draw if every element passes the checkTile method
const isDraw = function() {
  return gameBoard.every(checkTile);
};

// Called each time a player makes a move
const makeMove = function (index) {
  gameBoard[index] = currentPlayer; // Make the next move in the game
  if (winnerIs(currentPlayer)) { // Check if anyone has won the game
    stillPlaying = false; // Used to stop input because the game is over
    winnerCallback(currentPlayer); // Lets the winner callback run, with winning player
  } else if(isDraw()) { // Check if the game is a draw
    stillPlaying = false; // Used to stop input because the game is over
    winnerCallback(null); // Lets the winning callback run, with no winning player
  } else { // If no one has won, switch to the next players turn
    if (currentPlayer === 'X') {
      currentPlayer = 'O';
    } else {
      currentPlayer = 'X';
    }
    turn(currentPlayer); // THIS LINKS TO TURN ANNOUNCEMENT
  }
};

// Provided function from fundamentals
const getWinner = function() {
  if (winnerIs('X')) {
    return 'X';
  }
  if (winnerIs('O')) {
    return 'O';
  }
  return null;
};

const resetBoard = function () {
  gameBoard = ['', '', '', '', '', '', '', '', '']; // reverts game array to be empty
  stillPlaying = true; // reverts so new game is active and not marked as over
  currentPlayer = 'X'; // reverts turn so first player is always x
  firstMoveMade = false; // reverts firstMoveMade to false so new game can be saved after the first move
};

const setUpBoardForGame = function(game) { // when clicking on a prior game this loads that game onto the shown game div
  gameBoard = game.cells; // reverts game array to that game's cells
  stillPlaying = !game.over; // if game isn't over we are now still playing
  let moveCount = 0; // moveCount starts at 0
  gameBoard.forEach((cell) => {
    if (cell === 'X' || cell === 'O') { // if the cell has an X or O...
      moveCount++; // add to the moveCount
    }
  });
  if (moveCount % 2 === 0) {  // figures out who goes next
    currentPlayer = 'X';
  } else {
    currentPlayer = 'O';
  }
  firstMoveMade = true; // there will always have been a first move to even initiate a new game so this will always stay true
};

const currentTurnPlayer = function () { // making this an exportable variable
  return currentPlayer;
};

const stillPlayingGame = function() {
  return stillPlaying; // created because variable wasn't exporting correctly
};

const isFirstMoveMade = function(moveMade) { // made becase variable not being exported correctly
  if(moveMade !== undefined) { // if moveMade was sent...
    firstMoveMade = moveMade; // update the move
  }

  return firstMoveMade;
};

const determineWinner = function(game) {
  gameBoard = game.cells; // the empty gameBoard is replaced with the game on the server's
  game.winner = getWinner(); // get the winner from the game on the server
  gameBoard = ['', '', '', '', '', '', '', '', '']; // reverts game array to be empty to get rid of the game on the server
};

module.exports = {
  isTileAvailable,
  makeMove,
  getTileValue,
  winnerIs,
  getWinner,
  setWinnerFunction,
  setTurn,
  resetBoard,
  isFirstMoveMade,
  id,
  setUpBoardForGame,
  determineWinner,
  stillPlayingGame,
  currentTurnPlayer,
};

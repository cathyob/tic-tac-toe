'use strict';

let gameBoard = ['', '', '', '', '', '', '', '', ''];
let stillPlaying = true;
let currentPlayer = 'X';
let winnerCallback = function(){}; //inside function add way to show winner

const setWinnerFunction = function(winner) {
  winnerCallback = winner;
};

const isTileAvailable = function (index) {
  return stillPlaying && gameBoard[index] === '';
};

const getTileValue = function (index) {
  return gameBoard[index];
};

const allThree = function(player, cellOne, cellTwo, cellThree) {
  return (cellOne === player) && (cellTwo === player) && (cellThree === player);
};

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

const checkTile = function (tile) {
    return tile !== '';
};

const isDraw = function() {
  return gameBoard.every(checkTile);
};

const makeMove = function (index) {
  gameBoard[index] = currentPlayer;
  if (winnerIs(currentPlayer)) {
    stillPlaying = false;
    winnerCallback(currentPlayer);
  } else if(isDraw()) {
    stillPlaying = false;
    winnerCallback(null);
  } else {
    if (currentPlayer === 'X') {
      currentPlayer = 'O';
    } else {
      currentPlayer = 'X';
    }
  }
};

const getWinner = function() {
  if (winnerIs('x')) {
    return 'x';
  }
  if (winnerIs('o')) {
    return 'o';
  }
  return null;
};

module.exports = {
  isTileAvailable,
  makeMove,
  getTileValue,
  winnerIs,
  getWinner,
  setWinnerFunction,
};

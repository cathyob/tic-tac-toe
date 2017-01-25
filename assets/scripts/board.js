// Board ARray
// WaitingTurn = X
// function -> doNextTurn(index)
  // adds waitingTurn to array[index]
  // waiting turn changes to other player if x -> o or vice vera
// function -> isIndexAvailable(index)
  // check board array and see if the array[index] is blank, if it is return true, else false

// 'use strict';
// const 0 = '';
// const 1 = '';
// const 2 = '';
// const 3 = '';
// const 4 = '';
// const 5 = '';
// const 6 = '';
// const 7 = '';
// const 8 = '';
//
// const cellValue = function(cellName) {
//   switch(cellName) {
//     case '0':
//       return 0;
//       break;
//     case '1':
//       return 1;
//       break;
//     case '2':
//       return 2;
//       break;
//     case '3':
//       return 3;
//       break;
//     case '4':
//       return 4;
//       break;
//     case '5':
//       return 5;
//       break;
//     case '6':
//       return 6;
//       break;
//     case '7':
//       return 7;
//       break;
//     case '8':
//       return 8;
//       break;
//     default:
//       return null;
//   }
// };
//
// const allThree = function(player, cellOne, cellTwo, cellThree) {
//   return (cellOne === player) && (cellTwo === player) && (cellThree === player);
// };
//
// const winnerIs = function(player) {
//   // ROWS BELOW
//   return allThree(player, cellValue('0'), cellValue('1'), cellValue('2')) ||
//          allThree(player, cellValue('3'), cellValue('4'), cellValue('5')) ||
//          allThree(player, cellValue('6'), cellValue('7'), cellValue('8')) ||
//   // COLUMNS BELOW
//          allThree(player, cellValue('0'), cellValue('3'), cellValue('6')) ||
//          allThree(player, cellValue('1'), cellValue('4'), cellValue('7')) ||
//          allThree(player, cellValue('2'), cellValue('5'), cellValue('8')) ||
//   // DIAGONALS BELOW
//          allThree(player, cellValue('0'), cellValue('4'), cellValue('8')) ||
//          allThree(player, cellValue('2'), cellValue('4'), cellValue('6'));
// };
//
//
// const getWinner = function() {
//   if (winnerIs('x')) {
//     return 'x';
//   }
//   if (winnerIs('o')) {
//     return 'o';
//   }
//   return null;
// };

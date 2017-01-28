'use strict';

const getFormFields = require(`../../../lib/get-form-fields`);

const api = require('./api');
const ui = require('./ui');

const store = require('../store');
const board = require('../board');

// Setup the board so we can start playing
board.setWinnerFunction(ui.gameOver); // When game is over call the gameOver function for the ui
board.setTurn(ui.turnChange); // When a turn is over call turnChange function for the ui
ui.turnChange('X'); // Let the UI know that 'X' is the starting player

const onSignIn = function (event) {
  event.preventDefault();
  let data = getFormFields(event.target);

  api.signIn(data)
    .then((response) => {
      store.user = response.user; // user that is logged in is now saved
    })
    .then(() => {
      api.getGamesForUser().then((gamesResponse) => { // gets all games saved to that user
       store.games = gamesResponse.games; // this saves the games to use later

       store.games.forEach((game) => { // will go through each past game and determine the winner if any
         board.determineWinner(game);
       });

       ui.setGameHistory(gamesResponse.games); // this method passes an array of all the past games to the UI to use in the game history section
      });
    })
    .then(ui.signInSuccess)
    .then(() => {
      console.log(store);
    })
    .catch(ui.signInFailure);
};

// USER ACCOUNT ACTIONS
const onSignUp = function (event) {
  event.preventDefault();

  let data = getFormFields(event.target);

  api.signUp(data)
    .then(ui.signUpSuccess)
    .catch(ui.signUpFailure);
};

// USER ACCOUNT ACTIONS
const onChangePassword = function (event) {
  event.preventDefault();

  let data = getFormFields(event.target);

  api.changePassword(data)
    .then(ui.changePasswordSuccess)
    .catch(ui.changePasswordFailure)
    ;
};

const startNewGame = function () {
  if(store.user !== undefined) { // checks if we have a user to get games for before moving on
      // reusing part of onSignIn in order to update the game history when the start new game button is clicked
    api.getGamesForUser().then((gamesResponse) => { // gets all games saved to that user
     store.games = gamesResponse.games; // this saves the games to use later

     store.games.forEach((game) => { // will go through each past game and determine the winner if any
       board.determineWinner(game);
     });

     ui.setGameHistory(gamesResponse.games); // this method passes an array of all the past games to the UI to use in the game history section

     ui.turnChange('X'); // Let the UI know that 'X' is the starting player
     board.resetBoard();
     ui.deleteOldGameTiles();
     ui.startNewGame();
    });
  } else {
    ui.turnChange('X'); // Let the UI know that 'X' is the starting player
    board.resetBoard();
    ui.deleteOldGameTiles();
    ui.startNewGame();
  }
};

// USER ACCOUNT ACTIONS
const onSignOut = function (event) {
  event.preventDefault();

  api.signOut()
    .then(() => {
      delete store.user;
      startNewGame(); // this removes the game after user signs out in the middle of it so another user doesn't see it when they log in next
      return store;
    })
    .then(ui.signOutSuccess)
    .catch(ui.failure)
    ;
};

// UPDATE GAME ON SERVER
const updateGame = function (board, index) { // split code into 2nd function to make easier to read
  api.saveGamesForUser(board.id, index, board.getTileValue(index), !board.stillPlayingGame()) // since game is now saved, we can now update the game id with the move on the tile (index), using the player's mark (index), but only if the game is not over
  .then((response) => {
    console.log(response); // see console log and array will show the last move change
  });
};

// CLICKING ACTION
const clickedSpace = function () {
  let id = this.getAttribute('data-id'); // gets the data-id off the gameboard div
  if (board.isTileAvailable(id)) { // checks if div is available or already marked
    board.makeMove(id); // if available makes move onto the data id in the div
    if (board.firstMoveMade === false) { // if the game's first move has not been made do this
      board.firstMoveMade = true; // now that first move is made, firstMoveMade is now true
      api.createGamesForUser() // creates new board for the user after the first move
      .then((response) => {
        board.id = response.game.id; // board is valid, saves the id number of the game
        console.log(response); // see console to see new game id number
        updateGame(board, id); // now that game is created so update the move
      });
    }
    else {
      updateGame(board, id); // if game already existed simply update the move
    }
    $(this).text(board.getTileValue(id)); // that div is now set to x or o based on the board
  }
};

const addHandlers = () => {
  $('#sign-up').on('submit', onSignUp);
  $('#sign-in').on('submit', onSignIn);
  $('#change-password').on('submit', onChangePassword);
  $('#sign-out').on('click', onSignOut);
  $('#start-new-game').on('click', startNewGame);
  $('.tile').on('click', clickedSpace);
  $(".close-dropdown").click(function() {
   $(".dropdown-toggle").dropdown("toggle");
});
};

module.exports = {
  addHandlers,
};

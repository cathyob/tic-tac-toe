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

// TODO
// TODO create storage for past games
// TODO add hide/show features for game history buttton dropdown
// TODO attach to game history button/dropdown to reset button group
// TODO ASK INSTRUCTOR - ok to use "username" text prompt because server doesn't allow replacing username credentials?
// TODO


// USER ACCOUNT ACTIONS
const onSignIn = function (event) {
  event.preventDefault();

  let data = getFormFields(event.target);

  // if (store.user !== null) {
  //   ui.signInFailureLogged();
  // } else {
  api.signIn(data)
    .then((response) => {
      store.user = response.user;
      return store.user;
    })
    .then(ui.signInSuccess)
    .then(() => {
      console.log(store);
    })
    .catch(ui.signInFailure);
  // }
};

// const onSignInTest = function(event) { // This whole method can be deleted when APIs work
//   event.preventDefault();
//
//   let data = getFormFields(event.target);
//
//   api.signIn(data)
//     .then((response) => {
//       store.user = response.user;
//       api.getGamesForUser()
//         .then((result) => {
//           console.log("Game Success Result");
//           console.log(result);
//         })
//         .catch((result) => {
//           console.log("Game Failure Result");
//           console.log(result);
//         });
//
//       return store.user;
//     });
// };

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
  ui.turnChange('X'); // Let the UI know that 'X' is the starting player
  board.resetBoard();
  ui.deleteOldGameTiles();
  ui.startNewGame();
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

// CLICKING ACTION
const clickedSpace = function () {
  let id = this.getAttribute('data-id');
  if (board.isTileAvailable(id)) {
    board.makeMove(id);
    $(this).text(board.getTileValue(id));
  }
};

const addHandlers = () => {
  $('#sign-up').on('submit', onSignUp);
  $('#sign-in').on('submit', onSignIn);
  // $('#sign-in').on('submit', onSignInTest); // uncomment this and comment above in order to test with onSignInTest
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

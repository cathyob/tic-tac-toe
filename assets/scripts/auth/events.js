'use strict';

const getFormFields = require(`../../../lib/get-form-fields`);

const api = require('./api');
const ui = require('./ui');

const store = require('../store');
const board = require('../board');

board.setWinnerFunction(ui.gameOver);
board.setTurn(ui.turnChange);
ui.turnChange('X');

// TODO
// TODO prevent someone from logging in when another user is already active
// TODO create board function to reset gameBoard and stillPlaying and currentPlayer and call ui.turnChange
// TODO

// USER ACCOUNT ACTIONS
const onSignUp = function (event) {
  event.preventDefault();

  let data = getFormFields(event.target);

  api.signUp(data)
    .then(ui.signUpSuccess)
    .catch(ui.signUpFailure);
};

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

// USER ACCOUNT ACTIONS
const onChangePassword = function (event) {
  event.preventDefault();

  let data = getFormFields(event.target);

  api.changePassword(data)
    .then(ui.changePasswordSuccess)
    .catch(ui.changePasswordFailure)
    ;
};

// USER ACCOUNT ACTIONS
const onSignOut = function (event) {
  event.preventDefault();

  api.signOut()
    .then(() => {
      delete store.user;
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
  $('#change-password').on('submit', onChangePassword);
  $('#sign-out').on('click', onSignOut);
// handler for newGame?
  $('.tile').on('click', clickedSpace);
  $(".close-dropdown").click(function() {
   $(".dropdown-toggle").dropdown("toggle");
});

  // Add for each space the clickedSpace event
};

module.exports = {
  addHandlers,
};

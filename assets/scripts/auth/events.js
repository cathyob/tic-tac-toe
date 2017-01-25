'use strict';

const getFormFields = require(`../../../lib/get-form-fields`);

const api = require('./api');
const ui = require('./ui');

const store = require('../store');
// const board = require('../board');

// TODO prevent someone from logging in when another user is already active

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

  if(this.id === "space0") {
    console.log("0");
    // if (board.atIndex(0) === '') {
      // Set board.array[0] to X or O
    // }
      // Set board.doNextTurn(0) - write this method in board
    // else (if you want to show an error)
      // Update some label / paragraph on the html side to show error
  } else if(this.id === "space1") {
    console.log("1");
    // Set board.array[1] to X or O
  } else if(this.id === "space2") {
    console.log("2");
    // Set board.array[1] to X or O
  } else if(this.id === "space3") {
    console.log("3");
    // Set board.array[1] to X or O
  } else if(this.id === "space4") {
    console.log("4");
    // Set board.array[1] to X or O
  } else if(this.id === "space5") {
    console.log("5");
    // Set board.array[1] to X or O
  } else if(this.id === "space6") {
    console.log("6");
    // Set board.array[1] to X or O
  } else if(this.id === "space7") {
    console.log("7");
    // Set board.array[1] to X or O
  } else if(this.id === "space8") {
    console.log("8");
    // Set board.array[1] to X or O
  }
};

const addHandlers = () => {
  $('#sign-up').on('submit', onSignUp);
  $('#sign-in').on('submit', onSignIn);
  $('#change-password').on('submit', onChangePassword);
  $('#sign-out').on('submit', onSignOut);
// handler for newGame?
  $('#space0').on('click', clickedSpace);
  $('#space1').on('click', clickedSpace);
  $('#space2').on('click', clickedSpace);
  $('#space3').on('click', clickedSpace);
  $('#space4').on('click', clickedSpace);
  $('#space5').on('click', clickedSpace);
  $('#space6').on('click', clickedSpace);
  $('#space7').on('click', clickedSpace);
  $('#space8').on('click', clickedSpace);

  // Add for each space the clickedSpace event
};

module.exports = {
  addHandlers,
};

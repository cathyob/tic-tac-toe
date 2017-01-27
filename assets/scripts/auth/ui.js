'use strict';

const store = require('../store');
const board = require('../board');

const success = (data) => {
  if (data) { console.log(data); }
};

const failure = (error) => {
  console.error(error);
};

const signInSuccess = (data) => {
  // these two remove text from input field when successfully submitted
  $('.email-sign-in').val("");
  $('.pass-sign-in').val("");
  // this will show the active user name
  $('.active-user').text(store.user.email + " is logged in!");
  // hide the sign-in and sign-up forms once someone is logged in
  $('#sign-in-form').hide();
  $('#sign-up-form').hide();
  // reveal the sign-out, change password and game list options once someone is logged in
  $("#change-password-form").removeClass('hidden');
  $("#sign-out").removeClass('hidden');
  $("#game-history-button").removeClass('hidden');
  // hides waiting image and please sign in message once logged in
  $("#waiting-for-user").addClass('hidden');
  $("#please-sign-in").addClass('hidden');
  // displays turn/winner and game if sign in is successfull
  $("#turn-or-winner").removeClass('hidden');
  $("#game-board-display").removeClass('hidden');
  if (data) { console.log(data); }
};

const signInFailure = (error) => {
  // this will show the password was invalid
  $('.active-user').text("Sorry, that username or password was incorrect");
  console.error(error);
};

const changePasswordSuccess = (data) => {
  // these two remove text from input field when successfully submitted
  $('.current-password-change').val("");
  $('.new-password-change').val("");
  // this will show the active user name
  $('.active-user').text(store.user.email + "'s password has been updated!");
  if (data) { console.log(data); }
};

const changePasswordFailure = (error) => {
  // this removes text from input field when unsuccessfully submitted
  $('.current-password-change').val("");
  // this will show the password was invalid
  $('.active-user').text("Sorry, that current password was incorrect");
  console.error(error);
};

const signUpSuccess = (data) => {
  // these three remove text from input field when successfully submitted
  $('.email-sign-up').val("");
  $('.password-sign-up').val("");
  $('.password-confirmation-sign-up').val("");
  // this will show the active user name
  $('.active-user').text("Thank you for joining! You are now logged in!");
  // hide the sign-in and sign-up forms once someone is signed up
  $('#sign-in-form').hide();
  $('#sign-up-form').hide();
  // reveal sign-out and change password options once someone is signed up
  $("#change-password-form").removeClass('hidden');
  $("#sign-out").removeClass('hidden');
  // hides waiting image and please sign in message once logged in
  $("#please-sign-in").addClass('hidden');
  $("#waiting-for-user").addClass('hidden');
  // displays turn/winner, game, and game history if sign in is successfull
  $("#turn-or-winner").removeClass('hidden');
  $("#game-board-display").removeClass('hidden');
  $("#game-history-button").removeClass('hidden');
  if (data) { console.log(data); }
};

const signUpFailure = (error) => {
  // this removes text from input field when unsuccessfully submitted
  $('.email-sign-up').val("");
  $('.password-sign-up').val("");
  $('.password-confirmation-sign-up').val("");
  // this will show the password was invalid
  $('.active-user').text("Sorry, that username has been used or your passwords did not match.");
  console.error(error);
};

const signOutSuccess = (data) => {
  // this will show that no one is logged in
  $('.active-user').text("No one is logged in :(");
  // reveal the sign-in and sign-up options once signed out
  $('#sign-in-form').show();
  $('#sign-up-form').show();
  // hide sign-out and change password once logged out
  $("#change-password-form").addClass('hidden');
  $("#sign-out").addClass('hidden');
  // reveals waiting image once signed out
  $("#waiting-for-user").removeClass('hidden');
  // hides turn/winner, game, and game history if sign out is successfull
  $("#turn-or-winner").addClass('hidden');
  $("#game-board-display").addClass('hidden');
  $("#game-history-button").addClass('hidden');
  // removes hidden class and adds back so we don't end up with two hidden classes on reset if signed out before reset game is clicked
  $("#reset-button").removeClass('hidden');
  $("#reset-button").addClass('hidden');
  if (data) { console.log(data); }
};

const gameOver = (data) => {
  if (data) {
    $('.winner-announcement').text(data + ' won!');
  } else {
    $('.winner-announcement').text('The game was a draw! Try again?');
  }
  $("#reset-button").removeClass('hidden');
};
// $('.email-input-up').val("");

const turnChange = (data) => {
  $('.winner-announcement').text(data + "'s turn!");
};

// is referenced by events startNewGame
const deleteOldGameTiles = () => {
  $('.tile').text('');
};

const startNewGame = () => {
  $("#reset-button").addClass('hidden');
};

const setCurrentGame = (data) => {
  store.currentGame = data;
  board.gameBoard = data.cells;
  console.log("Any new game data?");
  if (data) { console.log(data); }
};

const setGameHistory = (data) => {
  $('#game-history-list').text("This is where the user's list of games will go!");
  console.log("Any game history data?");
  if (data) { console.log(data); }
};

module.exports = {
  failure,
  success,
  signInSuccess,
  signInFailure,
  changePasswordSuccess,
  changePasswordFailure,
  signUpSuccess,
  signUpFailure,
  signOutSuccess,
  gameOver,
  turnChange,
  deleteOldGameTiles,
  startNewGame,
  setCurrentGame,
  setGameHistory
};

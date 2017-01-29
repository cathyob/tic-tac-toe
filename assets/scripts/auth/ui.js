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
  $('#initial-user-options').hide();
  // reveal the sign-out, change password, game list options, and who is logged in once someone is logged in
  $("#active-user-options").removeClass('hidden');
  $("#user-status").removeClass('hidden');
  // hides waiting image and please sign in message once logged in
  $("#waiting-for-sign-in").addClass('hidden');
  // displays turn/winner and game if sign in is successfull
  $("#user-is-playing").removeClass('hidden');
  if (data) { console.log(data); }
};

const signInFailure = (error) => {
  // this will show the password was invalid
  $("#user-status").removeClass('hidden');
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
  // this will confirm their sign up was sucessful
  $("#user-status").removeClass('hidden');
  $('.active-user').text("Thank you for joining! Please log in to start playing");

  // $(".change-password").click(function() {
  //  $(".dropdown-toggle").dropdown("toggle");
  // // choosing NOT to hide the sign up form so user can make another account

  if (data) { console.log(data); }
};

const signUpFailure = (error) => {
  // this removes text from input field when unsuccessfully submitted
  $('.email-sign-up').val("");
  $('.password-sign-up').val("");
  $('.password-confirmation-sign-up').val("");
  // this will show the password was invalid
  $("#user-status").removeClass('hidden');
  $('.active-user').text("Sorry, that username has been used or your passwords did not match.");
  console.error(error);
};

const signOutSuccess = (data) => {
  // this will show that no one is logged in
  $('.active-user').text("No one is logged in :(");
  // reveal the sign-in and sign-up options once signed out
  $('#initial-user-options').show();
  // hid the sign-out, change password, game list options, and who is logged in once user is
  $("#active-user-options").addClass('hidden');
  $("#user-status").addClass('hidden');
  // reveals please sign in message and waiting image once signed out
  $("#waiting-for-sign-in").removeClass('hidden');
  // hides turn/winner and game if sign out is successfull
  $("#user-is-playing").addClass('hidden');
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
  $('#game-history-list').empty(); // gets rid of any children games in the list from prior users
  if (data.length === 0) {
    $('#game-history-list').text("Play some games so we can store them here!");
  } else {
    $('#game-history-list').text("");
    data.forEach((game) => {
      let completed = "is in progress";

      if (game.over === true) {
        if (game.winner === null) {
          completed = "ended in a draw";
        } else if (game.winner === 'X') {
          completed = "was won by X";
        } else if (game.winner === 'O') {
          completed = "was won by O";
        }
      }
      $('#game-history-list').append("<p>Game " + game.id + " " + completed + "</p>");
    }
  );
  }
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

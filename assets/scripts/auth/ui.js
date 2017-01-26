'use strict';

const store = require('../store');

const success = (data) => {
  if (data) { console.log(data); }
};

const failure = (error) => {
  console.error(error);
};

// TODO prevent someone from logging in when another user is already active

const signInSuccess = (data) => {
  // these two remove text from input field when successfully submitted
  $('.email-sign-in').val("");
  $('.pass-sign-in').val("");
  // this will show the active user name
  $('.active-user').text(store.user.email + " is logged in!");
  if (data) { console.log(data); }
};

const signInFailure = (error) => {
  // this removes text from input field when successfully submitted
  $('.pass-sign-in').val("");
  // this will show the password was invalid
  $('.active-user').text("Sorry, that password was incorrect");
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
  // these two remove text from input field when successfully submitted
  $('.email-sign-up').val("");
  $('.password-sign-up').val("");
  $('.password-confirmation-sign-up').val("");
  // this will show the active user name
  $('.active-user').text(store.user.email + "has joined and is logged in!");
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
  if (data) { console.log(data); }
};

const gameOver = (data) => {
  if (data) {
    $('.winner').text(data + ' won!');
  } else {
    $('.winner').text('The game was a draw! Try again?');
  }
};
// $('.email-input-up').val("");

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
  gameOver
};

'use strict';

const store = require('../store');
const board = require('../board');
const api = require('./api');

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
};

const signInFailure = (error) => {
  // this will show the password was invalid
  $("#user-status").removeClass('hidden');
  $('.active-user').text("Sorry, that username or password was incorrect");
};

const changePasswordSuccess = (data) => {
  // these two remove text from input field when successfully submitted
  $('.current-password-change').val("");
  $('.new-password-change').val("");
  // this will show the active user name
  $('.active-user').text(store.user.email + "'s password has been updated!");
};

const changePasswordFailure = (error) => {
  // this removes text from input field when unsuccessfully submitted
  $('.current-password-change').val("");
  // this will show the password was invalid
  $('.active-user').text("Sorry, that current password was incorrect");
};

const signUpSuccess = (data) => {
  // these three remove text from input field when successfully submitted
  $('.email-sign-up').val("");
  $('.password-sign-up').val("");
  $('.password-confirmation-sign-up').val("");
  // this will confirm their sign up was sucessful
  $("#user-status").removeClass('hidden');
  $('.active-user').text("Thank you for joining! Please log in to start playing");
  // choosing NOT to hide the sign up form so user can make another account
};

const signUpFailure = (error) => {
  // this removes text from input field when unsuccessfully submitted
  $('.email-sign-up').val("");
  $('.password-sign-up').val("");
  $('.password-confirmation-sign-up').val("");
  // this will show the password was invalid
  $("#user-status").removeClass('hidden');
  $('.active-user').text("Sorry, that username has been used or your passwords did not match.");
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
};

const signOutFailure = (error) => {
  // this will show the sign out didn't work
  $('.active-user').text("Sorry that sign out failed, please try again.");
};

const gameOver = (data) => {
  if (data) {
    $('.winner-announcement').text(data + ' won!');
  } else {
    $('.winner-announcement').text('The game was a draw! Try again?');
  }
};

const prepareForNewGame = function() {
   $("#reset-button").removeClass('hidden');
};

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
};


// THIS IS WHAT SETS UP THE LIST OF GAMES AND THEN RESTORES THE GAMES ON CLICK
const setGameHistory = (data) => {
  $('#game-history-list').empty(); // gets rid of any games from other users
  if (data.length === 0) { // if no games played, displays this message
    $('#game-history-list').text("Play some games so we can store them here!");
  } else { // otherwise, we will list the games and make them clickable
    $('#game-history-list').text(""); // clears the message if there is a game history
    let gameCounter = 0; // using game counter to interate through all listed games so they each have a custom number in order to link them
    data.forEach((game) => { // this iterates through the list and sets up the messages
      let completed = "is in progress"; // default message is in progress until over=true or null

      if (game.over === true) { // if over=true...
        if (game.winner === null) { // and over=null then set message
          completed = "ended in a draw";
        } else if (game.winner === 'X') { // or over=true and winner is x set message
          completed = "was won by X";
        } else if (game.winner === 'O') { // or over=true and winner is o set message
          completed = "was won by O";
        }
      }
      $('#game-history-list').append('<p class="restore-game" data-id="' + gameCounter + '">Game ' + game.id + ' ' + completed + '</p>');
      gameCounter++; // but before next loop increment game counter up by one so they each have unique numbers
    });
    // in addition to text above, then make each text clickable
    $('.restore-game').click(function() {
      // Start to restore the selected game - we have to do this before
      // we reload all the games or might load the wrong game

      // Update the game list so we include our currently played game
      api.getGamesForUser().then((gamesResponse) => { // gets all games saved to that user
        let id = this.getAttribute('data-id'); // gets the data-id from 136
        let game = store.games[id]; // gets the stored game

        store.games = gamesResponse.games; // this saves the games to use later

         store.games.forEach((game) => { // will go through each past game and determine the winner if any
           board.determineWinner(game);
         });

         setGameHistory(gamesResponse.games); // this method passes an array of all the past games to the UI to use in the game history section

         board.setUpBoardForGame(game); // updates the game board array
         board.id = game.id; // sets board id to game id so we can call and edit it

        // Reload the visible cells to match the board
        let tiles = $('.tile'); // GET LIST OF ALL GAME TILES FROM HTML
        for(let i = 0; i < tiles.length; i++) { // this sets up the visual board
            let value = board.getTileValue(i); // GETS VALUE FROM THE BOARD (line 140)
            let tile = tiles[i]; // gets each individual tile on the screen
            $(tile).text(value); // then this sets the value on those tiles
        }

        $("#reset-button").removeClass('hidden'); // if game was over show start new game button

        if(board.stillPlayingGame()) { // if game was NOT over, don't show the new game button
          $("#reset-button").addClass('hidden');
        }

        if(board.stillPlayingGame()) { // if game was still playing...
          turnChange(board.currentTurnPlayer()); // update the turn message
        } else { // if game was over...
          gameOver(board.getWinner()); // update the win message
        }
    });
   });
  }
};

module.exports = {
  signInSuccess,
  signInFailure,
  changePasswordSuccess,
  changePasswordFailure,
  signUpSuccess,
  signUpFailure,
  signOutSuccess,
  signOutFailure,
  gameOver,
  turnChange,
  deleteOldGameTiles,
  startNewGame,
  setCurrentGame,
  setGameHistory,
  prepareForNewGame
};

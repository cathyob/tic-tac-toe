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
// TODO ADD WAY TO DISPLAY ACTIVE GAME IDs SO USER CAN SELECT TO UP ANY UNCOMPLETE GAME
// TODO fix empty div above game history/change password, sign out buttongs (reduce hides to just the containing div?)
// TODO create storage for past games
// TODO ASK INSTRUCTOR - ok to use "username" text prompt because server doesn't allow replacing username credentials?
// TODO

// CHECK TO SEE GAMES
// const getGames = function () {
//   event.preventDefault();
//   api.getGamseForUser()
//   .then((response) => {
//   store.games = response.games;
//   let g = []; // empty array to hold all games that are over
//   for (let i = 0, max = store.games.length; i < max; i++) {
//     if (store.games[i].over === false) { // only show games that are over
//       g.push(store.games[i].id); // pushing those into the empty array
//     }
//
//     // if ($('#temp')) {
//     //   $('#temp').remove();
//     // }
//     if (g[0] === undefined) {
//       $('#game-history-list').text("You haven't played any games yet. Better get started!");
//     }
//   }
// }
//   .then(ui.success)
//   .catch(ui.failure)
// );
// };

// USER ACCOUNT ACTIONS
// const onSignIn = function (event) {
//   event.preventDefault();
//
//   let data = getFormFields(event.target);
//
//   // if (store.user !== null) {
//   //   ui.signInFailureLogged();
//   // } else {
//   api.signIn(data)
//     .then((response) => {
//       store.user = response.user;
//       return store.user;
//     })
//     .then(ui.signInSuccess)
//     .then(() => {
//       console.log(store);
//     })
//     .catch(ui.signInFailure);
//   // }
// };

// const onSignIn = function (event) {
//   event.preventDefault();
//   let data = getFormFields(event.target);
//   // if (store.user !== null) {
//   //   ui.signInFailureLogged();
//   // } else {
//   api.signIn(data)
//     .then((response) => {
//       store.user = response.user;
//       return store.user;
//     })
//      .then(() => {
//       api.getGamesForUser().then((gamesResponse) => {
//         console.log('Response is '); // TESTING
//         console.log(gamesResponse); // TESTING
//       // let currentGame = null;
//       let pastGames = [];
//       // store.games = gamesResponse.games;
//       // store.games.forEach((game) => {
//         //  if(game.over === false && (currentGame === null)) {
//         //    currentGame = game;
//         //  } else if(game.over === true) {
//         //     pastGames.push(game);
//         //  } else {
//         //     // We have another open game, and this is bad, handle it somehow
//         // }
//       store.games = gamesResponse.games;
//       store.games.forEach((game) => {
//          pastGames.push(game);
//        });
//       // ui.setCurrentGame(currentGame); // this method would take the current game object and setup the game on the screen / board model
//       // ui.setGameHistory(pastGames); // this method passes an array of all the past games to teh UI to use in the game history section
//       }
//     );
//   })
//     .then(ui.signInSuccess)
//     .then(() => {
//       console.log(store);
//     })
//     .catch(ui.signInFailure);
//   // }
// };

const onSignIn = function (event) {
  event.preventDefault();
  let data = getFormFields(event.target);

  api.signIn(data)
    .then((response) => {
      store.user = response.user;
      return store.user;
    })
    .then(() => {
      api.getGamesForUser().then((gamesResponse) => {
       store.games = gamesResponse.games;
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

// const onSignInTest = function(event) { // This whole method can be deleted when APIs work
//   event.preventDefault();
//
//   let data = getFormFields(event.target);
//
//   api.signIn(data)
//     .then((response) => {
//       store.user = response.user;
//       api.createGamesForUser()
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

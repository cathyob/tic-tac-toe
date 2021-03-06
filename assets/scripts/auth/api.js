'use strict';

const config = require('../config');
const store = require('../store');

const signUp = function (data) {
  return $.ajax({
    url: config.apiOrigin + '/sign-up',
    method: 'POST',
    data,
  });
};

const signIn = function (data) {
  return $.ajax({
    url: config.apiOrigin + '/sign-in',
    method: 'POST',
    data,
  });
};

const changePassword = function (data) {
  return $.ajax({
    url: `${config.apiOrigin}/change-password/${store.user.id}`,
    method: 'PATCH',
    headers: {
      Authorization: `Token token=${store.user.token}`,
    },
    data,
  });
};

const signOut = function () {
  return $.ajax({
    url: config.apiOrigin + '/sign-out/' + store.user.id,
    method: 'DELETE',
    headers: {
      Authorization: `Token token=${store.user.token}`,
    },
  });
};

// GETS FULL LIST OF GAMES FOR USER
const getGamesForUser = function () {
  return $.ajax({
    url: config.apiOrigin + '/games',
    method: 'GET',
    headers: {
      Authorization: `Token token=${store.user.token}`,
    },
  });
};

// STARTS A NEW GAME FOR USER
const createGamesForUser = function () {
  return $.ajax({
    url: config.apiOrigin + '/games',
    method: 'POST',
    headers: {
      Authorization: `Token token=${store.user.token}`,
    },
  });
};

// SAVES GAMES FOR USER
const saveGamesForUser = function (boardId, move, value, gameOver) {
  return $.ajax({
    url: config.apiOrigin + '/games/' + boardId,
    method: 'PATCH',
    headers: {
      Authorization: `Token token=${store.user.token}`,
    },
    data: {
      "game": {
        "cell": {
          "index": move,
          "value": value,
        },
    "over": gameOver,
  }
}
  });
};

module.exports = {
  signUp,
  signIn,
  changePassword,
  signOut,
  getGamesForUser,
  createGamesForUser,
  saveGamesForUser
};

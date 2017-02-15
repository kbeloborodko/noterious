'use strict';

angular.module('noterious.common')
  .service('BoardsModel', function ($http, UserModel, ENDPOINT_URI) {
    var service = this;

    function extract (response) {
      return response.data;
    }

    function getUrl () {
      return ENDPOINT_URI + '/users/' + UserModel.getCurrentUser() + '/boards.json';
    }

    function getUrlForId (boardId) {
      return ENDPOINT_URI + '/users/' + UserModel.getCurrentUser() + '/boards/' + boardId + '.json';
    }

    service.all = function () {
      return $http.get(getUrl()).then(extract);
    };

    service.fetch = function (boardId) {
      return $http.get(getUrlForId(), boardId).then(extract);
    };

    service.create = function (board) {
      return $http.post(getUrl(), board).then(extract);
    };
  });
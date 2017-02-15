'use strict';

angular.module('noterious.common')
  .service('BoardsModel', function ($http, UserModel, ENDPOINT_URI) {
    var service = this,
        hardcodedUserId = "firstUserID";

    function extract (response) {
      return response.value;
    }

    function getUrl () {
      return ENDPOINT_URI + '/users/' + hardcodedUserId + '/boards.json';
    }

    service.all = function () {
      return $http.get(getUrl()).then(extract);
    }
  });
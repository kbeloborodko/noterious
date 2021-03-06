'use strict';

angular.module('noterious')
  .controller('MainCtrl', function (UserModel, Auth, $state, $scope) {
    var main = this;
    main.auth = Auth;
    main.currentUser = null;
    main.currentColor = 'blue';

    main.colors = [
      'blue',
      'green',
      'orange',
      'red',
      'yellow'
    ];

    main.setCurrentColor = function(color) {
      main.currentColor = color;
    };

    main.logout = function () {
      UserModel.logout();
      $state.go('login');
    };

    main.auth.$onAuthStateChanged(function (authData) {
      if (authData) {
        UserModel.setCurrentUser(authData.uid);
        main.currentUser = authData.uid;

        $scope.$emit('userIdSet');
      } else {
        main.currentUser = null;
      }
    });
  });

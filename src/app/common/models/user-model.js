'use strict';

angular.module('noterious.common')
  .service('UserModel', function (Auth, $q) {
    var service = this,
        currentUser = null;

    service.getCurrentUser = function () {
      return currentUser;
    };

    service.setCurrentUser = function (user) {
      currentUser = user;
    };

    service.login = function (user) {
      return Auth.$signInWithEmailAndPassword(user.email, user.password)
        .then(
          function (authData) {
            currentUser = authData.uid;
            console.log('Logged in as:', authData.uid);
          },
          function (error) {
            if (error) {
              currentUser = null;
              console.error('Authentication failed:', error);
              return $q.reject(error);
            }
          }
        );
    };

    service.register = function (user) {
      return Auth.$createUserWithEmailAndPassword(user.email, user.password)
        .then(
          function (authData) {
            console.log('User ' + authData.uid + ' created successfully!');
          },
          function (error) {
            if (error) {
              console.error('Error: ', error);
              return $q.reject(error);
            }
          }
        );
    };

    service.logout = function () {
      console.log('LOGOUT FIRED!');
      Auth.$signOut();
      currentUser = null;
    };
  });

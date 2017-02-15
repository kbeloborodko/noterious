'use strict';

angular.module('noterious')
  .controller('LoginCtrl', function (UserModel, $state) {
    var login = this;

    login.loading = false;

    login.isSuccessfullyRegistered = false;

    login.user = {
      email: '',
      password: '',
      register: false
    };

    function register() {
      UserModel.register({
          email: login.user.email,
          password: login.user.password
      })
      .then(onRegisterSuccess)
      .catch(onError)
      .finally(onCompletion);
    }

    function onLogin() {
      UserModel.login({
          email: login.user.email,
          password: login.user.password
      })
      .then(onLoginSuccess)
      .catch(onError)
      .finally(onCompletion);
    }

    function onLoginSuccess() {
      $state.go('boards');
    }

    function onRegisterSuccess() {
      login.isSuccessfullyRegistered = true;
    }

    function onError(reason) {
      login.error = reason.message;
    }

    function onCompletion() {
      login.reset();
    }

    login.submit = function (user, isValid) {
      if (isValid) {
        login.loading = true;

        onLogin();
      }
    };

    login.register = function (user, isValid) {
      if (isValid) {
        login.loading = true;

        register();
      }
    };

    login.reset = function () {
      login.loading = false;
      login.user = {
        email: '',
        password: '',
        register: false
      };
    };
  });

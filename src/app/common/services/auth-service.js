'use strict';

angular.module('noterious.common')
  .factory('Auth', function ($firebaseAuth) {
    var config = {
      apiKey: "AIzaSyAklf3kmeahX_kaPRiSKNmXzgeml4u96PM",
      authDomain: "noterious-8cb11.firebaseapp.com",
      databaseURL: "https://noterious-8cb11.firebaseio.com",
      storageBucket: "noterious-8cb11.appspot.com",
      messagingSenderId: "487892380803"
    };

    firebase.initializeApp(config);

    return $firebaseAuth(firebase.auth());
  })
;
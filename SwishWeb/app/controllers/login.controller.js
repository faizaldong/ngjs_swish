// angular.module('SwishApp').controller('LoginController', LoginController);
 
//     LoginController.$inject = ['$location', 'AuthenticationService', 'FlashService'];
//     function LoginController($location, AuthenticationService, FlashService) {
//         var vm = this;
 
//         vm.login = login;
 
//         // (function initController() {
//         //     // reset login status
//         //     AuthenticationService.ClearCredentials();
//         // })();
 
//         function login() {
//             console.log("hey");
//             // AuthenticationService.Login(vm.username, vm.password, function (response) {
//             //     if (response.access_token != null) {
//             //         AuthenticationService.SetCredentials(response.access_token);
//             //         $location.path('/');
//             //     } else {
//             //         FlashService.Error(response.message);
//             //         vm.dataLoading = false;
//             //     }
//             // });
//             // $http.post('http://c85e7976.ngrok.io/api/oauth/token', { username: username, password: password, scope: "user", grant_type: "password" })
//             //    .success(function (response) {
//             //        console.log(response);
//             //    });
//         };
//     }


(function(angular) {
  'use strict';
var myApp = angular.module('spicyApp2', []);

myApp.controller('SpicyController', ['$scope', function($scope) {

    $scope.submit = function(username, password) {
        $scope.username = username;
        $scope.password = password;
    };
}]);
})(window.angular);

/*
Copyright 2017 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/
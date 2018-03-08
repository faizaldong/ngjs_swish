angular.module('SwishApp').controller('PaymentmethodController', function ($scope, $cookies, $stateParams, $location){


  ////////////////////////////////////////// ORDER DETAIL //////////////////////////////////////////
  $scope.order = function(){

    $scope.cardnumber = this.cardnumber;
    $scope.cardname = this.cardname;
    $scope.cardmonth = this.cardmonth;
    $scope.cardyear = this.cardyear;
    $scope.cardsecurity = this.cardsecurity;

    // console.log($scope.cardnumber+"|"+$scope.cardname+"|"+$scope.cardmonth+"|"+$scope.cardyear+"|"+$scope.cardsecurity);

    var cardsecurity = { Property1: $scope.cardsecurity };
    console.log(cardsecurity.Property1);
  }

    
});
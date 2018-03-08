var app = angular.module('SwishApp',['ngParallax']);

app.controller('AttractionDetailsController', function ($scope, $http, $stateParams, $location, $rootScope, $cookies){

    $scope.host = $location.host();
    $scope.path = $location.path();
    $scope.token = $cookies.get('token');

    var prodId = $scope.path.substr($scope.path.lastIndexOf('/') + 1);
    // console.log(prodId)
    // var prodId = $cookies.get('prodId')
    
    // get attraction details
    $http.get(window.__env.apiUrl+'api/products/'+prodId)
        .then(function (res) {
        $scope.attractionDetails = res.data;
        // console.log($scope.attractionDetails);

        $scope.prodTabActive = res.data.details.product_attributes[0];
          if($scope.prodTabActive != undefined){
            $scope.prodTabActiveId = $scope.prodTabActive.ProductInfoId;
            $scope.noproduct = false;
          }else{
            $scope.noproduct = true;
          }
    });


    if($cookies.get('token')){
        // check cart if exist
        /*
        $http.get(window.__env.apiUrl+'api/sw_orders/', 
        {
            headers: { 'Authorization': 'Bearer ' + $cookies.get('token') }
        }).success(function(data){

            angular.forEach(data.result, function(val){
                $scope.orderId = val.order.id;

                var totalTicket = 0;
                angular.forEach(data.result, function(val){
                  angular.forEach(val.tickets, function(tickets){
                    angular.forEach(tickets.ticket_type_details, function(totticket){
                      totalTicket = totalTicket + (totticket.original_price * totticket.total_ticket);
                    })
                  })
                })
                $scope.subTotal = totalTicket;
            })
        });
        */
    }


  ////////////////////////////////////////// PLUS TICKET //////////////////////////////////////////
  $scope.plus = function(plusprice){
    if (isNaN(plusprice)) {plusprice = 0}
    var plusprice = parseInt(plusprice);
    if($cookies.get('subTotal') == undefined){
      $scope.setO = 0;
      $scope.addprice = plusprice;
      $scope.afteraddprice = $scope.setO + $scope.addprice;
      $cookies.put('subTotal', $scope.afteraddprice);
      $scope.subTotal = parseInt($cookies.get('subTotal'));
    }else{
      $scope.gettotnow = parseInt($cookies.get('subTotal'));
      $scope.addprice = plusprice;
      $scope.afteraddprice = $scope.gettotnow + $scope.addprice;
      $cookies.put('subTotal', $scope.afteraddprice);
      $scope.subTotal = parseInt($cookies.get('subTotal'));
    }
  }


  ////////////////////////////////////////// MINUS TICKET //////////////////////////////////////////
  $scope.minus = function(minusprice){
      if (isNaN(minusprice)) {minusprice = 0}
      var minusprice = parseInt(minusprice);
      $scope.gettotnow = parseInt($cookies.get('subTotal'));
      $scope.minusprice = minusprice;
      $scope.afterminusprice = $scope.gettotnow - $scope.minusprice;
      $cookies.put('subTotal', $scope.afterminusprice);
      $scope.subTotal = parseInt($cookies.get('subTotal'));
  }

  $cookies.remove('subTotal');
    

  // get attraction recommended list
  $http.get(window.__env.apiUrl+'api/products')
      .then(function (attraction) {

      $scope.attractionRecommenList = attraction.data;
  });

  if($cookies.get('guestCarts')){
      var guestCarts = $.parseJSON($cookies.get('guestCarts'));
      $scope.guesttotTickets = guestCarts.result[0].tickets.length;
      // console.log($scope.guesttotTickets);
      if($scope.guesttotTickets == 0){
          $cookies.remove('guestCarts');
      }
  }

  if($cookies.get('userCarts')){
      var userCarts = $.parseJSON($cookies.get('userCarts'));
      $scope.usertotTickets = userCarts.result[0].tickets.length;
      // console.log($scope.usertotTickets);
      if($scope.usertotTickets == 0){
          $cookies.remove('userCarts');
      }
  }

});
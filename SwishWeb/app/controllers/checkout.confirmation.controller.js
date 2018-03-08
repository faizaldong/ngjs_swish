// angular.module('SwishApp').controller('ConfirmationController', function ($scope, $cookies, $http){

var app = angular.module('SwishApp', []);

// remove duplicate in ng-repeat
app.filter('unique', function() {
   return function(collection, keyname) {
      var output = [], 
          keys = [];

      angular.forEach(collection, function(item) {
          var key = item[keyname];
          if(keys.indexOf(key) === -1) {
              keys.push(key);
              output.push(item);
          }
      });

      return output;
   };
});

app.controller('ConfirmationController', function ($scope, $cookies, $http, $location){

    $scope.token = $cookies.get('token');

    $scope.orderList = [
        {   
            image			: "assets/common/img/attractions/thumb/gardens-by-the-bay.jpg", 
            title			: "Gardens by the Bay - Flower Dome & Cloud Forest", 
            id				: "gardens-by-the-bay",
            label			: "Popular",
            labelColor		: "green",
            ticketType		: "Flower & Cloud Forest", 
            adultPrice		: "28", 
	        adultSwishPrice	: "20", 
	        adultAmount		: "1",
	        adultTotalPrice	: "20",
	        childPrice		: "15", 
	        childSwishPrice	: "12",
	        childAmount		: "0",
	        childTotalPrice	: "0"
        },
        {   
            image			: "assets/common/img/attractions/thumb/singapore-zoo-tram.jpg", 
            title			: "Singapore Zoo + Tram", 
            id				: "singapore-zoo-tram",
            label			: "",
            labelColor		: "",
            ticketType		: "One-Day Adventure Pass", 
            adultPrice		: "38", 
	        adultSwishPrice	: "28", 
	        adultAmount		: "1",
	        adultTotalPrice	: "28",
	        childPrice		: "26", 
	        childSwishPrice	: "18",
	        childAmount		: "0",
	        childTotalPrice	: "0"
        }
    ];

    var host = $location.host();
    $scope.parseInt=parseInt;

    // get param at url browser
    function getParameterByName(name, url) {
        if (!url) {
          url = window.location.href;
        }
        name = name.replace(/[\[\]]/g, "\\$&");
        var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
            results = regex.exec(url);
        if (!results) return null;
        if (!results[2]) return '';
        return decodeURIComponent(results[2].replace(/\+/g, " "));
    }

    var statusOrder = getParameterByName("status");
    if(statusOrder == 'true'){
      if(localStorage.getItem('guestCarts')){
        localStorage.removeItem('guestCarts')
      }
      if(localStorage.getItem('userCarts')){
        localStorage.removeItem('userCarts')
      }
    }

    if($cookies.get('token')){

        $scope.hideinsertpassword = false;
        var order_id = getParameterByName("order_id");
        var token = $cookies.get('token');
        $http.get(window.__env.apiUrl+'api/sw_orders/'+order_id,
        {
          headers: {
            'Authorization': 'Bearer ' + token
          }
        }). success(function(data){
            if(data.status == true){
                $scope.orderHistories = data;
                // console.log($scope.orderHistories);

                $scope.download_url = [];
                angular.forEach(data.ticket_details, function(val){
                  angular.forEach(val.tickets, function(val1){
                    $scope.download_url.push(val1.download_url);
                  })
                })

                $scope.subTotal = data.order.payment_total;
            }
        })
    }

    if($cookies.get('token')  == undefined || $cookies.get('token')  == ''){

      $scope.hideinsertpassword = true;
      var order_id = getParameterByName("order_id");
      $http.get(window.__env.apiUrl+'api/sw_orders/'+order_id)
        .success(function(data){
          if(data.status == true){
              $scope.orderHistories = data;
              // console.log(data)
              
              $scope.download_url = [];
                angular.forEach(data.ticket_details, function(val){
                  angular.forEach(val.tickets, function(val1){
                    $scope.download_url.push(val1.download_url);
                  })
                })

                $scope.subTotal = data.order.payment_total;
            
          }
        })
    }


  ////////////////////////////////////////// History //////////////////////////////////////////
  $scope.hisitory = function(){
    //var home = 'http://' + host + '#/';;
    $location.url('/account/purchase-history');
	//window.location = home;
    location.reload();
  }
  ////////////////////////////////////////  Home //////////////////////////////////////////
  $scope.home = function(){
    //var home = 'http://' + host + '#/';;
    $location.url('/');
	//window.location = home;
    location.reload();
  }
    
});
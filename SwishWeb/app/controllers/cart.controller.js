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

app.controller('CartController', function ($scope, $cookies, $http, $location, $rootScope, $compile){
    $scope.cartList = [
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



    $scope.host = $location.host();
    $scope.token = $cookies.get('token');
    $scope.subTotal = 0;
    //////////////// GET ORDER HISTORIES ///////////////
    $scope.total = 0;
    $scope.parseInt=parseInt;

    if($cookies.get('token')){
      /*
      if($cookies.get('loggerorderID')){
        var orderid = $cookies.get('loggerorderID');

        $http.get(window.__env.apiUrl+'api/sw_orders/'+orderid,
        {
          headers: {
            'Authorization': 'Bearer ' + $cookies.get('token')
          }
        }).success(function (data, headers) {

            $scope.order_history = data;
            // console.log($scope.order_history);

            angular.forEach(data.result, function(val){
              $scope.orderid = val.order.id
            })

            var totalTicket = 0;
            angular.forEach(data.result, function(val){
              angular.forEach(val.tickets, function(tickets){
                angular.forEach(tickets.ticket_type_details, function(totticket){
                  totalTicket = totalTicket + (totticket.original_price * totticket.total_ticket);
                })
              })
            })
            $scope.subTotal = totalTicket
            $cookies.put('subTotal', totalTicket)

          });
      }
      */

      if(localStorage.getItem('userCarts')){
        var data = $.parseJSON(localStorage.getItem('userCarts'));
        $scope.order_history = data;
        // console.log($scope.order_history);

        angular.forEach(data.result, function(val){
            $scope.orderid = val.order.id
          })

          var totalTicket = 0;
          angular.forEach(data.result, function(val){
            angular.forEach(val.tickets, function(tickets){
              angular.forEach(tickets.ticket_type_details, function(totticket){
                totalTicket = totalTicket + (totticket.price_ticket * totticket.total_ticket);
              })
            })
          })
          $scope.subTotal = totalTicket
          $cookies.put('subTotal', totalTicket)
      }

    }

    //////////////// GET GUEST ORDER HISTORIES ///////////////
    if($scope.token == undefined || $scope.token == ''){
      
      // if($cookies.get('guestCarts') != undefined){
      if(localStorage.getItem('guestCarts')){
        // var data = $.parseJSON(Cookies.get('guestCarts'))
        var data = $.parseJSON(localStorage.getItem('guestCarts'));
        $scope.order_history = data;
        // console.log($scope.order_history);

        angular.forEach(data.result, function(val){
            $scope.orderid = val.order.id
          })

          var totalTicket = 0;
          angular.forEach(data.result, function(val){
            angular.forEach(val.tickets, function(tickets){
              angular.forEach(tickets.ticket_type_details, function(totticket){
                totalTicket = totalTicket + (totticket.price_ticket * totticket.total_ticket);
              })
            })
          })
          $scope.subTotal = totalTicket
          $cookies.put('subTotal', totalTicket)
      }
    }
    

  ////////////////////////////////////////// PLUS TICKET //////////////////////////////////////////
  $scope.plus = function(plusprice, cart, totTicket, type){

    //add totalTicket in JSON
    angular.forEach(cart.ticket_type_details, function(v){
      if(v.pricing_type_id == type){
        v.total_ticket = totTicket;
      }
    })

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
  $scope.minus = function(minusprice, cart, totTicket, type){
   
   //minus totalTicket in JSON
   angular.forEach(cart.ticket_type_details, function(v){
      if(v.pricing_type_id == type){
        v.total_ticket = totTicket;
      }
    })

      var minusprice = parseInt(minusprice);
      $scope.gettotnow = parseInt($cookies.get('subTotal'));
      $scope.minusprice = minusprice;
      $scope.afterminusprice = $scope.gettotnow - $scope.minusprice;
      $cookies.put('subTotal', $scope.afterminusprice);
      $scope.subTotal = parseInt($cookies.get('subTotal'));
  }


  ////////////////////////////////////////// ATTRACTION DETAIL //////////////////////////////////////////
  $scope.attraction_details = function(prodId, prodCategory){
      $cookies.put('prodId', prodId);
      $cookies.put('prodCategory', prodCategory);
      $scope.prodDetails = '/attractions/'+prodCategory+'/'+prodId;
      $location.path($scope.prodDetails)
  }


    $scope.UndoArray = [];
    var indexcart = 0;


  ////////////////////////////////////////// REMOVE ITEM //////////////////////////////////////////
  $scope.remove = function(Cart, indexOf){

    $scope.ticketTotalAmount = 0;
    angular.forEach(Cart.ticket_type_details, function(v){
      $scope.ticketTotalAmount = $scope.ticketTotalAmount + (v.total_ticket * v.price_ticket);
    })

    // console.log($scope.ticketTotalAmount)

    $scope.UndoArray.push(Cart);
    $scope.order_history.result[0].tickets.splice(indexOf, 1);

    // console.log($scope.order_history);

    localStorage.setItem('userCarts', JSON.stringify($scope.order_history));
    localStorage.setItem('guestCarts', JSON.stringify($scope.order_history));
    // document.cookie = "userCarts=" + JSON.stringify($scope.order_history);
    // document.cookie = "guestCarts=" + JSON.stringify($scope.order_history);
    // $cookies.put('userCarts', JSON.stringify($scope.order_history))
    // $cookies.put('guestCarts', JSON.stringify($scope.order_history))


    Cart.Amount = $scope.ticketTotalAmount;
    Cart.IndexCart = indexcart;
    
    //$scope.UndoArray.push(Cart);

    $scope.gettotnow = parseInt($cookies.get('subTotal'));
    $scope.minusAmount = $scope.ticketTotalAmount;
    $scope.afterdeductprice = $scope.gettotnow - $scope.minusAmount;
    $cookies.put('subTotal', $scope.afterdeductprice);
    $scope.subTotal = parseInt($cookies.get('subTotal'));

    indexcart++;
  }

  
  ////////////////////////////////////////// UNDO ITEM //////////////////////////////////////////
  $scope.undo = function(item, amount){

    $scope.gettotnow = parseInt($cookies.get('subTotal'));
    $scope.addAmount = amount;
    $scope.afteraddprice = $scope.gettotnow + $scope.addAmount;
    $cookies.put('subTotal', $scope.afteraddprice);
    $scope.subTotal = parseInt($cookies.get('subTotal'));

    var index = $scope.UndoArray.indexOf(item);

    $scope.order_history.result[0].tickets.push(item);

    $scope.UndoArray.splice(index, 1);

    // console.log($scope.order_history);

    localStorage.setItem('userCarts', JSON.stringify($scope.order_history));
    localStorage.setItem('guestCarts', JSON.stringify($scope.order_history));
    // document.cookie = "userCarts=" + JSON.stringify($scope.order_history);
    // document.cookie = "guestCarts=" + JSON.stringify($scope.order_history);
    // $cookies.put('userCarts', JSON.stringify($scope.order_history))
    // $cookies.put('guestCarts', JSON.stringify($scope.order_history))

  }


  ////////////////////////////////////////// GO TO BUY TICKET PAGE //////////////////////////////////////////
  $scope.addAttractions = function(){
    var buyTicket = $location.path('/buy-tickets');
    location.reload();
  }

    
});
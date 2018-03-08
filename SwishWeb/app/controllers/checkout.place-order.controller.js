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

app.controller('PlaceOrderController', function ($scope, $cookies, $stateParams, $http, $location){

    // $scope.orderList = [
    //     {   
    //         image           : "assets/common/img/attractions/thumb/gardens-by-the-bay.jpg", 
    //         title           : "Gardens by the Bay - Flower Dome & Cloud Forest", 
    //         id              : "gardens-by-the-bay",
    //         label           : "Popular",
    //         labelColor      : "green",
    //         ticketType      : "Flower & Cloud Forest", 
    //         adultPrice      : "28", 
    //         adultSwishPrice : "20", 
    //         adultAmount     : "1",
    //         adultTotalPrice : "20",
    //         childPrice      : "15", 
    //         childSwishPrice : "12",
    //         childAmount     : "0",
    //         childTotalPrice : "0"
    //     },
    //     {   
    //         image           : "assets/common/img/attractions/thumb/singapore-zoo-tram.jpg", 
    //         title           : "Singapore Zoo + Tram", 
    //         id              : "singapore-zoo-tram",
    //         label           : "",
    //         labelColor      : "",
    //         ticketType      : "One-Day Adventure Pass", 
    //         adultPrice      : "38", 
    //         adultSwishPrice : "28", 
    //         adultAmount     : "1",
    //         adultTotalPrice : "28",
    //         childPrice      : "26", 
    //         childSwishPrice : "18",
    //         childAmount     : "0",
    //         childTotalPrice : "0"
    //     }
    // ];

    $scope.token = $cookies.get('token');
    $scope.protocol = $location.protocol();
    $scope.host = $location.host();
    $scope.guestuserID = Cookies.get('guestuserID');

    if($scope.token){

        $http.get(window.__env.apiUrl+'api/users/me',{
          headers: {
            'Authorization': 'Bearer ' + $scope.token
          }
        }).success(function(data){
            $scope.userID = data.id;
            $scope.address = data;
            
        })
    }


    ///////// have credit card form //////////
    // $scope.paymentMethod = function(){
    //     $scope.cardsecurity = this.cardsecurity;
    //     $cookies.put('cardsecurity', $scope.cardsecurity);
    // }
    // $scope.cardsecurity = $cookies.get('cardsecurity');
    // // show paypal
    // if($scope.cardsecurity == undefined){
    //     $scope.payvisa = false;
    //     $scope.paypaypal = true;
    // }else{
    // // show 4 digit numbers
    //     $scope.payvisa = true;
    //     $scope.paypaypal = false;
    // }
    

  ////////////////////////////////////////// NO CREDIT CARD FORM //////////////////////////////////////////
  $scope.payments = function (){
      $scope.payment = this.payment;
  }


  ////////////////////////////////////////// PAYMENT TYPE //////////////////////////////////////////
  if($location.search().status){
		var cstatus = $location.search().status;
		if (cstatus=="false"){
			swal({
				title: "Payment fail!",
				text:  "Your Payment fail / cancel..!",
				type:  "warning",
			});	
		}
	  }
	  
  $scope.paymentType = function(){
      $scope.paymentMethod = $scope.payment;
      $cookies.put('paymenttype', $scope.paymentMethod);
      $location.path( '/checkout/place-order/' );
	  
	  
  }

    $scope.paymenttype = $cookies.get('paymenttype');
    // show paypal
    if($scope.paymenttype == 'option1'){
        $scope.payvisa = false;
        $scope.paypaypal = true;
        $scope.paymenttype = 'paypal';
    }else{
    // show 4 digit numbers
        $scope.payvisa = true;
        $scope.paypaypal = false;
        $scope.paymenttype = 'credit_card';
    }

    // button review your order
    // $scope.order = function(){
    //   // pay via paypal
    //   if($scope.payment == 'option1'){
    //       $location.path( '/checkout/place-order/' );
    //   }else{
    //     // pay via credit card
    //     $scope.cardnumber = this.cardnumber;
    //     $scope.cardname = this.cardname;
    //     $scope.cardmonth = this.cardmonth;
    //     $scope.cardyear = this.cardyear;
    //     $scope.cardsecurity = this.cardsecurity;
    //     $scope.cardaddress = this.address;
    //     console.log($scope.cardaddress);
    //     if ($scope.cardnumber == undefined){
    //         $scope.cardnumberrequired = true;
    //     }else{
    //         $scope.cardnumberrequired = false;
    //         if($scope.cardname == undefined){
    //             $scope.namecardrequired = true;
    //         }else{
    //             $scope.namecardrequired = false;
    //             if($scope.cardmonth == undefined){
    //                 $scope.ccmonthrequired = true;
    //             }else{
    //                 $scope.ccmonthrequired = false;
    //                 if($scope.cardyear ==undefined){
    //                     $scope.ccyearrequired = true;
    //                 }else{
    //                     $scope.ccyearrequired = false;
    //                     if($scope.cardsecurity == undefined){
    //                         $scope.securityrequired = true;
    //                     }else{
    //                         $scope.securityrequired = false;
    //                         $location.path( '/checkout/place-order/' );
    //                         $scope.payvisa = true;
    //                     }
    //                 }
    //             }
    //         }
    //     }
    //   }
    //     $cookies.put('cardnumber', $scope.cardnumber);
    //     $cookies.put('cardname', $scope.cardname);
    //     $cookies.put('cardmonth', $scope.cardmonth);
    //     $cookies.put('cardyear', $scope.cardyear);
    //     $cookies.put('cardsecurity', $scope.cardsecurity);
    // }
    

    $http.get(window.__env.apiUrl+'api/products')
      .success(function(products  ){
        $scope.products = products;
      });
      
    $scope.host = $location.host();
    $scope.token = $cookies.get('token');
    $scope.parseInt = parseInt;

    //////////////// GET LOGED ORDER HISTORIES ///////////////
    $scope.total = 0;
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

            angular.forEach(data.result, function(order_history){
                $scope.history = order_history;
                $scope.orderid = $scope.history.order.id;
            })

            var totalTicket = 0;
            angular.forEach(data.result, function(val){
                  angular.forEach(val.tickets, function(tickets){
                    angular.forEach(tickets.ticket_type_details, function(totticket){
                      totalTicket = totalTicket + (totticket.original_price * totticket.total_ticket);
                    })
                  })
            })
            
            $scope.subTotal = totalTicket;
            $cookies.put('subTotal', totalTicket);
        });
      }
      */
      // if($cookies.get('userCarts')){
      if(localStorage.getItem('userCarts')){
        // var data = $.parseJSON(Cookies.get('userCarts'))
        var data = $.parseJSON(localStorage.getItem('userCarts'))
        $scope.order_history = data;
        // console.log(data);

        angular.forEach(data.result, function(order_history){
            $scope.history = order_history;
          })

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

          var totalAmount = (totalTicket / (100+7)) * 7;
          $scope.totalAmount = totalAmount;

          $scope.subTotal = totalTicket
          $cookies.put('subTotal', totalTicket)
      }
    }

    //////////////// GET GUEST ORDER HISTORIES ///////////////
    if($cookies.get('token') == undefined || $cookies.get('token') == ''){
      // if($cookies.get('guestCarts')){
      if(localStorage.getItem('guestCarts')){
        // var guestCarts = $.parseJSON($cookies.get('guestCarts'));
        var guestCarts = $.parseJSON(localStorage.getItem('guestCarts'));
        $scope.order_history = guestCarts;
        if(guestCarts != undefined){

            angular.forEach(guestCarts.result, function(order_history){
                $scope.history = order_history;
            })


            var totalTicket = 0;
            angular.forEach(guestCarts.result, function(val){
                  angular.forEach(val.tickets, function(tickets){
                    angular.forEach(tickets.ticket_type_details, function(totticket){
                      totalTicket = totalTicket + (totticket.price_ticket * totticket.total_ticket);
                    })
                  })
            })

            var totalAmount = (totalTicket / (100+7)) * 7;
            $scope.totalAmount = totalAmount;
            
            $scope.subTotal = totalTicket;
            $cookies.put('subTotal', totalTicket);
        }
      }
    }


  ////////////////////////////////////////// PLUS TICKET //////////////////////////////////////////
  $scope.plus = function(plusprice){
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
      var minusprice = parseInt(minusprice);
      $scope.gettotnow = parseInt($cookies.get('subTotal'));
      $scope.minusprice = minusprice;
      $scope.afterminusprice = $scope.gettotnow - $scope.minusprice;
      $cookies.put('subTotal', $scope.afterminusprice);
      $scope.subTotal = parseInt($cookies.get('subTotal'));
  }


  ////////////////////////////////////////// REMOVE ITEM //////////////////////////////////////////
  $scope.removeArr = [];
  var index = 0;
  $scope.remove = function(subTotal, cart, indexOf){
      $scope.history.tickets.splice(indexOf,1)
      // $cookies.put('guestCarts', JSON.stringify($scope.order_history))

      localStorage.setItem("userCarts", JSON.stringify($scope.order_history));
      localStorage.setItem("guestCarts", JSON.stringify($scope.order_history));
      // document.cookie = "userCarts="+ JSON.stringify($scope.order_history);
      // document.cookie = "guestCarts="+ JSON.stringify($scope.order_history);

      cart.IndexCart = index;
      cart.Amount = subTotal;
      $scope.removeArr.push(cart);


      $scope.gettotnow = parseInt($cookies.get('subTotal'));
      $scope.minusprice = subTotal;
      $scope.afterminusprice = $scope.gettotnow - $scope.minusprice;
      $cookies.put('subTotal', $scope.afterminusprice);
      $scope.subTotal = parseInt($cookies.get('subTotal'));
      // console.log($scope.subTotal);

  index++;

  }


  ////////////////////////////////////////// UNDO ITEM //////////////////////////////////////////
  $scope.undoRemove = function(item, Amount){
      var index = $scope.removeArr.indexOf(item);

      $scope.history.tickets.push(item)
      // $cookies.put('guestCarts', JSON.stringify($scope.order_history))

      localStorage.setItem("userCarts", JSON.stringify($scope.order_history));
      localStorage.setItem("guestCarts", JSON.stringify($scope.order_history));
      // document.cookie = "userCarts="+ JSON.stringify($scope.order_history);
      // document.cookie = "guestCarts="+ JSON.stringify($scope.order_history);

      $scope.removeArr.splice(index, 1)

      $scope.gettotnow = parseInt($cookies.get('subTotal'));
      $scope.addprice = Amount;
      $scope.afteraddprice = $scope.gettotnow + parseInt($scope.addprice);
      $cookies.put('subTotal', $scope.afteraddprice);
      $scope.subTotal = parseInt($cookies.get('subTotal'));
      // console.log($scope.subTotal);
  }


    $cookies.remove('cardnumber');
    $cookies.remove('cardname');
    $cookies.remove('cardmonth');
    $cookies.remove('cardyear');
    $cookies.remove('cardsecurity');

    
});
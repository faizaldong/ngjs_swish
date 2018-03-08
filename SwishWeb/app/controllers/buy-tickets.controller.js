angular.module('SwishApp',['ui-notification']);

angular.module('SwishApp').controller('BuyTixController', function ($scope,$http,Notification, $cookies, $location){

    $scope.parseInt=parseInt;

    $scope.token = $cookies.get('token');
    $scope.host = $location.host();

    $http.get('attractions.json')
        .then(function(res){
        $scope.rideList = res.data;
    });

  
  ////////////////////////////////////////// ATTRACTION DETAIL //////////////////////////////////////////
  $scope.attraction_details = function(prodId, prodCategory){
      $cookies.put('prodId', prodId);
      $cookies.put('prodCategory', prodCategory);
      $scope.prodDetails = '/attractions/'+prodCategory+'/'+prodId;
      $location.path($scope.prodDetails)
  }

    $http.get(window.__env.apiUrl+'api/products')
        .then(function(res){
        $scope.prodList = res.data;
        // console.log(res.data);
    });

    if($cookies.get('token') != undefined){
        $http.get(window.__env.apiUrl+'api/sw_orders/', 
        {   headers: {
                'Authorization': 'Bearer ' + $cookies.get('token')
            }
        }).success(function(data){
              angular.forEach(data.result, function(getid){
                if(getid.order.is_paid == false && getid.order.sw_order_status_id == 4){
                    $scope.prodId = getid.order.id;
                }
              })
           });
    }

    $scope.image = {
            images: "assets/common/img/attractions/thumb/segway-fun-ride.jpg"
        };

  
  ////////////////////////////////////////// ADD TICKET //////////////////////////////////////////  
  $scope.added = function(productCategory, productName, totTicket, price, priceType) {
      if(isNaN(price)){price = 0}
      // var totTicket = totTicket+1;
      $scope.ready_to_cart = true;
      /*
      Notification({
          // message: '<div class="row"><div class="col-sm-8">'+productName+' <b>is added to your cart</b> <span class="hidden-xs">'+productCategory+'</span></div><div class="col-sm-4"><b>'+priceType+' x 1</b> <span class="hidden-xs">SGD'+parseInt(price)+'</span></div></div>'
          message: '<div class="row"><div class="col-sm-8"><b>You chose</b> '+productName+' <span class="hidden-xs">'+productCategory+'</span></div><div class="col-sm-4"><b>'+priceType+' x 1</b> <span class="hidden-xs">SGD'+parseInt(price)+'</span></div></div>'
      });*/

      if($cookies.get('totalticket') == undefined){
          $scope.totalticket = 1;
          $cookies.put('totalticket', $scope.totalticket)
      }else{
          $scope.currentticket = parseInt($cookies.get('totalticket'))
          $scope.totalticket = $scope.currentticket + 1;
          $cookies.put('totalticket', $scope.totalticket)
      }


      if($cookies.get('totAmount') == undefined){
          $scope.addAmount = 0;
          $scope.addAmount = $scope.addAmount + parseInt(price);
          $cookies.put('totAmount', $scope.addAmount)
          $scope.subTotal = parseInt($cookies.get('totAmount'));
      }else{
          $scope.getcurrentAmount = parseInt($cookies.get('totAmount'));
          $scope.addAmount = $scope.getcurrentAmount + parseInt(price);
          $cookies.put('totAmount', $scope.addAmount)
          $scope.subTotal = parseInt($cookies.get('totAmount'));
      }
      
  };


  ////////////////////////////////////////// REMOVE TICKET //////////////////////////////////////////
  $scope.removed = function(productCategory, productName, totTicket, price, priceType) {
      if(isNaN(price)){price = 0}
      /*
      Notification.error({
          // message: '<div class="row"><div class="col-sm-8">'+productName+' <b>is added to your cart</b> <span class="hidden-xs">'+productCategory+'</span></div><div class="col-sm-4"><b>'+priceType+' x 1</b> <span class="hidden-xs">SGD'+parseInt(price)+'</span></div></div>'
          message: '<div class="row"><div class="col-sm-8"><b>You removed</b> '+productName+' <span class="hidden-xs">'+productCategory+'</span></div><div class="col-sm-4"><b>'+priceType+' x 1</b> <span class="hidden-xs">SGD'+parseInt(price)+'</span></div></div>'
      });*/
      
      if($cookies.get('totalticket')){
          $scope.currentticket = $cookies.get('totalticket');
          $scope.totalticket = $scope.currentticket - 1;
          $cookies.put('totalticket', $scope.totalticket)
      }

      if($cookies.get('totalticket') == 0){ $scope.ready_to_cart = false; }

          $scope.getcurrentAmount = parseInt($cookies.get('totAmount'));
          $scope.minusAmount = $scope.getcurrentAmount - parseInt(price);
          $cookies.put('totAmount', $scope.minusAmount)
          $scope.subTotal = parseInt($cookies.get('totAmount'));
  };

  $cookies.remove('totalticket');
  $cookies.remove('totAmount');


});
var MainCtrl = angular.module('SwishApp')


MainCtrl.factory('focus', function($timeout, $window) {
    return function(id) {
      // timeout makes sure that is invoked after any other event has been triggered.
      // e.g. click events that need to run before the focus or
      // inputs elements that are in a disabled state but are enabled when those events
      // are triggered.
      $timeout(function() {
        var element = $window.document.getElementById(id);
        if(element)
          element.focus();
      });
    };
  })


MainCtrl.controller('CartFormController', function ($scope, $cookies, $http, $location, focus){

    var host = $location.host();


    if($cookies.get('guestCarts')){
        var guestCarts = $.parseJSON($cookies.get('guestCarts'))
        var totalAmount = guestCarts.result[0].order.total_price;

        var tickets = [];
        angular.forEach(guestCarts.result, function(data){
            angular.forEach(data.tickets, function(ticket){
                angular.forEach(ticket.ticket_type_details, function(detail){
                    tickets.push(detail)
                })
            })
        })
    }

    var addtoCart = { 
                total_price: totalAmount,
                total_price_converted_currency: '',
                discount_amount: '',
                exchange_rate: '',
                email_to: '',
                email_bcc: '',
                invoice_number: '',
                invoice_url: '',
                total_tax_amount: '',
                sw_payment_mode_id: '3',
                sw_currency_id: '8',
                sw_order_status_id: '4',
                tickets: tickets
            };


  ////////////////////////////////////////// LOGIN //////////////////////////////////////////
  $scope.proceed = function(){
      $scope.email = this.email;
      $scope.password = this.password;

      if($scope.email == undefined || $scope.email == ''){
          $scope.emailActive = 'invalid-input';
          focus('email')
          $scope.emailrequired = true;

          $scope.emailexist = false;
          $scope.passwordActive = false;
          $scope.passrequired = false;
          $scope.passinvalid = false;
          $scope.forgotPassword = false;
      }else{
          $scope.emailActive = false;
          $scope.emailrequired = false;

          if($scope.password == undefined || $scope.password == ''){
              $scope.passwordActive = 'invalid-input';
              focus('password')
              $scope.passrequired = true;

              $scope.emailexist = false;
              $scope.passinvalid = false;
              $scope.forgotPassword = false;
          }else{
              $scope.passwordActive = false;
              $scope.passrequired = false;
              
              $http.get(window.__env.apiUrl+'api/check/available?email='+$scope.email+'&contact_no=')
                  .success(function(email_valid){
                  if(email_valid.status == false){
                      focus('email')
                      $scope.emailActive = 'invalid-input';
                      $scope.emailexist = true;

                      $scope.passinvalid = false;
                      $scope.passinvalid = false;
                      $scope.forgotPassword = false;
                  }else{
                      $scope.emailActive = false;
                      $scope.emailexist = false;

                      $http.get(window.__env.apiUrl+'api/check/verification?email='+$scope.email)
                          .success(function(is_verify){

                              if(is_verify.status == true){

                                  var data = $.param({
                                    username: $scope.email,
                                    password: $scope.password,
                                    scope: "user",
                                    grant_type: "password",
                                  });

                                  var config = {
                                      headers : {
                                        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
                                      }
                                  }
                                  $http.post(window.__env.apiUrl+'api/oauth/token', data, config)
                                      .success(function(data, status, headers, config){

                                          // focus('password')
                                          $scope.passinvalid = false;
                                          $scope.forgotPassword = false;
                                          $cookies.put('token', data.access_token);

                                          /*
                                          $http.get(window.__env.apiUrl+'api/sw_orders',
                                          {
                                              headers: {
                                                'Authorization': 'Bearer ' + $cookies.get('token')
                                              }
                                          }).success(function (data, headers) {
                                              console.log(data);
                                              if(data.result.length == 0){  //do post here
                                                  // $.ajax({
                                                  //     type: 'POST',
                                                  //     url: window.__env.apiUrl+'api/sw_orders',
                                                  //     data: addtoCart,
                                                  //     beforeSend: function (request){
                                                  //         request.setRequestHeader("Authorization", "Bearer "+$cookies.get('token'));
                                                  //     },
                                                  //     success: function(){

                                                  //         var payment = 'http://' + host + '#/checkout/payment-method';;
                                                  //         window.location = payment;
                                                  //         location.reload();
                                                  //         // console.log("create order");
                                                  //     }
                                                  // })
                                              }else{

                                                  angular.forEach(data.result, function(data){
                                                      if(data.order.is_paid != true && data.order.sw_order_status_id != 2){
                                                          
                                                          console.log(data.order.is_paid)
                                                      }
                                                  })
                                                  //do put here
                                                  // var orderId = data.result[0].order.id;
                                                  // $.ajax({
                                                  //     type: 'PUT',
                                                  //     url: window.__env.apiUrl+'api/sw_orders/'+orderId,
                                                  //     data: {tickets: tickets},
                                                  //     beforeSend: function (request){
                                                  //         request.setRequestHeader("Authorization", "Bearer "+$cookies.get('token'));
                                                  //     },
                                                  //     success: function(){
                                                  //         var payment = 'http://' + host + '#/checkout/payment-method';;
                                                  //         window.location = payment;
                                                  //         location.reload();
                                                  //         // console.log("update order");
                                                  //     }
                                                  // })
                                              }
                                          })
                                          */


                                          //if storage have carts, then add the carts into swish user carts
                                          if(localStorage.getItem('guestCarts')){
                                            if(localStorage.getItem('userCarts')){
                                              var guestCarts = $.parseJSON(localStorage.getItem('guestCarts'))
                                              var userCarts = $.parseJSON(localStorage.getItem('userCarts'))
                                              var uProduct_id = [];

                                                if(userCarts.result[0].tickets.length > 0){
                                                  // add product id for swish user cart into array
                                                  angular.forEach(userCarts.result[0].tickets, function(u){
                                                      uProduct_id.push(u.product_id)
                                                    })

                                                  // do loop cart guest
                                                  angular.forEach(guestCarts.result[0].tickets, function(g){

                                                      var idnotFound = uProduct_id.includes(g.product_id); //return value false if not found product id in uProduct_id array 
                                                      if(idnotFound == false){
                                                        userCarts.result[0].tickets.push(g)
                                                        localStorage.setItem('userCarts', JSON.stringify(userCarts))
                                                      }                            
                                                  })
                                                }

                                            }else{
                                              localStorage.setItem('userCarts', localStorage.getItem('guestCarts'));
                                            }
                                            
                                            localStorage.removeItem('guestCarts');
                                          }

                                          $location.path('checkout/payment-method')
                                          // location.reload();

                                      })
                                      .error(function(){
                                          focus('password')
                                          $scope.passwordActive = 'invalid-input'
                                          $scope.passinvalid = true;
                                          $scope.forgotPassword = true;
                                      })
                              }else{
                                  swal({
                                      title: "Your account is not verify!",
                                      text: "You can verify your account by click <a href='' id='verifyagain'>verify</a> to verify your Swish account. ",
                                      type: "warning",
                                      showConfirmButton: true,
                                      html: true
                                    });
                                    $("#verifyagain").on('click', function(){

                                      $http.post(window.__env.apiUrl+'api/resend/email/verification?email='+$scope.email)
                                        .success(function(){
                                          swal({
                                            title: "Resend email success!",
                                            text: "We've sent an email to <b>"+$scope.email+"</b> with a link to verify your account.",
                                            type: "success",
                                            showConfirmButton: true,
                                            html: true
                                          },
                                          function(){
                                              var payment = 'http://' + host + '#/checkout/signin';;
                                              window.location = payment;
                                              location.reload();
                                          });
                                        })
                                    });
                              }

                          })
                  }
              });
          }
      }
  }


  ////////////////////////////////////////// LOGIN GUEST //////////////////////////////////////////
  $scope.guestLog = function(){
      console.log("guest login");

      var guestLog = 'http://' + host + '#/checkout/signin';
      window.location = guestLog;
      location.reload();
  }



  ////////////////////////////////////////// REGISTER //////////////////////////////////////////
  $scope.register = function(){

      $scope.email = this.email;
      $scope.password = this.password;
      $scope.confirmpassword = this.confirmpassword;
      $scope.first_name = this.first_name;
      $scope.last_name = this.last_name;
      $scope.phone = this.phone;
      $scope.dob = this.dob;
      $scope.countrycode = this.countrycode;
      $scope.nationality = this.nationality;

      if ($scope.email == '' || $scope.email == undefined){
          $scope.emailrequired = true;
      }else{
          $scope.emailrequired = false;
          if ($scope.password == '' || $scope.password == undefined){
              $scope.passwordrequired = true;
          }else{
              $scope.passwordrequired = false;
              if($scope.confirmpassword == '' || $scope.confirmpassword == undefined){
                  $scope.confirmpasswordrequired = true;
              }else{
                  $scope.confirmpasswordrequired = false;
                  if($scope.password != $scope.confirmpassword){
                      $scope.passwordnotmatch = true;
                  }else{
                      $scope.passwordnotmatch = false;
                      console.log('match');
                      if ($scope.first_name == '' || $scope.first_name == undefined){
                          $scope.firstnamerequired = true;
                      }else{
                          $scope.firstnamerequired = false;
                          if($scope.phone == '' || $scope.phone == undefined){
                              $scope.phonerequired = true;
                          }else{
                              $scope.phonerequired = false;

                              $http.get(window.__env.apiUrl+'api/check/available?email='+$scope.email+'&contact_no=')
                                  .success(function(email_valid){
                                      if(email_valid.status == true){
                                          $scope.emailexist = true;
                                      }else{
                                          $scope.emailexist = false;
                                          var data = $.param({
                                            email: $scope.email,
                                            password: $scope.password,
                                            confirmpassword: $scope.confirmpassword,
                                            first_name: $scope.first_name,
                                            last_name: $scope.last_name,
                                            phone: $scope.phone,
                                            dob: $scope.dob,
                                            countrycode: $scope.countrycode,
                                            nationality: $scope.nationality
                                          });

                                          // get login token
                                          var config = {
                                              headers : {
                                                'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
                                              }
                                          }
                                          // post data to API
                                          $http.post(window.__env.apiUrl+'api/sw_users', data, config)
                                          .success(function (data, config) {
                                             $cookies.put('regemail', data.result.email);
                                             $scope.emailreg = $cookies.get('regemail');
                                             
                                              swal({
                                                title: "Registered successfully!",
                                                text: "Verification Required<br><hr> Before logging in, we need you to verify your email address first. We have sent an email to you at:<br> <b>"+$scope.emailreg+"</b> <br> This is the last step. We promise!",
                                                type: "success",
                                                showConfirmButton: true,
                                                html: true
                                              });
                                          });
                                      }
                                  });

                          }
                      }
                  }
              }
          }
      }
  }

// if guest have registered at checkout as guest form
if($cookies.get('guestDetails')){
    var guestDetails = $.parseJSON($cookies.get('guestDetails'));
    $scope.emailreg = guestDetails.email;
    $scope.existemail = guestDetails.email;
    focus("emailreg")
    $scope.linkLogin = false
}    
// console.log($cookies.get('guestDetails'))

//this will put email (registered) at field and make it focus at member sign in page
if($cookies.get('emailexist')){
    $scope.email = $cookies.get('emailexist');
    focus('email');
    toastr.info('you already have an account. Please sign in to make a payment', '')
}


  ////////////////////////////////////////// REGISTER AS GUEST //////////////////////////////////////////
  $scope.registerguest = function(){
    if($cookies.get('token')){
      var payment = 'http://' + host + '#/checkout/payment-method';;
      window.location = payment;

    }else{

      $scope.email = this.emailreg;
      $scope.first_name = this.first_name;
      $scope.last_name = this.last_name;
      $scope.phone = this.phone;
      $scope.dob = this.dob;
      $scope.countrycode = this.countrycode;
      $scope.nationality = this.nationality;

      if($scope.email == $scope.existemail && $scope.existemail != undefined){

        $http.get(window.__env.apiUrl+'api/check/available?email='+$scope.email+'&contact_no=')
          .success(function(email_valid){
            // if email exist
            if(email_valid.status == true){
              $http.get(window.__env.apiUrl+'api/check/verification?email='+$scope.email)
                .success(function(is_verify){
                  // if email verify
                  if(is_verify.status == true){
                    var signin = 'http://' + host + '#/checkout/signin';;
                    window.location = signin;
                    location.reload();
                    $cookies.put('emailexist', $scope.email);
                  }else{
                    var payment = 'http://' + host + '#/checkout/payment-method';;
                    window.location = payment;
                  }
                  
                }) 
            }

          })
        

      }else{
          if($scope.email == '' || $scope.email == undefined){
              $scope.emailActive = 'invalid-input';
              $scope.emailrequired = true;

              $scope.emailexist = false;
              $scope.firstnamerequired = false;
              $scope.phonerequired = false;
          }else{
              $scope.emailActive = false;
              $scope.emailrequired = false;

              $http.get(window.__env.apiUrl+'api/check/available?email='+$scope.email+'&contact_no=')
                  .success(function(email_valid){
                      if(email_valid.status == true){
                          // $scope.emailActive = 'invalid-input';
                          // $scope.emailexist = true;
                          // $scope.linkLogin = true

                          var data = { email: $scope.email };

                          $http.post(window.__env.apiUrl+'api/users/guest', data)
                              .success(function(res){
                                  Cookies.set('guestuserID', res.result.id)

                                  var payment = 'http://' + host + '#/checkout/payment-method';;
                                  window.location = payment;
                              })
                              .error(function(){
                                  var signin = 'http://' + host + '#/checkout/signin';;
                                  window.location = signin;
                                  location.reload();
                                  $cookies.put('emailexist', $scope.email);
                              })

                          
                          $scope.firstnamerequired = false;
                          $scope.phonerequired = false;
                      }else{
                          $scope.emailActive = false;
                          $scope.emailexist = false;

                          if($scope.first_name == '' || $scope.first_name == undefined){
                              $scope.firstnameActive = 'invalid-input';
                              $scope.firstnamerequired = true;
                              focus("reg-name")

                              $scope.phonerequired = false;
                          }else{
                              $scope.firstnameActive = false;
                              $scope.firstnamerequired = false;

                              if($scope.phone == '' || $scope.phone == undefined){
                                  $scope.phoneActive = 'invalid-input';
                                  $scope.phonerequired = true;
                                  focus("reg-tel")

                              }else{
                                  $scope.phoneActive = false;
                                  $scope.phonerequired = false;

                                  var guestDetails = {
                                      email: $scope.email,
                                      first_name: $scope.first_name,
                                      last_name: $scope.last_name,
                                      phone: $scope.phone,
                                      dob: $scope.dob,
                                      countrycode: $scope.countrycode,
                                      nationality: $scope.nationality,
                                  };

                                  $cookies.put('guestDetails', JSON.stringify(guestDetails));

                                  // var payment = 'http://' + host + '#/checkout/payment-method';;
                                  // window.location = payment;

                                  var data = $.param({
                                      email: $scope.email,
                                      first_name: $scope.first_name,
                                      last_name: $scope.last_name,
                                      phone: $scope.phone,
                                      dob: $scope.dob,
                                      countrycode: $scope.countrycode,
                                      nationality: $scope.nationality,
                                  });

                                  // get login token
                                  var config = {
                                      headers : {
                                        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
                                      }
                                  }
                                  $http.post(window.__env.apiUrl+'api/sw_users', data, config)
                                      .success(function (data, config) {
                                         Cookies.set('guestuserID', data.result.id)
                                         
                                         var payment = 'http://' + host + '#/checkout/payment-method';;
                                         window.location = payment;

                                         // $cookies.put('regemail', data.result.email);
                                         // $scope.emailreg = $cookies.get('regemail');
                                         
                                         //  swal({
                                         //    title: "Registered successfully!",
                                         //    text: "Verification Required<br><hr> Before logging in, we need you to verify your email address first. We have sent an email to you at:<br> <b>"+$scope.emailreg+"</b> <br> This is the last step. We promise!",
                                         //    type: "success",
                                         //    showConfirmButton: true,
                                         //    html: true
                                         //  },
                                         //  function(isConfirm){
                                         //      if (isConfirm) {
                                         //          var payment = 'http://' + angular.element("#host").scope().host + '#/checkout/payment-method';;
                                         //          window.location = payment;
                                         //      }
                                         //  });
                                  });
                              }
                          }
                      }
                  });
          }
      }
    }
  }


  ////////////////////////////////////////// CHECKOUT AS GUEST //////////////////////////////////////////
  $scope.checkoutguest = function(){
      window.location.href = 'http://'+host+ '/#/checkout/signin/guest';
      window.location.reload();
      $cookies.remove('emailexist')
  }


  ////////////////////////////////////////// CREATE ACCOUNT //////////////////////////////////////////
  $scope.createAccount = function(){
      window.location.href = 'http://'+host+ '/#/checkout/signin/register';
      window.location.reload();
      $cookies.remove('emailexist')
  }


});
var MainCtrl = angular.module("SwishApp",['ui.router','updateMeta','oc.lazyLoad','ngSanitize', 'ngCookies']);


// directives
/*angular.module('removeDirective', [])
.controller('CartController', ['$scope','$cookies', function($scope, $cookies) {

$scope.undo = function(amount){
	
}

}]);*/

// remove duplicate in ng-repeat
MainCtrl.filter('unique', function() {
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


/* FILE PATHS AND NAVBAR HERE */
MainCtrl.controller('MainCtrl', function ($scope, $http, $cookies, $location, $log, focus, $timeout){


var absUrl = $location.absUrl();
var host = $location.host();
$scope.host = host;


// $scope.navbar = [
//   // { text: 'Home', class:'nav-home', link: '#'},
//   { text: 'Attractions', class:'nav-attractions', link: 'attractions'},
//   { text: 'FAQ', class:'nav-faq', link: 'faq'},
//   { text: 'Tourist Info', class:'nav-tourist-info', link: 'tourist-info'},
//   { text: 'About', class:'nav-about', link: 'about'},
//   { text: 'Contact', class:'nav-contact', link: 'contact'}
// ];

// $scope.social = [
//   { text: 'Facebook', icon:'icon-facebook', link: 'https://www.facebook.com/swishsingapore'},
//   { text: 'Twitter', icon:'icon-twitter', link: '#'},
//   { text: 'Instagram', icon:'icon-instagram', link: '#'}
// ];

$scope.isActive = false;
$scope.LoginToken = "";
$scope.activeButton = function() {$scope.isActive = !$scope.isActive;}

////////////////////////////////////////// LOGIN //////////////////////////////////////////
var tokennotVerify = false;
$scope.tokennotVerify = tokennotVerify;
$scope.submit = function () {

$scope.emailLogin = this.usernameLogin;
$scope.passwordLogin = this.passwordLogin;

	$scope.test="true";
	$scope.searchSiIn = "SingIn";
	$timeout(function(){
		$scope.test="false";
		$scope.searchSiIn = "Search";
	},1000)
	
// console.log($scope.emailLogin+"|"+$scope.passwordLogin);

if($scope.emailLogin == undefined || $scope.emailLogin == ''){
  $scope.emaillogActive = 'invalid-input';
  $scope.emailrequired = true;
  focus('email')

  $scope.passwordlogActive = false;
  $scope.passwordrequired = false;
  $scope.passwordInvalid = false;
  $scope.emailinvaid = false;
} else{
  $scope.emaillogActive = false;
  $scope.emailrequired = false;

	if ($scope.passwordLogin == undefined || $scope.passwordLogin == ''){
	  $scope.passwordlogActive = 'invalid-input';
	  $scope.passwordrequired = true;
	  focus('password')
	}else{
	  $scope.passwordlogActive = false;
	  $scope.passwordrequired = false;

	  $http.get(window.__env.apiUrl+'api/check/available?email='+$scope.emailLogin+'&contact_no=')
		.success(function(email_valid){

		  if(email_valid.status == false){
			$scope.emailinvaid = true;
		  }else{
			$scope.emailinvaid = false;
		    $http.get(window.__env.apiUrl+'api/check/verification?email='+$scope.emailLogin)
			    .success(function(is_verify){
				if(is_verify.status == false){
				  $("#signinModal").modal('hide');
				  swal({
					title: "Your account is not verify!",
					text: "After you done registered, we've sent an email to <b>"+$scope.emailLogin+"</b> with a link to verify your account. Check your email or you can verify your account by click <a href='' id='verifyagain'>verify</a> to verify your Swish account again. ",
					type: "warning",
					showConfirmButton: true,
					html: true
				  });
				  $("#verifyagain").on('click', function(){
					$http.post(window.__env.apiUrl+'api/resend/email/verification?email='+$scope.emailLogin)
					  .success(function(){
						swal({
						  title: "Resend email success!",
						  text: "We've sent an email to <b>"+$scope.emailLogin+"</b> with a link to verify your account.",
						  type: "success",
						  showConfirmButton: true,
						  html: true
						});
					  })
				  });
				}else{

					$scope.spinLogin = true;

				  // use $.param jQuery function to serialize data from JSON 
				  var data = $.param({
					  username: $scope.emailLogin,
					  password: $scope.passwordLogin,
					  scope: "user",
					  grant_type: "password",
				  });

				  // get login token
				  var config = {
					  headers : {
						'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
					  }
				  }
				  $http.post(window.__env.apiUrl+'api/oauth/token', data, config)
				  .success(function (data, status, headers, config) {
					
					 $scope.spinLogin = false;
					 $scope.passwordInvalid = false;
					 window.location.href = 'http://'+host+ '/#/account/purchase-history';
					 window.location.reload();
					 $("#signinModal").modal('hide');
					 $cookies.put('token', data.access_token);

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

					 // add jwt token to auth header for all requests made by the $http service
					 // $http.defaults.headers.common.Authorization = 'Bearer ' + data.access_token;
					 
				  })
				  .error(function(){

					$scope.passwordInvalid = true;
				  })
				}

			  });
		  }
		})    
	}
}
};

// console.log($.parseJSON(localStorage.getItem('userCarts')))
// console.log($.parseJSON(localStorage.getItem('guestCarts')))


////////////////////////////////////////// CHECK TOKEN //////////////////////////////////////////
//if have token then get name logger
$scope.name = '';
if($cookies.get('token')){
$scope.user = $http.get(window.__env.apiUrl+'api/users/me',
{
  headers: {
	'Authorization': 'Bearer ' + $cookies.get('token')
  }
}).success(function (data, status, headers, config) {
	$scope.name = data.first_name;
  });
}

////////////////////////////////////////// LOGOUT //////////////////////////////////////////
$scope.logout = function(){

//remove all cookies
var cookies = $cookies.getAll();
angular.forEach(cookies, function(v, paramCookies){
  // $cookies.remove(paramCookies);
  // console.log(paramCookies);
})


//remove All localStorage
for(var i in localStorage)
{ 
  // var name = localStorage.key(i)
  // var value = localStorage[name]
  // console.log(name);
  // console.log(value);
  // localStorage.removeItem(name)
}


$cookies.remove('token');
// window.location.href = absUrl;
window.location.href = 'http://'+host;


}

////////////////////////////////////////// ALERT USER TO VALIDATE EMAIL //////////////////////////////////////////
var reguseremail = $cookies.get('regemail');
// if(reguseremail != undefined){
if(reguseremail != undefined){
  $scope.emailreg = reguseremail;
  $('#alertverifyemail').modal('show');
  $cookies.remove('regemail');
}


////////////////////////////////////////// FORGOT PASSWORD //////////////////////////////////////////
$scope.forgot = function(){

$scope.email = this.email;
if($scope.email == undefined || $scope.email == ''){
  $scope.emailrequired = true;
}else{
  $scope.emailrequired = false;

  $http.get(window.__env.apiUrl+'api/check/available?email='+$scope.email+'&contact_no=')
	.success(function(is_verified){
	  if(is_verified.status == true){
		$scope.emailinvalid = false;

		$http.post(window.__env.apiUrl+'api/users/forgot/password?email='+$scope.email)
		  .success(function(){

			$("#forgotpassModal").modal('hide');
			swal({
			  title: "Password reset sent!",
			  text: "We've sent an email to <b>"+$scope.email+"</b> with a link to reset your password. ",
			  type: "success",
			  showConfirmButton: true,
			  html: true
			});

		  })
	  }else{
		$scope.emailinvalid = true;
	  }
	})
}

}


////////////////////////////////////////// REGISTER //////////////////////////////////////////
$scope.register = function(){

// if user straightly click register button then show in all field with text and line in red color
// if(this.email == undefined || this.password == undefined || this.first_name == undefined || this.contact_no == undefined){
//   $scope.emailActive = 'invalid-input';
//   $scope.emailr = true;
//   $scope.passwordActive = 'invalid-input';
//   $scope.passrequired = true;
//   $scope.firstnameActive = 'invalid-input';
//   $scope.namerequired = true;
//   $scope.contactnoActive = 'invalid-input';
//   $scope.contactrequired = true;

//   console.log("in");
// }
// email cant be blank
	
if(this.email == undefined || this.email == ''){
  $scope.emailActive = 'invalid-input';
  $scope.emailr = true;
  $scope.emailvalidate = false;

  $scope.passwordActive = false;
  $scope.passrequired = false;
  $scope.passwordconfirmActive = false;
  $scope.IsMatch = false;
  $scope.firstnameActive = false;
  $scope.namerequired = false;
  $scope.contactnoActive = false;
  $scope.contactrequired = false;
}else{
  $scope.emailActive = false;
  $scope.emailr = false;

  //password cant be blank 
  if(this.password == undefined || this.password == ''){
	$scope.passwordActive = 'invalid-input';
	$scope.passrequired = true;
	focus('reg-password')

	$scope.passwordconfirmActive = false;
	$scope.IsMatch = false;
	$scope.firstnameActive = false;
	$scope.namerequired = false;
	$scope.contactnoActive = false;
	$scope.contactrequired = false;
  }else{
	$scope.passwordActive = false;
	$scope.passrequired = false;

	if(this.password_confirmation == undefined || this.password_confirmation == ''){
	  $scope.passconfirmrequired = true;
	  $scope.passwordconfirmActive = 'invalid-input';
	  focus('reg-confirm-password')

	  $scope.IsMatch = false;
	}else{
	  $scope.passconfirmrequired = false;

		// both password must match
		if(this.password != this.password_confirmation){
		  $scope.passwordconfirmActive = 'invalid-input';
		  $scope.IsMatch = true;
		  focus('reg-confirm-password')
		  if(this.password == ''){
			$scope.passwordActive = 'invalid-input';
			$scope.passrequired = true;
			focus('reg-password')
		  }

		  $scope.firstnameActive = false;
		  $scope.namerequired = false;
		  $scope.contactnoActive = false;
		  $scope.contactrequired = false;
		}else{
		  $scope.passwordconfirmActive = false;
		  $scope.IsMatch = false;

		  // username cant be blank
		  if (this.first_name == undefined|| this.first_name == ''){
			$scope.firstnameActive = 'invalid-input';
			$scope.namerequired = true;
			focus('reg-name')

			$scope.contactnoActive = false;
			$scope.contactrequired = false;
		  }else{
			$scope.firstnameActive = false;
			$scope.namerequired = false;

			if(this.contact_no == undefined || this.contact_no == ''){
			  $scope.contactnoActive = 'invalid-input';
			  $scope.contactrequired = true;
			  focus('reg-tel')
			  
			  $scope.contactvalidate = false;
			}else{
			  $scope.contactnoActive = false;
			  $scope.contactrequired = false;

			  $scope.email = this.email;
			  $scope.password = this.password;
			  $scope.password_confirmation = this.password_confirmation;
			  $scope.first_name = this.first_name;
			  $scope.last_name = this.last_name;
			  $scope.age = this.age;
			  $scope.gender = this.gender;
			  $scope.marital_status = this.marital_status;
			  $scope.nationality = this.nationality;
			  $scope.occupation = this.occupation;
			  $scope.contact_country_code = this.contact_country_code;
			  $scope.contact_no = this.contact_no;
			  $scope.dob = this.dob;

			  $http.get(window.__env.apiUrl+'api/check/available?email='+$scope.email+'&contact_no=')
				.success(function(email){
				  // check if email exist
				  if(email.status == true){
					$scope.emailvalidate = true;
				  }else{
					$scope.emailvalidate = false;
					// $scope.emailvalidateAvai = true;

					$http.get(window.__env.apiUrl+'api/check/available?email=&contact_no='+$scope.contact_no)
					.success(function(contactno){
					  // check if contactno exist
					  if(contactno.status == true){
						$scope.contactvalidate = true;
					  }else{
						$scope.contactvalidate = false;

						// get data from form reg
						var data = $.param({
							email: $scope.email,
							password: $scope.password,
							password_confirmation: $scope.password_confirmation,
							first_name: $scope.first_name,
							last_name: $scope.last_name,
							age: $scope.age,
							gender: $scope.gender,
							marital_status: $scope.marital_status,
							nationality: $scope.nationality,
							occupation: $scope.occupation,
							contact_country_code: $scope.contact_country_code,
							contact_no: $scope.contact_no,
							dob: $scope.dob,
						});
						// get login token
						var config = {
							headers : {
							  'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
							}
						}

						$scope.spin="true";
						$scope.registerUs = "regis";
						// post data to API
						$http.post(window.__env.apiUrl+'api/sw_users', data, config)
						.success(function (data, config) {
								$scope.emailinvalid = false;

									$scope.spin="false";
									$scope.registerUs = "Search";
									$cookies.put('regemail', data.result.email);
									$scope.emailreg = $cookies.get('regemail');
									$("#signupModal").modal('hide');
								   // $("#alertverifyemail").modal('show');
								   // window.location.href = 'http://'+host;
									swal({
									  title: "Registered successfully!",
									  text: "Verification Required<br><hr> Before logging in, we need you to verify your email address first. We have sent an email to you at:<br> <b>"+$scope.emailreg+"</b> <br> This is the last step. We promise!",
									  type: "success",
									  showConfirmButton: true,
									  html: true
									});

						})
						.error(function(res){
							$scope.emailinvalid = true;
							focus('reg-email')
							$scope.emailActive = 'invalid-input';
						})
					  }
					})
				  }
				})
			}
		  }
		}
	}
  }
}
}


// if($cookies.get('guestCarts')){
if(localStorage.getItem('guestCarts')){
	var guestCarts = $.parseJSON(localStorage.getItem('guestCarts'));
	$scope.guesttotTickets = guestCarts.result[0].tickets.length;
	// console.log($scope.guesttotTickets);
	if($scope.guesttotTickets == 0){
		// $cookies.remove('guestCarts');
		localStorage.removeItem('guestCarts');
	}
}

// if($cookies.get('userCarts')){
if(localStorage.getItem('userCarts')){
	var userCarts = $.parseJSON(localStorage.getItem('userCarts'));
	$scope.usertotTickets = userCarts.result[0].tickets.length;
	// console.log($scope.usertotTickets);
	if($scope.usertotTickets == 0){
		// $cookies.remove('userCarts');
		localStorage.removeItem('userCarts');
	}
}


////////////////////////////////////////// ITEM DETAILS LOGIN //////////////////////////////////////////
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
	  $scope.order_history = data;
	  console.log($scope.order_history);
		  
	  if(data.result.length > 0){ //check if have any order
		angular.forEach(data.result, function(res){

		  if(res.order.sw_order_status_id == 4 && res.order.is_paid == false){ //check order status 4 and is paid false

			if(res.tickets.length > 0){

				$scope.havecart = true;
				$scope.cartnotEmpty=true;
				$scope.cartEmpty=false;
				$scope.havenocart = false;

				// total price
				var totalTicket = 0;
				angular.forEach(data.result, function(val){
				  angular.forEach(val.tickets, function(tickets){
					angular.forEach(tickets.ticket_type_details, function(totticket){
					  totalTicket = totalTicket + (totticket.original_price * totticket.total_ticket);
					})
				  })
				})
				$scope.subTotal = totalTicket;

				// total ticket
				angular.forEach(data.result, function(val){
				  $scope.totItem = val.tickets.length;
				})
			}

		  }else{
			$scope.havenocart = true;
			$scope.cartEmpty=true;
			$scope.cartnotEmpty=false;
			$scope.havecart = false;
		  }

		})

	  }else{
		  $scope.havenocart = true;
		  $scope.cartEmpty=true;
		  $scope.cartnotEmpty=false;
		  $scope.havecart = false;
	  }

	});
}else{
  $scope.havenocart = true;
  $scope.cartEmpty=true;
  $scope.cartnotEmpty=false;
  $scope.havecart = false;
}
*/


// if($cookies.get('userCarts')){
if(localStorage.getItem('userCarts')){
	localStorage.removeItem('guestCarts')

	$scope.havecart = true;
	$scope.cartnotEmpty=true;
	$scope.cartEmpty=false;
	$scope.havenocart = false;

	// var userexistCart = $.parseJSON(Cookies.get('userCarts'));
	var userexistCart = $.parseJSON(localStorage.getItem('userCarts'))
	// console.log(userexistCart);
	$scope.order_history = userexistCart;
	// console.log($scope.order_history);

	if(userexistCart.result[0].tickets.length > 0){
	  var ticketsprodID = [];
	  angular.forEach(userexistCart.result, function(data){
		angular.forEach(data.tickets, function(data1){
		  ticketsprodID.push(data1.product_id);
		})
	  })
	  $scope.ticketsprodID = ticketsprodID;

	  // total price
	  var totalTicket = 0;
	  angular.forEach(userexistCart.result, function(val){
		angular.forEach(val.tickets, function(tickets){
		  angular.forEach(tickets.ticket_type_details, function(totticket){
			totalTicket = totalTicket + (totticket.price_ticket * totticket.total_ticket);
		  })
		})
	  })
	  $scope.subTotal = totalTicket;


	  // total ticket
	  angular.forEach(userexistCart.result, function(val){
		$scope.totItem = val.tickets.length;
	  })
	}else{
	  $scope.havenocart = true;
	  $scope.cartEmpty=true;
	  $scope.cartnotEmpty=false;
	  $scope.havecart = false;
	}
		
	// remove ticket
		$scope.UndoArray = [];
		var indexcart = 0;
			
		$scope.remove_ = function(ticketTotalAmount, Cart, indexOf){

	  $scope.ticketsprodID.splice(indexOf, 1);
	  // console.log($scope.ticketsprodID);

			$scope.UndoArray.push(Cart);
			$scope.order_history.result[0].tickets.splice(indexOf, 1);
			// $cookies.put('userCarts', JSON.stringify($scope.order_history))
	  localStorage.setItem('userCarts', JSON.stringify($scope.order_history))
	  localStorage.setItem('userCarts', JSON.stringify($scope.order_history));
	  var userCarts = $.parseJSON(localStorage.getItem('userCarts'))
	  if(userCarts.result[0].tickets.length == 0){
		$scope.havenocart = true;
		$scope.cartEmpty=true;
		$scope.cartnotEmpty=false;
		$scope.havecart = false;
	  }

			Cart.Amount = ticketTotalAmount;
			Cart.IndexCart = indexcart;

		// total price
			var totalTicket = 0;
			angular.forEach(userexistCart.result, function(val){
				angular.forEach(val.tickets, function(tickets){
				  angular.forEach(tickets.ticket_type_details, function(totticket){
					totalTicket = totalTicket + (totticket.price_ticket * totticket.total_ticket);
				  })
				})
			})
			$scope.subTotal = totalTicket;

		// total ticket
			angular.forEach(userexistCart.result, function(val){
				$scope.totItem = val.tickets.length;
			})

		  indexcart++;
		}

  }else{
	$scope.havenocart = true;
	$scope.cartEmpty=true;
	$scope.cartnotEmpty=false;
	$scope.havecart = false;
  }
}


////////////////////////////////////////// ITEM DETAILS GUEST //////////////////////////////////////////
if($cookies.get('token') == undefined){

  // if($cookies.get('guestCarts')){
  if(localStorage.getItem('guestCarts')){

	$scope.havecart = true;
	$scope.cartnotEmpty=true;
	$scope.cartEmpty=false;
	$scope.havenocart = false;

	// var guestexistCart = $.parseJSON(Cookies.get('guestCarts'));
	var guestexistCart = $.parseJSON(localStorage.getItem('guestCarts'));
	$scope.order_history = guestexistCart;

	//check if have duplicate id
	$.each(guestexistCart.result, function(i, v){
	  $.each(v.tickets, function(i, v1){
		// console.log(i)
		// console.log(v1)
	  })
	})
	// console.log($scope.order_history);

	if(guestexistCart.result[0].tickets.length > 0){
	  var ticketsprodID = [];
	  angular.forEach(guestexistCart.result, function(data){
		angular.forEach(data.tickets, function(data1){
		  // console.log(data1.product_id);
		  ticketsprodID.push(data1.product_id);
		})
	  })
	  $scope.ticketsprodID = ticketsprodID;
	  // console.log($scope.ticketsprodID);
	  // $cookies.put('ticketsprodID', JSON.stringify($scope.ticketsprodID));
	  // console.log($.parseJSON($cookies.get('ticketsprodID')));

	  // total price
	  var totalTicket = 0;
	  angular.forEach(guestexistCart.result, function(val){
		angular.forEach(val.tickets, function(tickets){
		  angular.forEach(tickets.ticket_type_details, function(totticket){
			totalTicket = totalTicket + (totticket.price_ticket * totticket.total_ticket);
		  })
		})
	  })
	  $scope.subTotal = totalTicket;

	  // total ticket
	  angular.forEach(guestexistCart.result, function(val){
		$scope.totItem = val.tickets.length;
	  })
	}else{
	  $scope.havenocart = true;
	  $scope.cartEmpty=true;
	  $scope.cartnotEmpty=false;
	  $scope.havecart = false;
	}

		// remove ticket
		$scope.UndoArray = [];
		var indexcart = 0;
		
		$scope.remove_ = function(ticketTotalAmount, Cart, indexOf){

	  $scope.ticketsprodID.splice(indexOf, 1);
	  // console.log($scope.ticketsprodID);

			$scope.UndoArray.push(Cart);
			$scope.order_history.result[0].tickets.splice(indexOf, 1);
	  // console.log($scope.order_history);
			// $cookies.put('guestCarts', JSON.stringify($scope.order_history))
	  localStorage.setItem('guestCarts', JSON.stringify($scope.order_history));
	  var guestCarts = $.parseJSON(localStorage.getItem('guestCarts'))
	  if(guestCarts.result[0].tickets.length == 0){
		$scope.havenocart = true;
		$scope.cartEmpty=true;
		$scope.cartnotEmpty=false;
		$scope.havecart = false;
	  }

			Cart.Amount = ticketTotalAmount;
			Cart.IndexCart = indexcart;

		// total price
			var totalTicket = 0;
			angular.forEach(guestexistCart.result, function(val){
				angular.forEach(val.tickets, function(tickets){
				  angular.forEach(tickets.ticket_type_details, function(totticket){
					totalTicket = totalTicket + (totticket.price_ticket * totticket.total_ticket);
				  })
				})
			})
			$scope.subTotal = totalTicket;

		// total ticket
			angular.forEach(guestexistCart.result, function(val){
				$scope.totItem = val.tickets.length;
			})

		  indexcart++;
		}

  }else{
	$scope.havenocart = true;
	$scope.cartEmpty=true;
	$scope.cartnotEmpty=false;
	$scope.havecart = false;
  }
}


////////////////////////////////////////// ATTRACTION DETAIL //////////////////////////////////////////
$scope.attraction_details = function(prodId, prodCategory){
	$cookies.put('prodId', prodId);
	$cookies.put('prodCategory', prodCategory);
	$scope.prodDetails = '/attractions/'+prodCategory+'/'+prodId;
	$location.path($scope.prodDetails)
}


});
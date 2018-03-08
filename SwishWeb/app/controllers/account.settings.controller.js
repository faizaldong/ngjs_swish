var AccountSettingCtrl = angular.module("SwishApp",['ui.router','updateMeta','oc.lazyLoad','ngSanitize', 'ngCookies']);

AccountSettingCtrl.controller('AccountSettingsController', function ($scope, $cookies, $http, $location){

    $scope.colors = [
      {name:'black', shade:'dark'},
      {name:'white', shade:'light', notAnOption: true},
      {name:'red', shade:'dark'},
      {name:'blue', shade:'dark', notAnOption: true},
      {name:'yellow', shade:'light', notAnOption: false}
    ];
    $scope.myColor = $scope.colors[2];
    // console.log($scope.myColor);

	var host = $location.host();
	$scope.token = $cookies.get('token');

	if($cookies.get('token')){
		$http.get(window.__env.apiUrl+'api/users/me', { 
			headers: {
		        'Authorization': 'Bearer ' + $cookies.get('token')
	      	}
		}).success(function(userdetails){
			$scope.userdetails = userdetails;
			$scope.country_code = userdetails.contact_country_code;
			$scope.nationality = userdetails.nationality;

			$cookies.put('country_code', $scope.country_code);
			$cookies.put('nationality', $scope.nationality);
		});
	}

	// console.log($cookies.get('country_code')+"|"+$cookies.get('nationality'));

	var holdCountry = [];
	$http.get(window.__env.apiUrl+'api/countries', { 
		headers: {
	        'Authorization': 'Bearer ' + $cookies.get('token')
      	}
	}).success(function(data){
		$scope.countries = data;
		angular.forEach($scope.countries.result, function(country){
			holdCountry.push(country);
		})

		// console.log(holdCountry[131]);

		indexforPhoneCode = holdCountry.findIndex(x => x.PhoneCode==$cookies.get('country_code'));
		indexforNationality = holdCountry.findIndex(x => x.SortName==$cookies.get('nationality'));

		$scope.getphoneCode = holdCountry[indexforPhoneCode];
		$scope.getNationality = holdCountry[indexforNationality];
	});


	////////////////////////////////////////// UPDATE USER //////////////////////////////////////////
	$scope.updateuser = function(){

		$scope.email = this.email;
		$scope.password = this.password;
		$scope.confirmpassword = this.confirmpassword;
		$scope.first_name = this.first_name;
		$scope.last_name = this.last_name;
		$scope.phone = this.phone;
		$scope.dob = this.dob;
		$scope.country_code = this.contact_country_code;
		$scope.nationality = this.nationality;

		var data = $.param({
			email: $scope.email,
			password: $scope.password,
			confirmpassword: $scope.confirmpassword,
			first_name: $scope.first_name,
			last_name: $scope.last_name,
			phone: $scope.phone,
			dob: $scope.dob,
			country_code: $scope.country_code,
			nationality: $scope.nationality
		});

		// console.log(data);
	}


	////////////////////////////////////////// SIGN OUT //////////////////////////////////////////
  $scope.signout = function(){

  	$cookies.remove('token');
  	window.location.href = 'http://'+host;
	}

        
});
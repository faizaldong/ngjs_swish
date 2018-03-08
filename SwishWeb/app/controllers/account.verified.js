var AccountController = angular.module('SwishApp').controller('AccountVerifiedController', function ($scope,$http,$location){
	var tokenid
	$scope.verify = true; 
	if($location.search().token){
		 tokenid = $location.search().token;
	}
	
	$scope.verifyacc = function(){
		if($location.search().token){
			tokenid = $location.search().token;
			$http.get(window.__env.apiUrl+'api/verify/token?token='+tokenid)
			.success(function(token_valid){
				if(token_valid.status == true){
					$scope.verify = false; $scope.success = true;
					$location.search('token', null)
					console.log("SuccessVerify")	
				}else{
					console.log("ErrorVerify")	
				}
			})	
		}
	}
});


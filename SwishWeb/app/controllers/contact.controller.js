angular.module('SwishApp').controller('ContactController', function ($scope,$http,$location){
    var host = $location.host();
	$scope.title = "Mr";  $scope.subject = "Choose Subject";
	////////////////////////////////////////// REGISTER //////////////////////////////////////////
	$scope.register = function(){
        $scope.title = this.title;
		$scope.name = this.name;
		$scope.email = this.email;
		$scope.phone = this.phone;
		$scope.subject = this.subject;
		$scope.message = this.message;
			
		if ($scope.name == '' || $scope.name == undefined){
				$scope.namerequired = true;
				angular.element("#name").focus();
		}else{
			$scope.namerequired = false;
			if ($scope.email == '' || $scope.email == undefined){
					$scope.emailrequired = true;
					angular.element("#email").focus();
			}else{
				$scope.emailrequired = false;
				if ($scope.phone == '' || $scope.phone == undefined){
						$scope.phonerequired = true;
						angular.element("#phone").focus();
				}else{
					$scope.phonerequired = false;			
					if ($scope.subject == '' || $scope.subject == "Choose Subject"){
							$scope.subjectrequired = true;
							angular.element("#subject").focus();
					}else{
						$scope.subjectrequired = false;			
						if ($scope.message == '' || $scope.message == undefined){
							$scope.msgrequired = true;
							angular.element("#message").focus();
						}else{
							$scope.msgrequired = false;
							if ($scope.hasagree) {
									$scope.checkreq = false;
									var data = $.param({
										  title: $scope.title,
										  name: $scope.name,
										  email: $scope.email,
										  contact_no: $scope.phone,
										  subject: $scope.subject,
										  message: $scope.message
									});
									var config = {
										headers : {
										  'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
										}
									}
									// post data to API
									$http.post(window.__env.apiUrl+'api/sw_feedbacks', data, config)
										.success(function (data, config) {
										swal({
											  title: "Message successfully Send!",
											  text:  "thank you send us a message",
											  type:  "success",
											});
										console.log("success");	
										window.location.href = 'http://'+host+ '/#/home';
									});
								} else {
									$scope.checkreq = true;
									console.log("error send");	
									angular.element("#agreement").focus();
								}	
						}
					}
				}
			}	
 		}	
	}   


});
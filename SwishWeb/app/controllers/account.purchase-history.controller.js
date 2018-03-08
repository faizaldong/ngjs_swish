var MainCtrl = angular.module('SwishApp');
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


MainCtrl.controller('AccountPurchaseHistoryController', function ($scope, $http, $cookies, $location){
$scope.history = [
	{   
		image			: "assets/common/img/attractions/thumb/gardens-by-the-bay.jpg",
		title			: "Gardens by the Bay - Flower Dome & Cloud Forest",
		id				: "gardens-by-the-bay",
		status			: "soon",
		labelColor		: "green",
		ticketType		: "One-Day Adventure Pass",
		expiryDate		: "28 December 2016",
		PDF				: ""
	},
	{   
		image			: "assets/common/img/attractions/thumb/segway-fun-ride.jpg",
		title			: "Segway® Fun Ride",
		id				: "segway-fun-ride",
		status			: "ended",
		labelColor		: "red",
		ticketType		: "2 Rounds",
		expiryDate		: "2 December 2016",
		PDF				: ""
	}
];

$scope.totHistory = 0;
//console.log("token:"+$cookies.get('token'));

if($cookies.get('token')){
	$http.get(window.__env.apiUrl+"api/sw_orders/", {
		headers:{
			'Authorization': 'Bearer ' + $cookies.get('token')
		}
	}).success(function(data){
		var historyPurchase = [];
		angular.forEach(data.result, function(v){
			historyPurchase.push(v)
		})
		$scope.historyPurchase = historyPurchase;
		console.log(historyPurchase)
		if(historyPurchase.length > 0){
			$scope.buttonnotEmpty=true;
		}else{
			$scope.buttonisEmpty=true;
		}

		var totHistory = 0;
		angular.forEach(historyPurchase, function(v){
			if(v.order.is_paid == true && v.order.sw_order_status_id == 2){
				angular.forEach(v.ticket_details, function(v1){
					// if(v1.tickets.length > 0){
					// 	totHistory++;
					// }
					totHistory++;
				})
			}
		})
		$scope.totHistory = totHistory;

		// angular.forEach(data.result, function(val){
		//   if(val.order.sw_order_status_id == 2 && val.order.is_paid == true){
		// 	$scope.historyPurchase = val;
		// 	$scope.totHistory = val.ticket_details.length;
		// 	//console.log($scope.historyPurchase);
		//   }
		// })
	})
}

////////////////////////////////////////// DOWNLOAD TICKET //////////////////////////////////////////
$scope.download = function(indexOf){
//console.log(indexOf);

  $http.get(window.__env.apiUrl+"api/sw_orders/", {
	  headers:{
		  'Authorization': 'Bearer ' + $cookies.get('token')
	  }
  }).success(function(data){
	  var download = [];
	  angular.forEach(data.result, function(val){
		if(val.order.sw_order_status_id == 2 && val.order.is_paid == true){
		  var dUrl = val.ticket_details[indexOf];
		  console.log(dUrl)
		  angular.forEach(dUrl.tickets, function(val1){
			download.push(val1.download_url)
		  })
		}
	  })
	  // console.log(download)
		var link = document.createElement('a');
		link.setAttribute('download', null);
		link.style.display = 'none';

		document.body.appendChild(link);
		for (var i = 0; i < download.length; i++) {
		  link.setAttribute('href', download[i]);
		  link.click();
		}
		document.body.removeChild(link);

  })
}
////////////////////////////////////////// ATTRACTION DETAIL //////////////////////////////////////////
$scope.attraction_details = function(prodId, prodCategory){
  $cookies.put('prodId', prodId);
  $cookies.put('prodCategory', prodCategory);
  $scope.prodDetails = '/attractions/'+prodCategory+'/'+prodId;
  $location.path($scope.prodDetails)
}

});
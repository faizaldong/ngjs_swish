var attractionController = angular.module('SwishApp').controller('SearchResultsController', function ($scope,$http,$location){

    $http.get('attractions-temp.json')
        .then(function(res){
        $scope.attractionList = res.data; // RESource . DATA
    })
	
	// attraction category list menu
    $http.get(window.__env.apiUrl+'api/product_categories')
        .then(function(attractCatMenu){
            $scope.attractCatMenu = attractCatMenu.data;
        })
	
   // get all attraction list
    $http.get(window.__env.apiUrl+'api/products')
    	.then(function (res) {
    	    $scope.attractionListCat = res.data;
            // console.log($scope.attractionList);
        });	

	if($location.search().fieldkeywords){
		 $scope.search = $location.search().fieldkeywords;
	}
});
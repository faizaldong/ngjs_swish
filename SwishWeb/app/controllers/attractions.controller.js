var app = angular.module('SwishApp',['ngParallax']);


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


app.controller('AttractionsController', function ($scope, $http, $stateParams, $location, $rootScope, $cookies){
// var attractionController = angular.module('SwishApp').controller('AttractionsController', function ($scope, $http, $stateParams){

    // $http.get('attractions.json')
    //     .then(function(res){
    //     $scope.attractionList = res.data; // RESource . DATA

    // })


    // attraction category list menu
    $http.get(window.__env.apiUrl+'api/product_categories')
        .then(function(attractCatMenu){
            $scope.attractCatMenu = attractCatMenu.data;
        })


    $scope.prodCategid = $stateParams.attraction_category_id;
    var attraction_category_id = $scope.prodCategid;

    // get all attraction list
    $http.get(window.__env.apiUrl+'api/products')
    	.then(function (res) {
    	    $scope.attractionListCat = res.data;
            // console.log($scope.attractionListCat);
        });


  ////////////////////////////////////////// PRODUCT SELECTED //////////////////////////////////////////
  $scope.prodSelected = function(prodId){

      // get attraction list based on selected category
      if(prodId != undefined){
          $scope.prodid = prodId;
          $http.get(window.__env.apiUrl+'api/products?product_category_id='+prodId)
              .then(function(attractCategory){
                  $scope.attractionListCat = attractCategory.data;
              });
      }else{
          $scope.prodid = prodId;
          $http.get(window.__env.apiUrl+'api/products')
              .then(function(attractCategory){
                  $scope.attractionListCat = attractCategory.data;
              });
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
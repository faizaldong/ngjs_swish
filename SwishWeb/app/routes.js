 /* VIEW LOADS HERE */
MainCtrl.config([ '$stateProvider','$urlRouterProvider','$locationProvider', function ($stateProvider, $urlRouterProvider, $locationProvider, $cookies){

      // Redirect any unmatched URL
      $urlRouterProvider.otherwise('/');

      $stateProvider

        // Home Page
        .state('home', { 
          url: '/',
          templateUrl: 'app/views/home.html',
          controller: 'HomeController',
          resolve: {
            deps: ['$ocLazyLoad', function($ocLazyLoad) {
              return $ocLazyLoad.load({
                name: 'MainCtrl',  
                files: [
                  'app/controllers/home.controller.js'
                ]                    
              });
            }]
          }
        })

        // Verify Email Page
        .state('verifyemail', { 
          url: '/verify',
          templateUrl: 'app/views/verify_email.html'
        })

        // Account Verified Email Page
       /*  .state('accountverified', { 
          url: '/account-verified',
          templateUrl: 'app/views/account.verified.html'
        }) */
		.state('accountverified', { 
			  url: '/account-verified',
			  templateUrl: 'app/views/account.verified.html',
			  controller: 'AccountVerifiedController',
			  resolve: {
				deps: ['$ocLazyLoad', function($ocLazyLoad) {
				  return $ocLazyLoad.load({
					name: 'MainCtrl',  
					files: [
					  'app/controllers/account.verified.js'
					]                    
				  });
				}]
			  }
			})
        // Reset Password Page
        .state('resetpassword', { 
          url: '/reset-password',
          templateUrl: 'app/views/reset-password.html'
        })

        // Attractions
        .state('attractions', { 
          url: '/attractions',
          templateUrl: 'app/views/attractions.html',
          controller: 'AttractionsController',
          resolve: {
            deps: ['$ocLazyLoad', function($ocLazyLoad) {
              return $ocLazyLoad.load({
                name: 'MainCtrl',  
                files: [
                  'app/controllers/attractions.controller.js'
                ]                    
              });
            }]
          }
        })

        // FAQ
        .state('faq', { 
          url: '/faq',
          templateUrl: 'app/views/faq.html',
          controller: 'FAQController',
          resolve: {
            deps: ['$ocLazyLoad', function($ocLazyLoad) {
              return $ocLazyLoad.load({
                name: 'MainCtrl',  
                files: [
                  'app/controllers/faq.controller.js'
                ]                    
              });
            }]
          }
        })

        // Buy Tickets
        .state('buy-tickets', { 
          url: '/buy-tickets',
          templateUrl: 'app/views/buy-tickets.html',
          controller: 'BuyTixController',
          resolve: {
            deps: ['$ocLazyLoad', function($ocLazyLoad) {
              return $ocLazyLoad.load({
                name: 'MainCtrl',  
                files: [
                  'app/controllers/buy-tickets.controller.js'
                ]                    
              });
            }]
          }
        })

        // Buy Tickets no results
        .state('buy-tickets-none', { 
          url: '/buy-tickets-none',
          templateUrl: 'app/views/buy-tickets-none.html'
        })

        // Search Results
        .state('search-results', { 
          url: '/search-results',
          templateUrl: 'app/views/search-results.html',
          controller: 'SearchResultsController',
          resolve: {
            deps: ['$ocLazyLoad', function($ocLazyLoad) {
              return $ocLazyLoad.load({
                name: 'MainCtrl',  
                files: [
                  'app/controllers/search-results.controller.js'
                ]                    
              });
            }]
          }
        })

        // Shopping-cart
        .state('cart', { 
          url: '/cart',
          templateUrl: 'app/views/cart.html',
          controller: 'CartController',
          resolve: {
            deps: ['$ocLazyLoad', function($ocLazyLoad) {
              return $ocLazyLoad.load({
                name: 'MainCtrl',  
                files: [
                  'app/controllers/cart.controller.js'
                ]                    
              });
            }]
          }
        })

        // Tourist Info : The Country (default)
        .state('tourist-info', { 
          url: '/tourist-info/the-country',
          templateUrl: 'app/views/tourist.the-country.html'
        })

        // Tourist Info : Language
        .state('tourist-info-language', { 
          url: '/tourist-info/language',
          templateUrl: 'app/views/tourist.language.html'
        })

        // Tourist Info : Climate
        .state('tourist-info-climate', { 
          url: '/tourist-info/climate',
          templateUrl: 'app/views/tourist.climate.html'
        })

        // Tourist Info : Currency
        .state('tourist-info-currency', { 
          url: '/tourist-info/currency',
          templateUrl: 'app/views/tourist.currency.html'
        })

        // Tourist Info : Food & Beverages
        .state('tourist-info-food', { 
          url: '/tourist-info/food-and-beverage',
          templateUrl: 'app/views/tourist.food.html'
        })

        // Tourist Info : Public Transportation
        .state('tourist-info-transportation', { 
          url: '/tourist-info/public-transportation',
          templateUrl: 'app/views/tourist.transportation.html'
        })

        // Tourist Info : Others
        .state('tourist-info-others', { 
          url: '/tourist-info/others',
          templateUrl: 'app/views/tourist.others.html'
        })
        
        // About
        .state('about', { 
          url: '/about',
          templateUrl: 'app/views/about.html'
        })

        // Contact
        .state('contact', { 
          url: '/contact',
          templateUrl: 'app/views/contact.html',
          controller: 'ContactController',
          resolve: {
            deps: ['$ocLazyLoad', function($ocLazyLoad) {
              return $ocLazyLoad.load({
                name: 'MainCtrl',  
                files: [
                  'app/controllers/contact.controller.js'
                ]                    
              });
            }]
          }
        })

        // Attraction List By Category: 
        .state('attractionfor', { 
          url: '/attractions_menu/:attraction_category/:attraction_category_id',
          templateUrl: 'app/views/attractions.html',
          controller: 'AttractionsController'
        })

        // // Attraction List Details: 
        // .state('attraction_details', { 
        //   url: '/attractions/:attraction_category/:attraction_id',
        //   templateUrl: 'app/views/attractions.segway-fun-ride.html',
        //   // controller: 'AttractionDetailsController'
        // })

        .state('attraction_details', { 
          url: '/attractions/:attraction_category/:attraction_id',
          templateUrl: 'app/views/attractions.segway-fun-ride.html',
          controller: 'AttractionDetailsController',
          resolve: {
            deps: ['$ocLazyLoad', function($ocLazyLoad) {
              return $ocLazyLoad.load({
                name: 'MainCtrl',  
                files: [
                  'app/controllers/attractionDetails.controller.js'
                ]                    
              });
            }]
          }
        })

        // // Attraction : Skyline Luge (2 Rides)
        // .state('skyline-luge-2rides', { 
        //   url: '/attractions/skyline-luge-2rides',
        //   templateUrl: 'app/views/attractions.skyline-luge-2rides.html'
        // })

        // // Attraction : Madame Tussauds + IOS Live
        // .state('madame-tussauds', { 
        //   url: '/attractions/madame-tussauds',
        //   templateUrl: 'app/views/attractions.madame-tussauds.html'
        // })

        // // Attraction : Legoland Themepark
        // .state('legoland-themepark', { 
        //   url: '/attractions/legoland-themepark',
        //   templateUrl: 'app/views/attractions.legoland-themepark.html'
        // })

        // // Attraction : Sentosa 4D Adventureland
        // .state('sentosa-4d-adventureland', { 
        //   url: '/attractions/sentosa-4d-adventureland',
        //   templateUrl: 'app/views/attractions.sentosa-4d-adventureland.html'
        // })

        // // Attraction : Gardens by the Bay
        // .state('gardens-by-the-bay', { 
        //   url: '/attractions/gardens-by-the-bay',
        //   templateUrl: 'app/views/attractions.gardens-by-the-bay.html'
        // })

        // // Attraction : Jurong Birdpark + Tram
        // .state('jurong-birdpark-tram', { 
        //   url: '/attractions/jurong-birdpark-tram',
        //   templateUrl: 'app/views/attractions.jurong-birdpark-tram.html'
        // })

        // // Attraction : Singapore Zoo + Tram
        // .state('singapore-zoo-tram', { 
        //   url: '/attractions/singapore-zoo-tram',
        //   templateUrl: 'app/views/attractions.singapore-zoo-tram.html'
        // })

        // Account : Settings
        .state('settings', { 
          url: '/account/settings',
          templateUrl: 'app/views/account.settings.html',
          controller: 'AccountSettingsController',
          resolve: {
            deps: ['$ocLazyLoad', function($ocLazyLoad) {
              return $ocLazyLoad.load({
                name: 'MainCtrl',  
                files: [
                  'app/controllers/account.settings.controller.js'
                ]                    
              });
            }]
          }
        })

        // Account : Purchase History
        .state('purchase-history', { 
          url: '/account/purchase-history',
          templateUrl: 'app/views/account.purchase-history.html',
          controller: 'AccountPurchaseHistoryController',
          resolve: {
            deps: ['$ocLazyLoad', function($ocLazyLoad) {
              return $ocLazyLoad.load({
                name: 'MainCtrl',  
                files: [
                  'app/controllers/account.purchase-history.controller.js'
                ]                    
              });
            }]
          }
        })


        // Terms & Conditions
        .state('terms', { 
          url: '/terms-and-conditions',
          templateUrl: 'app/views/terms.html'
        })


        // Privacy Policy
        .state('privacy', { 
          url: '/privacy-policy',
          templateUrl: 'app/views/privacy.html'
        })

        // Checkout : Sign In
        $stateProvider
        .state('checkout-signin', { 
          url: '/checkout/signin',
          templateUrl: 'app/views/checkout.signin.html',
          controller: 'CartFormController',
          resolve: {
            deps: ['$ocLazyLoad', function($ocLazyLoad) {
              return $ocLazyLoad.load({
                name: 'MainCtrl',  
                files: [
                  'app/controllers/cart-form.controller.js'
                ]                    
              });
            }]
          }
        })

        // Checkout : Sign In
        .state('checkout-signin-register', { 
          url: '/checkout/signin/register',
          templateUrl: 'app/views/checkout.signin-register.html',
          controller: 'CartFormController',
          resolve: {
            deps: ['$ocLazyLoad', function($ocLazyLoad) {
              return $ocLazyLoad.load({
                name: 'MainCtrl',  
                files: [
                  'app/controllers/cart-form.controller.js'
                ]                    
              });
            }]
          }
        })

        // Checkout : Sign In
        .state('checkout-signin-guest', { 
          url: '/checkout/signin/guest',
          templateUrl: 'app/views/checkout.signin-guest.html',
          controller: 'CartFormController',
          resolve: {
            deps: ['$ocLazyLoad', function($ocLazyLoad) {
              return $ocLazyLoad.load({
                name: 'MainCtrl',  
                files: [
                  'app/controllers/cart-form.controller.js'
                ]                    
              });
            }]
          }
        })

        // Checkout : Payment Method
        .state('checkout-payment-method', { 
          url: '/checkout/payment-method',
          templateUrl: 'app/views/checkout.payment-method.html',
          controller: 'PlaceOrderController',
          resolve: {
            deps: ['$ocLazyLoad', function($ocLazyLoad) {
              return $ocLazyLoad.load({
                name: 'MainCtrl',  
                files: [
                  'app/controllers/checkout.place-order.controller.js'
                ]                    
              });
            }]
          }
        })

        // Checkout : Place Order
        .state('checkout-place-order', { 
          url: '/checkout/place-order/:payment',
          templateUrl: 'app/views/checkout.place-order.html',
          controller: 'PlaceOrderController',
          resolve: {
            deps: ['$ocLazyLoad', function($ocLazyLoad) {
              return $ocLazyLoad.load({
                name: 'MainCtrl',  
                files: [
                  'app/controllers/checkout.place-order.controller.js'
                ]                    
              });
            }]
          }
        })

        // Checkout : Confirmation
        .state('checkout-confirmation', { 
          url: '/checkout/confirmation',
          templateUrl: 'app/views/checkout.confirmation.html',
          controller: 'ConfirmationController',
          resolve: {
            deps: ['$ocLazyLoad', function($ocLazyLoad) {
              return $ocLazyLoad.load({
                name: 'MainCtrl',  
                files: [
                  'app/controllers/checkout.confirmation.controller.js'
                ]                    
              });
            }]
          }
        })

      // Remove the # in URL
      // $locationProvider.html5Mode({enabled: true, requireBase: true});
      $locationProvider.html5Mode({enabled: false, requireBase: true});
}]);
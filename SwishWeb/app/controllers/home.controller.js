angular.module('SwishApp').controller('HomeController', function ($scope, $http, $cookies, $location){


  ////////////////////////////////////////// SEARCH PRODUCT //////////////////////////////////////////
	$scope.search = function() {
		$http.get('#/search-results/' + $scope.searchText).
		success(function(res){
			$scope.results = res;
			$location.url('/search-results?fieldkeywords=' + $scope.searchText);
		});
	}
    // Carousel list
    $scope.homeCarousel = [
        {   
            image: 'assets/common/img/slides_bg/slide_1.jpg', 
            title:'GARDENS BY THE BAY SINGAPORE DAY PASS', 
            description:'Direct Entry, no exchange required. Beat the queue, head straight into the cool domes, Flower Dome and Cloud Forest.', 
            price:'SGD 28.00', 
            btn1Text:'BUY NOW', 
            btn1Link:'buy', 
            btn2Text:'READ MORE',
            btn2Link:'#'
        },
        { 
            image: 'assets/common/img/slides_bg/slide_2.jpg', 
            title:'UNIVERSAL STUDIOS EXPRESS PASS', 
            description:'Add an Universal Express to your Day Pass to skip the regular queues at all your favourite rides and attractions', 
            price:'SGD 25.00',
            btn1Text:'BUY NOW', 
            btn1Link:'buy', 
            btn2Text:'MORE DETAILS',
            btn2Link:'#'
        },
        { 
            image: 'assets/common/img/slides_bg/slide_3.jpg', 
            title:'BUTTERFLY PARK & INSECT KINGDOM', 
            description:'Now on limited offer buy 2 for 1', 
            price:'SGD 12.00', 
            btn1Text:'BUY NOW', 
            btn1Link:'buy', 
            btn2Text:'MORE DETAILS',
            btn2Link:'#'
        },
        {   
            image: 'assets/common/img/slides_bg/slide_4.jpg', 
            title:'SINGAPORE ZOO', 
            description:'DINO-MITE ADMISSION COMBO Up to 40% savings', 
            price:'SGD 25.00', 
            btn1Text:'BUY NOW', 
            btn1Link:'buy', 
            btn2Text:'MORE DETAILS',
            btn2Link:'#'
        }
    ];

    // Delay load to avoid simultaneous load AND Carousel settings
    $scope.$on('$viewContentLoaded', function() {   
        setTimeout(function(){ 
            'use strict';
            jQuery('.tp-slider').show().revolution({
                dottedOverlay: "none",
                delay: 16000,
                startwidth: 1170,
                startheight: 550,
                hideThumbs: 200,

                thumbWidth: 100,
                thumbHeight: 50,
                thumbAmount: 5,

                navigationType: "bullet",
                navigationArrows: "solo",
                navigationStyle: "none",

                touchenabled: "on",
                onHoverStop: "on",

                swipe_velocity: 0.7,
                swipe_min_touches: 1,
                swipe_max_touches: 1,
                drag_block_vertical: false,

                parallax: "mouse",
                parallaxBgFreeze: "on",
                parallaxLevels: [7, 4, 3, 2, 5, 4, 3, 2, 1, 0],

                keyboardNavigation: "off",

                navigationHAlign: "center",
                navigationVAlign: "bottom",
                navigationHOffset: 0,
                navigationVOffset: 20,

                soloArrowLeftHalign: "left",
                soloArrowLeftValign: "center",
                soloArrowLeftHOffset: 20,
                soloArrowLeftVOffset: 0,

                soloArrowRightHalign: "right",
                soloArrowRightValign: "center",
                soloArrowRightHOffset: 20,
                soloArrowRightVOffset: 0,

                shadow: 0,
                fullWidth: "on",
                fullScreen: "off",

                spinner: "spinner4",

                stopLoop: "off",
                stopAfterLoops: -1,
                stopAtSlide: -1,

                shuffle: "off",

                autoHeight: "off",
                forceFullWidth: "on",

                hideThumbsOnMobile: "off",
                hideNavDelayOnMobile: 1500,
                hideBulletsOnMobile: "off",
                hideArrowsOnMobile: "on",
                hideThumbsUnderResolution: 0,

                hideSliderAtLimit: 0,
                hideCaptionAtLimit: 0,
                hideAllCaptionAtLilmit: 0,
                startWithSlide: 0,
                videoJsPath: "rs-plugin/videojs/",
                fullScreenOffsetContainer: ""
            });
          }
          ,100); // Delay for 1mm
    });

    // Featured promotion
    $scope.featured = [
        {   
            name:'Sea Aquarium & Maritime Museum',
            category:'sentosa', // sentosa, city or others
            price:'39',
            link:'attractions.sea-aquarium-maritime-museum',
            image:'assets/common/img/attractions/thumb/sea-aquarium-maritime-museum.jpg',
            label:'popular', // top_rated , popular or leave it blank 
            labelColor:'green',
            timer:'0.1' // This value must be in linear
        },
        {   
            name:'Gardens by the Bay - Flower Dome & Cloud Forest',
            category:'city',
            price:'20',
            link:'attractions.gardens-by-the-bay',
            image:'assets/common/img/attractions/thumb/gardens-by-the-bay.jpg',
            label:'top rated',
            labelColor:'red',
            timer:'0.2'
        },
        {   
            name:'Legoland Themepark + Waterpark',
            category:'others',
            price:'62',
            link:'attractions.legoland-themepark-waterpark',
            image:'assets/common/img/attractions/thumb/legoland-themepark-waterpark.jpg',
            label:'',
            timer:'0.3'
        },
        {   
            name:'Madame Tussauds',
            category:'city',
            price:'20',
            link:'attractions.madame-tussauds',
            image:'assets/common/img/attractions/thumb/madame-tussauds.jpg',
            label:'',
            timer:'0.4'
        }
    ];

    // Carousel list
    $scope.promoCarousel = [
        {   
            image: 'assets/common/img/slides_promo/slide_1.jpg', 
            title:'30% OFF YOUR TOTAL BILL', 
            description:'at Majestic Bay Seafood Restaurant when you purchase Gardens by the Bay Day Pass from', 
            dates:'10 OCT 2016 - 14 FEB 2017', 
            btn2Text:'BOOK NOW',
            btn2Link:'#'
        },
        { 
            image: 'assets/common/img/slides_promo/slide_2.jpg', 
            title:'20% OFF FOR UPGRADE TO BUSINESS CLASS', 
            description:'when you purchase an Singapore Airlines ticket to Singapore from', 
            dates:'15 DEC 2016 - 15 JAN 2017', 
            btn2Text:'BOOK NOW',
            btn2Link:'#'
        },
        { 
            image: 'assets/common/img/slides_promo/slide_3.jpg', 
            title:'FREE TICKETS FOR ONE RIDE IN FLYER', 
            description:'upon booking at Marina Bay Sands hotel for one night between', 
            dates:'5 DEC 2016 - 31 MAC 2017', 
            btn2Text:'BOOK NOW',
            btn2Link:'#'
        }
    ];

    // Promotion Carousel Settings
    $scope.$on('$viewContentLoaded', function() {   
        setTimeout(function(){ 
            'use strict';
            jQuery('.tp-promo').show().revolution({
                dottedOverlay: "none",
                delay: 16000,
                startwidth: 1170,
                startheight: 400,
                hideThumbs: 200,

                thumbWidth: 100,
                thumbHeight: 50,
                thumbAmount: 5,

                navigationType: "bullet",
                navigationArrows: "solo",

                touchenabled: "on",
                onHoverStop: "on",

                swipe_velocity: 0.7,
                swipe_min_touches: 1,
                swipe_max_touches: 1,
                drag_block_vertical: false,

                parallax: "mouse",
                parallaxBgFreeze: "on",
                parallaxLevels: [7, 4, 3, 2, 5, 4, 3, 2, 1, 0],

                keyboardNavigation: "off",

                navigationHAlign: "center",
                navigationVAlign: "bottom",
                navigationHOffset: 0,
                navigationVOffset: 20,

                soloArrowLeftHalign: "left",
                soloArrowLeftValign: "center",
                soloArrowLeftHOffset: 20,
                soloArrowLeftVOffset: 0,

                soloArrowRightHalign: "right",
                soloArrowRightValign: "center",
                soloArrowRightHOffset: 20,
                soloArrowRightVOffset: 0,

                shadow: 0,
                fullWidth: "on",
                fullScreen: "off",

                spinner: "spinner4",

                stopLoop: "off",
                stopAfterLoops: -1,
                stopAtSlide: -1,

                shuffle: "off",

                autoHeight: "off",
                forceFullWidth: "on",

                hideThumbsOnMobile: "off",
                hideNavDelayOnMobile: 1500,
                hideBulletsOnMobile: "off",
                hideArrowsOnMobile: "on",
                hideThumbsUnderResolution: 0,

                hideSliderAtLimit: 0,
                hideCaptionAtLimit: 0,
                hideAllCaptionAtLilmit: 0,
                startWithSlide: 0,
                videoJsPath: "rs-plugin/videojs/",
                fullScreenOffsetContainer: ""
            });
          }
          ,100); // Delay for 1mm
    });


    // Owl Carousel Events/Anouncements list
    $scope.owlCarousel = [
        {   
            title:"Singapore's annual cultural events ", 
            description:"Featuring \n\n the best of horticultural, sustainability and architectural design, visit the award winning Gardens by the Bay, filled with wonders from every continent except Antarctica. Explore diverse plant life from around the world displayed in it's spectacular Cooled Conservatories – Flower Dome & Cloud Forest or marvel at the Supertrees – towering vertical gardens that extend into the sky. Be inspired by nature and let your wonder bloom and...", 
            date:"10 SEPTEMBER 2016"
        },
        { 
            title:"Website Maintenance", 
            description:"Swish.sg will be down about 60 minutes for our regular annual maintenance.", 
            date:"10 DECEMBER 2016"
        },
        { 
            title:"Lorem Ipsum", 
            description:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Autem nihil molestias, cum voluptatum cupiditate dicta magnam quo minus consequatur totam, placeat repellat eum neque sunt amet! Earum velit, accusamus dolorem perferendis fugiat magni dolorum, quisquam hic ex explicabo sed cupiditate minima pariatur culpa, deserunt, itaque commodi. Dolorum dolores nulla similique at iure quia doloribus est voluptatem obcaecati eaque corrupti ipsam, quaerat fugit! Eveniet sunt, omnis sit dignissimos maiores dolorum dolor voluptatum animi, voluptatem ab eos provident illum, unde est vero aliquam!", 
            date:"10 SEPTEMBER 2016"
        }
    ];


    $(document).ready(function() {
        setTimeout(function(){ 
 
        $("#owl-example").owlCarousel({
            singleItem:true,
            navigation : true,
            navigationText : ["<div class='owl-nav-left'></div>","<div class='owl-nav-right'></div>"],
            margin:10
        });
        }, 100);     
    });


    // get attractions
    $http.get(window.__env.apiUrl+'api/products')
        .success(function(data){
            $scope.attractionRecommenList = data;
        })


  ////////////////////////////////////////// ATTRACTION DETAIL //////////////////////////////////////////
  $scope.attraction_details = function(prodId, prodCategory){
      $cookies.put('prodId', prodId);
      $cookies.put('prodCategory', prodCategory);
      $scope.prodDetails = '/attractions/'+prodCategory+'/'+prodId;
      $location.path($scope.prodDetails)
  }
});
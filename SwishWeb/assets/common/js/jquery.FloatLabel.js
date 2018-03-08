(function( $ ){

	$.fn.FloatLabel = function( options ){

		var defaults = {
			populatedClass : 'populated',
			focusedClass : 'focused',
			passwordClass : 'passwordbefore'
		},
			settings = $.extend({}, defaults, options);

		return this.each(function(){

			var element = $(this),
				label = element.find('label'),
				input = element.find('textarea, input');

      if( input.val() == '' ) {
        input.val( label.text() );
      }
     if ( input.prop('type') == 'password' ) {
                input.addClass( settings.passwordClass );
                input.prop('type', 'text');
            } else {
        element.addClass( settings.populatedClass );
      }

			input.on( 'focus', function(){
				element.addClass( settings.focusedClass );
				
				if( input.val() === label.text() ){
					input.val('');
				}
				if ( input.hasClass('passwordbefore') ) {
                    input.prop( 'type', 'password' )
                } else {
					element.addClass( settings.populatedClass );
				}

			});

			input.on( 'blur', function(){
				element.removeClass( settings.focusedClass );
				
				if( !input.val() ){
					input.val( label.text() );
					element.removeClass( settings.populatedClass );

					if ( input.hasClass('passwordbefore') ) {
                        input.prop( 'type', 'text' )
                    }
				}

			});

			input.on( 'keyup', function(){
				element.addClass( settings.populatedClass );
			});

		});

	};

})( jQuery );

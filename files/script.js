(function($) {
	var $output,
		output = function( item ) {
			var args = [].slice.call( arguments ),
					i = 0;
			for(; i < args.length; i++) {
				if ( $.type( args[i] ) == "object" ) {
					args[i] = window.JSON.stringify( args[i] );
					args[i] = args[i].replace( ",", ", " );
				}
			}
			var	$line = $( "<div>"+args.join(', ')+"</div>");
			$output.append( $line.hide(0) );
			$line.show(600);
		};
	output.clear = function() {
		var lines = $output.find('div'),
			done = lines.length;
		$output.find('div').slideDown(200, function() {
			!--done && $output.empty();
		})
	}
	window.output = output;
	$( document ).ready( function() {
		$output = $( '#output' );
	});
})(jQuery);
var slides = (function($){
	var $document = $( document ),
		currentSlide,
		$slides,
		
		goto = function( num ) {
			// keep slide in bounds
			var slide = num > $slides.length ? $slides.length-1 :	num <= 0 ? 0 : num-1,
				$slide = $slides.eq( slide );
				
			// run any exit callbacks
			leave( $slides.filter('.active') );
			
			$slide.addClass( 'active' ).removeClass( 'old' );
			
			if ( slide ) {
				 $slides.slice( 0, slide ).addClass('old');
			} 
			$slides.slice( slide+1 ).removeClass( 'old active');
			currentSlide = slide+1;
			$.bbq.pushState( '#'+currentSlide );
			
			// run any live callbacks
			extra( $slide );
		},
		
		// respond to keys
	  actions = {
			39: function( e ) { //right arrow	
				goto( currentSlide + ( e.shiftKey ? 10 : 1) );
			},
			37: function( e ) {
				goto( currentSlide - ( e.shiftKey ? 10 : 1) );
			}
		},
		
		// map which/keyCode to actions object
		keydown = function( e ) {
			var action = actions[ typeof e.which === "number" ? e.which : e.keyCode ];
			if ( action ) {
				action( e );
			}
		},
		
		extra = function( $slide ) {
			// clear console
			output.clear();
			// run scripts
			setTimeout( function() {
				if ( !$slide.is( '.active') ) {
					return false;
				}
					var $toRun = $slide.find( 'pre.execute' ),
						$background;
					if ( $toRun.length ) {
						$background = $slide.find( 'pre.background' );
						eval( ( $background.length ? $background.html() : '' ) + $toRun.html() );
					}
			},1000);
		
		},
		
		leave = function( $slide ) {
			var $toRun = $slide.find( 'pre.leave' );
			if ( $toRun.length ) {
				eval( $toRun.html() );
			}
		};
		
		// init slides
		$document.ready( function() {
			// keep a reference of all the slides
			$slides = $( 'div.slide' );
			
			// setup key bindings
			$document.bind( 'keydown', keydown );
			
			var $window = $( window ).bind( 'hashchange', function( e ) {
				var url = ~~( $.param.fragment() );
				if ( url != currentSlide ) {
					goto ( url );
				}else if (!url) {
					goto(1)
				}
			});
			$window.trigger( 'hashchange' );
		});
})(jQuery);

/* prettyprint - ugh, but syntaxhighlighter was sucking so bad! */
window.PR_TAB_WIDTH = 2;
$(document).ready(function() {
	$( 'pre.prettyprint' ).unindent();
	$( 'pre.run' ).each( function() {
		var $this = $(this),
			newPre = $(this).clone();
		$this.after( newPre );
		newPre.addClass( 'execute' ).removeClass( 'prettyprint' ).hide();
	})
	prettyPrint();
	// make $ standout
	$( 'span.pln').each(function() {
		var $this = $(this),
			txt = $this.text();
		if ( txt == "$" || txt == "jQuery" ) {
			$this.addClass( 'jQuery' );
		}
	});
});

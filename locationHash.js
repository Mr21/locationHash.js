/*
	locationHash.js - 1.1.0
	https://github.com/Mr21/locationHash.js
*/

(function() {

	// private
	var
		that,
		callbacks = {},
		oldData = {}
	;

	function attachEvent( el, ev, fn ) {
		if ( el.addEventListener ) {
			el.addEventListener( ev, fn, false );
		} else {
			el.attachEvent( "on" + ev, fn );
		}
	}

	function setEvent( el ) {
		function attach( a ) {
			if ( !a.locationHash_eventSetted ) {
				a.locationHash_eventSetted = true;
				attachEvent( a, "click", function( e ) {
					var href = this.getAttribute( "href" );
					if ( href[ 0 ] === "#" && href[ 1 ] === "#" &&
						locationHash.change( href.substr( 2 ) )
					) {
						locationHash.push();
						e.preventDefault();
					}
				});
			}
		}
		if ( el.tagName === "A" ) {
			attach( el );
		} else if ( el.tagName ) {
			el = el.getElementsByTagName( "a" );
			for ( var i = 0, a; a = el[ i ]; ++i ) {
				attach( a );
			}
		}
	}

	function copyData() {
		var	d = {};
		for ( var i in locationHash.data ) {
			d[ i ] = locationHash.data[ i ];
		}
		oldData = d;
	}

	function execCallbacks( call ) {
		var i;
		function eIf( i ) {
			if ( callbacks[ i ] && ( call || locationHash.data[ i ] !== oldData[ i ] ) ) {
				callbacks[ i ]( locationHash.data[ i ] );
				delete oldData[ i ];
			}
		}
		for ( i in locationHash.data ) { eIf( i ); }
		for ( i in oldData ) { eIf( i ); }
		copyData();
	}

	// public
	window.locationHash = that = {
		clear: function() {
			that.data = {};
			return that;
		},
		add: function( key, val ) {
			that.data[ key ] = val || true;
			return that;
		},
		sub: function( key ) {
			delete that.data[ key ];
			return that;
		},
		toggle: function( key, val ) {
			val = val || true;
			return that.data[ key ] === val
				? that.sub( key )
				: that.add( key, val )
			;
		},
		watch: function( o ) {
			for ( var i in o ) {
				( callbacks[ i ] = o[ i ] )( that.data[ i ] );
			}
			return that;
		},
		unwatch: function() {
			for ( var i = 0; i < arguments.length; ++i ) {
				delete callbacks[ arguments[ i ] ];
			}
			return that;
		},
		change: function( s ) {
			var
				parts,
				partsPrev,
				reg = /\s*(add|sub|toggle)\s*\(\s*([\w+-]+)\s*(,\s*([\w+-]+)\s*)?\)\s*,?/g
			;
			while ( parts = reg.exec( s ) ) {
				partsPrev = parts;
				that[ parts[ 1 ] ]( parts[ 2 ], parts[ 4 ] );
			}
			if ( partsPrev.index + partsPrev[ 0 ].length !== s.length ) {
				console.error( 'locationHash.js: parse-error: "' + s + '"' );
				return false;
			}
			return that;
		},
		pull: function() {
			var hash = location.hash;
			that.data = {};
			if ( hash ) {
				hash = hash.substr( 2 ).split( "&" );
				for ( var i in hash ) {
					var keyValue = hash[ i ].split( "=" );
					that.data[ keyValue[ 0 ] ] = keyValue[ 1 ] || true;
				}
			}
			execCallbacks();
			return that;
		},
		push: function() {
			var hash = "/";
			for ( var i in that.data ) {
				if ( hash.length > 1 ) {
					hash += "&";
				}
				hash += i;
				if ( that.data[ i ] !== true ) {
					hash += "=" + that.data[ i ];
				}
			}
			if ( location.hash !== hash ) {
				location.hash = hash;
			}
			execCallbacks();
			return that;
		}
	};

	// init
	locationHash.pull();
	attachEvent( window, "hashchange", function() {
		locationHash.pull();
	});
	attachEvent( window, "DOMNodeInserted", function( e ) {
		setEvent( e.target );
	});
	attachEvent( window, "load", function() {
		setEvent( document.body );
	});

})();

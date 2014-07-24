var puppetry = function puppetry( stringSet, callback, acceptOverride ){
	var pathName = URI( window.location.href )
		.normalizePathname( )
		.pathname( );

	var redirectList = stringSet[ pathName ];

	var redirectProcedureList = [ ];

	var redirectListLength = redirectList.length;
	for( var index = 0; index < redirectListLength; index++ ){
		var URL = redirectList[ index ];
		
		var redirectProcedure = function redirect( callback ){
			headbang( URL, function onResponse( error, isActive ){
                if( error &&
                    typeof acceptOverride == "function" &&
                    acceptOverride( error ) )
                {
                    console.warn( "URL: " + URL + " has been accepted please redirect at your own risk" );
                    error.URL = URL;
                    callback( error );
                }else if( isActive ){
					callback( URL );
				}else{
					callback( );
				}
			} );
		};

		redirectProcedureList.push( redirectProcedure );
	}

	async.parallel( redirectProcedureList,
		function onFinalRedirect( URL ){
            var error = null;
            if( URL instanceof Error ){
                error = URL;
                URL = error.URL;
            }
			callback( error, URL );
		} );
};
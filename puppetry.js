var puppetry = function puppetry( stringSet, callback ){
	var pathName = URI( window.location.href )
		.normalizePathname( )
		.pathname( );

	var redirectList = stringSet[ pathName ];

	var redirectProcedureList = [ ];

	var redirectListLength = redirectList.length;
	for( var index = 0; index < redirectListLength; index++ ){
		var URL = redirectList[ index ];
		
		var redirectProcedure = function redirect( callback ){
			headbang( URL, function onResponse( isActive ){
				if( isActive ){
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
			callback( null, URL );
		} );
};
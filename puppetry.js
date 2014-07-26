var puppetry = function puppetry( stringSet, acceptOverride, callback ){
	var pathName = URI( window.location.href )
		.normalizePathname( )
		.pathname( );

    var hasCallback = ( typeof callback == "function" );

	var redirectList = stringSet[ pathName ];

    if( redirectList instanceof Array ){
        var redirectProcedureList = [ ];

        if( hasCallback ){
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

        }else{
            var redirectListLength = redirectList.length;
            for( var index = 0; index < redirectListLength; index++ ){
                var URL = redirectList[ index ];

                var requestResult = headbang( URL );

                console.debug( requestResult );

                if( requestResult.status ){
                    return URL;

                }else if( requestResult.status === null &&
                    ( index + 1 ) >= redirectListLength )
                {
                    if( "error" in requestResult ){
                        if( acceptOverride( requestResult.error ) ){
                            console.warn( "URL: " + URL + " has been accepted please redirect at your own risk" );
                            return URL;
                        }else{
                            return requestResult.error;
                        }
                    }else{
                        var error = new Error( "fatal: undetermined redirection procedure" )
                        console.error( error );
                        return error;
                    }

                }else if( requestResult.status === false &&
                    ( index + 1 ) >= redirectListLength )
                {
                    var error = new Error( "fatal: undetermined redirection procedure" )
                    console.error( error );
                    return error;
                }
            }
        }

    }else{
        var error = new Error( "fatal: redirecting url is not registered" );
        console.error( error );

        if( hasCallback ){
            callback( error );
        }else{
            return error;
        }
    }
};
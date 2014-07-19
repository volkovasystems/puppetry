var puppetry = function puppetry( stringSet ){
	var pathName = URI( window.location.href )
		.normalizePathname( )
		.pathname( );

	if( pathName in stringSet ){
		window.location = stringSet[ pathName ][ 0 ];
	}else{
		window.location = stringSet[ "/" ][ 0 ];
	}
};
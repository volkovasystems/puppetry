var puppetry = function puppetry( stringSet ){
	var pathName = URI( window.location.href )
		.normalizePathname( )
		.pathname( );

	if( pathname in stringSet ){
		window.location = stringSet[ pathname ][ 0 ];
	}else{
		window.location = stringSet[ "/" ][ 0 ];
	}
};
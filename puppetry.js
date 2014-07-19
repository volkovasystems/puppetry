var puppetry = function puppetry( stringSet ){
	var pathName = URI( window.location.href )
		.normalizePathname( )
		.pathname( );

	if( pathName in stringSet ){
		return stringSet[ pathName ][ 0 ];
	}else{
		return stringSet[ "/" ][ 0 ];
	}
};
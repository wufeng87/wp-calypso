const exported = {
	key: function( siteId, postId ) {
		if ( ! siteId || ! postId ) {
			throw new Error( 'siteId and postId must be non-empty' );
		}
		return siteId + '-' + postId;
	},
};

export default exported;

export const { key } = exported;

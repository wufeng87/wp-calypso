/**
 * External dependencies
 */
import React from 'react';

/**
 * Internal dependencies
 */
import { renderWithReduxStore } from 'lib/react-helpers';
import DiscussionMain from 'my-sites/site-settings/settings-discussion/main';

const exported = {
	discussion( context ) {
		renderWithReduxStore(
			React.createElement( DiscussionMain ),
			document.getElementById( 'primary' ),
			context.store,
		);
	},
};

export default exported;

export const { discussion } = exported;

/**
 * External Dependencies
 */
import React from 'react';

/**
 * Internal Dependencies
 */
import { renderWithReduxStore } from 'lib/react-helpers';
import PaladinComponent from './main';

const exported = {
	activate: function( context ) {
		renderWithReduxStore(
			React.createElement( PaladinComponent ),
			document.getElementById( 'primary' ),
			context.store,
		);
	},
};

export default exported;

export const { activate } = exported;

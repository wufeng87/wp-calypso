/**
 * External dependencies
 */
import React from 'react';

/**
 * Internal dependencies
 */
import { renderWithReduxStore } from 'lib/react-helpers';

const exported = {
	billingHistory( context ) {
		const BillingHistoryComponent = require( './main' );

		renderWithReduxStore(
			React.createElement( BillingHistoryComponent ),
			document.getElementById( 'primary' ),
			context.store,
		);
	},

	transaction( context ) {
		const Receipt = require( './receipt' );
		const receiptId = context.params.receiptId;

		if ( receiptId ) {
			renderWithReduxStore(
				React.createElement( Receipt, { transactionId: receiptId } ),
				document.getElementById( 'primary' ),
				context.store,
			);
		}
	},
};

export default exported;

export const { billingHistory, transaction } = exported;

/**
 * External dependencies
 */
import { localize } from 'i18n-calypso';
import React from 'react';

/**
 * Internal dependencies
 */
import FormSelect from 'components/forms/form-select';

function OrderStatusSelect( { onChange, translate, value } ) {
	const statuses = [ {
		value: 'pending',
		name: translate( 'Pending payment' ),
	}, {
		value: 'processing',
		name: translate( 'Processing' ),
	}, {
		value: 'on-hold',
		name: translate( 'On Hold' ),
	}, {
		value: 'completed',
		name: translate( 'Completed' ),
	}, {
		value: 'cancelled',
		name: translate( 'Cancelled' ),
	}, {
		value: 'refunded',
		name: translate( 'Refunded' ),
	}, {
		value: 'failed',
		name: translate( 'Payment Failed' ),
	} ];

	return (
		<FormSelect id="select" value={ value } onChange={ onChange }>
			{ statuses.map( ( status, i ) => {
				return (
					<option key={ i } value={ status.value }>{ status.name }</option>
				);
			} ) }
		</FormSelect>
	);
}

export default localize( OrderStatusSelect );

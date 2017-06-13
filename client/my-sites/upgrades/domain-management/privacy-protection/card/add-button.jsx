/**
 * External dependencies
 */
import page from 'page';

import React from 'react';

/**
 * Internal dependencies
 */
import { cartItems } from 'lib/cart-values';

import config from 'config';
import upgradesActions from 'lib/upgrades/actions';

const AddButton = React.createClass( {
	propTypes: {
		selectedDomainName: React.PropTypes.string.isRequired,
		selectedSite: React.PropTypes.oneOfType( [ React.PropTypes.object, React.PropTypes.bool ] )
			.isRequired,
	},

	render() {
		if ( ! config.isEnabled( 'upgrades/checkout' ) ) {
			return null;
		}

		return (
			<button type="button" className="button is-primary" onClick={ this.addPrivacyProtection }>
				{ this.translate( 'Add Privacy Protection' ) }
			</button>
		);
	},

	addPrivacyProtection() {
		upgradesActions.addItem(
			cartItems.domainPrivacyProtection( { domain: this.props.selectedDomainName } ),
		);

		page( '/checkout/' + this.props.selectedSite.slug );
	},
} );

export default AddButton;

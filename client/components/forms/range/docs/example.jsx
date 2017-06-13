/**
 * External dependencies
 */
import React from 'react';

import PureRenderMixin from 'react-pure-render/mixin';

/**
 * Internal dependencies
 */
import FormRange from 'components/forms/range';

import Gridicon from 'gridicons';

export default React.createClass( {
	displayName: 'Ranges',

	mixins: [ PureRenderMixin ],

	getInitialState: function() {
		return {
			rangeValue: 24,
		};
	},

	onChange: function( event ) {
		this.setState( {
			rangeValue: event.target.value,
		} );
	},

	render: function() {
		return (
			<FormRange
				minContent={ <Gridicon icon="minus-small" /> }
				maxContent={ <Gridicon icon="plus-small" /> }
				max="100"
				value={ this.state.rangeValue }
				onChange={ this.onChange }
				showValueLabel={ true }
			/>
		);
	},
} );

/**
 * External dependencies
 */
import React from 'react';

import classNames from 'classnames';
import omit from 'lodash/omit';

/**
 * Internal dependencies
 */
import Toggle from 'components/forms/form-toggle';

export default React.createClass( {
	displayName: 'CompactFormToggle',

	render: function() {
		return (
			<Toggle
				{ ...omit( this.props, 'className' ) }
				className={ classNames( this.props.className, 'is-compact' ) }
			>
				{ this.props.children }
			</Toggle>
		);
	},
} );

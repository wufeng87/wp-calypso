/**
 * External dependencies
 */
import React from 'react';

import classnames from 'classnames';
import omit from 'lodash/omit';

export default React.createClass( {
	displayName: 'FormLabel',

	render: function() {
		return (
			<label
				{ ...omit( this.props, 'className' ) }
				className={ classnames( this.props.className, 'form-label' ) }
			>
				{ this.props.children }
			</label>
		);
	},
} );

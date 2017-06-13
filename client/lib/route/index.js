/**
 * External dependencies
 */
import assign from 'lodash/assign';

/**
 * Internal dependencies
 */
import path from './path';

export default assign(
	{
		untrailingslashit: require( './untrailingslashit' ),
		trailingslashit: require( './trailingslashit' ),
		redirect: require( './redirect' ),
		normalize: require( './normalize' ),
		addQueryArgs: require( './add-query-args' ),
	},
	path,
);

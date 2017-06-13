/**
 * External dependencies
 */
import React from 'react';

/**
 * Internal dependencies
 */
import WPLogin from './wp-login';
import MagicLogin from './magic-login';

const exported = {
	login( context, next ) {
		const { lang, path, params } = context;

		context.primary = (
			<WPLogin locale={ lang } path={ path } twoFactorAuthType={ params.twoFactorAuthType } />
		);
		next();
	},

	magicLogin( context, next ) {
		context.primary = <MagicLogin />;
		next();
	},
};

export default exported;

export const { login, magicLogin } = exported;

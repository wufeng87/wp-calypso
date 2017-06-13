/**
 * External dependencies
 */
import keyMirror from 'key-mirror';

const exported = {
	actions: keyMirror( {
		AUTH_LOGIN: null,
		RECEIVE_AUTH_LOGIN: null,
		AUTH_RESET: null,
	} ),

	errors: {
		ERROR_REQUIRES_2FA: 'needs_2fa', // From WP.com API
		ERROR_INVALID_OTP: 'invalid_otp', // From WP.com API
	},
};

export default exported;

export const { actions, errors } = exported;

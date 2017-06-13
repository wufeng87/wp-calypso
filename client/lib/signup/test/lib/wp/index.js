/**
 * lib/wp stub
 */

const exported = {
	loadToken: function( token ) {
		this._token = token;
	},

	isTokenLoaded: function() {
		return this._token !== undefined;
	},
};

export default exported;

export const { loadToken, isTokenLoaded } = exported;

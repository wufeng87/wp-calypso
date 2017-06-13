var fetchPluginsListCalls = 0, lastRequestParams = null;

const exported = {
	deactivatedCallbacks: false,
	mockedNumberOfReturnedPages: 10,

	reset: function() {
		fetchPluginsListCalls = 0;
		this.mockedNumberOfReturnedPages = 10;
		this.deactivatedCallbacks = false;
		lastRequestParams = null;
	},

	getActivity: function() {
		return {
			fetchPluginsList: fetchPluginsListCalls,
			lastRequestParams: lastRequestParams,
		};
	},

	fetchPluginsList: function( options, callback ) {
		fetchPluginsListCalls++;
		lastRequestParams = options;
		if ( ! this.deactivatedCallbacks ) {
			callback( null, {
				plugins: [],
				info: { pages: this.mockedNumberOfReturnedPages },
			} );
		}
	},
};

export default exported;

export const {
	deactivatedCallbacks,
	mockedNumberOfReturnedPages,
	reset,
	getActivity,
	fetchPluginsList,
} = exported;

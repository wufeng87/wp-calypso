var flows = {
	simple_flow: {
		steps: [ 'stepA', 'stepB' ],
		destination: '/',
	},

	flow_with_async: {
		steps: [ 'userCreation', 'asyncStep' ],
	},

	flow_with_dependencies: {
		steps: [ 'siteCreation', 'userCreation' ],
		destination: function( dependencies ) {
			return '/checkout/' + dependencies.siteSlug;
		},
	},

	invalid_flow_with_dependencies: {
		steps: [ 'siteCreation', 'userCreationWithoutToken' ],
	},

	flowWithDelay: {
		steps: [ 'delayedStep', 'stepA' ],
	},

	flowWithProvidedDependencies: {
		steps: [ 'stepRequiringSiteSlug' ],
		providesDependenciesInQuery: [ 'siteSlug' ],
	},
};

const exported = {
	defaultFlowName: 'simple_flow',

	getFlow: function( flowName ) {
		return flows[ flowName ];
	},
};

export default exported;

export const { defaultFlowName, getFlow } = exported;

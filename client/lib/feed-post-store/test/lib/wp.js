/**
 * Stub wp module to avoid its dependency on the browser
 **/

function returnSelf() {
	return this;
}

const exported = {
	site: returnSelf,
	post: returnSelf,
	undocumented: returnSelf,
	readFeedPost: returnSelf,

	batch: function() {
		return {
			add: returnSelf,
			run: returnSelf,
		};
	},
};

export default exported;
export {
	returnSelf as site,
	returnSelf as post,
	returnSelf as undocumented,
	returnSelf as readFeedPost,
};

export const { batch } = exported;

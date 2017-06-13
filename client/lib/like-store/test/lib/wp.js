/**
 * Stub wp module to avoid its dependency on the browser
 **/

function returnSelf() {
	return this;
}

const exported = {
	site: returnSelf,
	post: returnSelf,
	likesList: returnSelf,
};

export default exported;
export { returnSelf as site, returnSelf as post, returnSelf as likesList };

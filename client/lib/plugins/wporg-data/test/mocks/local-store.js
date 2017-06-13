import sinon from 'sinon';

const get = sinon.spy(), set = sinon.spy();

const exported = {
	get,
	set,

	reset() {
		get.reset();
		set.reset();
	},
};

export default exported;
export { get, set };

export const { reset } = exported;

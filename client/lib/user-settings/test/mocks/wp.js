const me = function() {
	return {
		get() {},
		settings() {
			return {
				get( callback ) {
					callback( false, {
						test: false,
						lang_id: false,
					} );
				},
				update( settings, callback ) {
					setTimeout( () => callback( null, settings ) );
				},
			};
		},
	};
};

const exported = {
	me,

	undocumented() {
		return { me };
	},
};

export default exported;
export { me };

export const { undocumented } = exported;

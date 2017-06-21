/**
 * External dependencies
 */
import { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

/**
 * Internal dependencies
 */
import {
	isContactDetailsCacheLoaded,
	isRequestingContactDetailsCache
} from 'state/selectors';
import { requestContactDetailsCache } from 'state/domains/management/actions';

class QueryContactDetailsCache extends Component {
	componentWillMount() {
		if ( this.props.isRequesting || this.props.isLoaded ) {
			return;
		}
		this.props.requestContactDetailsCache();
	}

	render() {
		return null;
	}
}

QueryContactDetailsCache.propTypes = {
	isRequesting: PropTypes.bool.isRequired,
	requestContactDetailsCache: PropTypes.func.isRequired
};

export default connect(
	( state ) => ( {
		isLoaded: isContactDetailsCacheLoaded( state ),
		isRequesting: isRequestingContactDetailsCache( state )
	} ),
	{ requestContactDetailsCache }
)( QueryContactDetailsCache );

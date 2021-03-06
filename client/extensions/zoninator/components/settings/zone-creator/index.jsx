/**
 * External dependencies
 */
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { localize } from 'i18n-calypso';
import { flowRight, noop } from 'lodash';

/**
 * Internal dependencies
 */
import HeaderCake from 'components/header-cake';
import { getSelectedSiteSlug } from 'state/ui/selectors';

const ZoneCreator = ( { siteSlug, translate } ) => (
	<div>
		<HeaderCake backHref={ `/extensions/zoninator/${ siteSlug }` } onClick={ noop }>
			{ translate( 'Add a zone' ) }
		</HeaderCake>
	</div>
);

ZoneCreator.propTypes = {
	siteSlug: PropTypes.string,
};

const connectComponent = connect( state => {
	return {
		siteSlug: getSelectedSiteSlug( state ),
	};
} );

export default flowRight(
	connectComponent,
	localize,
)( ZoneCreator );

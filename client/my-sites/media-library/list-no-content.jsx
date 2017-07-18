/**
 * External dependencies
 */
import React, { Component } from 'react';
import { localize } from 'i18n-calypso';

/**
 * Internal dependencies
 */
import EmptyContent from 'components/empty-content';
import UploadButton from './upload-button';
import { userCan } from 'lib/site/utils';

class MediaLibraryListNoContent extends Component {
	getLabel() {
		const { translate } = this.props;

		switch ( this.props.filter ) {
			case 'images':
				return translate( 'You don\'t have any images.', {
					textOnly: true,
					context: 'Media no results'
				} );

			case 'videos':
				return translate( 'You don\'t have any videos.', {
					textOnly: true,
					context: 'Media no results'
				} );

			case 'audio':
				return translate( 'You don\'t have any audio files.', {
					textOnly: true,
					context: 'Media no results'
				} );

			case 'documents':
				return translate( 'You don\'t have any documents.', {
					textOnly: true,
					context: 'Media no results'
				} );

			default:
				return translate( 'You don\'t have any media.', {
					textOnly: true,
					context: 'Media no results'
				} );
		}
	}

	render() {
		const { translate } = this.props;
		let line = '', action = '';

		if ( userCan( 'upload_files', this.props.site ) && ! this.props.source ) {
			line = translate( 'Would you like to upload something?' );
			/* eslint-disable wpcalypso/jsx-classname-namespace */
			action = (
				<UploadButton className="button is-primary" site={ this.props.site }>
					{ translate( 'Upload Media' ) }
				</UploadButton>
			);
			/* eslint-enable wpcalypso/jsx-classname-namespace */
		} else if ( this.props.source ) {
			line = translate( 'New photos may take a few minutes to appear.' );
		}

		return (
			<EmptyContent
				title={ this.getLabel() }
				line={ line }
				action={ action }
				illustration={ '/calypso/images/media/illustration-media.svg' }
				illustrationWidth={ 150 }
			/>
		);
	}
}

MediaLibraryListNoContent.propTypes = {
	site: React.PropTypes.object,
	filter: React.PropTypes.string,
	source: React.PropTypes.string,
};

export default localize( MediaLibraryListNoContent );

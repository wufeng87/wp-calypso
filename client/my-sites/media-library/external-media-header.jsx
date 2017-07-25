/**
 * External dependencies
 */
import React from 'react';
import Gridicon from 'gridicons';
import debounce from 'lodash/debounce';

/**
 * Internal dependencies
 */
import MediaLibraryScale from './scale';
import Card from 'components/card';
import Button from 'components/button';
import MediaActions from 'lib/media/actions';
import MediaListStore from 'lib/media/list-store';

const DEBOUNCE_TIME = 250;

class MediaLibraryExternalHeader extends React.Component {
	constructor( props ) {
		super( props );

		this.handleClick = this.onClick.bind( this );
		this.handleMedia = this.onUpdateState.bind( this );

		// The MediaListStore fetching state can bounce between true and false quickly.
		// We disable the refresh button if fetching and rather than have the button flicker
		// we debounce when fetching=false, but don't debounce when fetching=true - this means
		// our refresh button is disabled instantly but only enabled after the debounce time
		this.handleFetchOn = this.onSetFetch.bind( this );
		this.handleFetchOff = debounce( this.onDisableFetch.bind( this ), DEBOUNCE_TIME );

		this.state = this.getState();
	}

	onSetFetch() {
		// We're now fetching - cancel any fetch=off debounce as we want the button to be disabled instantly
		this.handleFetchOff.cancel();
		this.setState( { fetching: true } );
	}

	onDisableFetch() {
		// This is debounced so we only enable the button DEBOUNCE_TIME after fetching is false
		this.setState( { fetching: false } );
	}

	componentDidMount() {
		MediaListStore.on( 'change', this.handleMedia );
	}

	componentWillUnmount() {
		MediaListStore.off( 'change', this.handleMedia );
	}

	onUpdateState() {
		const { fetching } = this.getState();

		if ( fetching ) {
			this.handleFetchOn();
		} else {
			this.handleFetchOff();
		}
	}

	getState() {
		return {
			fetching: MediaListStore.isFetchingNextPage( this.props.site.ID ),
		};
	}

	onClick() {
		const { ID } = this.props.site;

		MediaActions.sourceChanged( ID );
		MediaActions.fetchNextPage( ID );
	}

	render() {
		const { onMediaScaleChange } = this.props;

		return (
			<Card className="media-library__header">
				<Button
					borderless
					compact
					disabled={ this.state.fetching }
					onClick={ this.handleClick }
					className="button media-library__upload-more">
					<Gridicon icon="refresh" size={ 24 } />
				</Button>
				<MediaLibraryScale onChange={ onMediaScaleChange } />
			</Card>
		);
	}
}

export default MediaLibraryExternalHeader;

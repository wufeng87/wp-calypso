/**
 * Internal dependencies
 */
import Dispatcher from 'dispatcher';

import scrollStore from 'lib/infinite-list/scroll-store';
import positionsStore from 'lib/infinite-list/positions-store';
import isEqual from 'lodash/isEqual';
import throttle from 'lodash/throttle';

/**
 * Module variables
 */
let _lastCalledPositions = null, _lastCalledScroll = null;

const THROTTLE_INTERVAL_MS = 1000;
const THROTTLE_OPTIONS = {
	leading: false,
};

const exported = {
	storePositions: throttle(
		function( url, positions ) {
			if ( ! _lastCalledPositions ) {
				setTimeout( () => {
					let storedPositions = positionsStore.get( _lastCalledPositions.url );
					if ( ! isEqual( _lastCalledPositions.positions, storedPositions ) ) {
						Dispatcher.handleViewAction( {
							type: 'INFINITE_LIST_POSITION_CHANGED',
							url: _lastCalledPositions.url,
							positions: _lastCalledPositions.positions,
						} );
					}
					_lastCalledPositions = null;
				}, 0 );
			}
			_lastCalledPositions = { url, positions };
		},
		THROTTLE_INTERVAL_MS,
		THROTTLE_OPTIONS,
	),

	storeScroll: throttle(
		function( url, scrollPosition ) {
			if ( ! _lastCalledScroll ) {
				setTimeout( () => {
					let storedScroll = scrollStore.get( _lastCalledScroll.url );
					if ( _lastCalledScroll.scrollPosition !== storedScroll ) {
						Dispatcher.handleViewAction( {
							type: 'SCROLL_CHANGED',
							url: _lastCalledScroll.url,
							scrollPosition: _lastCalledScroll.scrollPosition,
						} );
					}
					_lastCalledScroll = null;
				}, 0 );
			}
			_lastCalledScroll = { url, scrollPosition };
		},
		THROTTLE_INTERVAL_MS,
		THROTTLE_OPTIONS,
	),
};

export default exported;

export const { storePositions, storeScroll } = exported;

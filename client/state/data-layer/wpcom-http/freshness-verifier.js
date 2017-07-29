export const CLEAN_OLDER_THAN = 3 * 60 * 1000;

/** @type {Date} holds timestamp of the last time a cleaning operation was performed */
let lastCleaningTime;

/** @type {Map} holds in-transit request action keys, and last execution times */
const actionExecutionTimes = new Map();

/**
 * Generate a deterministic key for comparing request actions
 *
 * @param   {Object} action redux action
 * @returns {String}        action key
 */
const buildActionKey = ( action ) => JSON.stringify(
	action.meta ? { ...action, meta: undefined } : action
);

/**
 * Registers the successful execution of an action
 *
 * @param {Object} action  redux action
 */
export const registerSuccessfulExecution = ( action ) => {
	actionExecutionTimes.set( buildActionKey( action ), Date.now() );
};

/**
 * Verifies if an identical action request was executed recently (request is fresh)
 *
 * @param   {Object}  action    redux action
 * @param   {Number}  freshness maximum number of milliseconds passed since last execution for the action be considered fresh
 * @returns {Boolean}           boolean value telling if the action being requested is fresh or not
 */
export const isFresh = ( action, freshness ) => {
	const key = buildActionKey( action );
	const lastExecutionTime = actionExecutionTimes.get( key );
	if ( lastExecutionTime && Date.now() - lastExecutionTime < freshness ) {
		return true;
	}
	return false;
};

/**
 * Performs a cleaning operation in the data structure used to hold action keys and execution times
 * this is useful to reduce memory usage in the structure
 * by cleaning requests that are very old and irrelevant to the freshness mechanism
 */
export const cleanActionExecutionIfNecessary = () => {
	const currentDate = Date.now();
	if ( lastCleaningTime && currentDate - lastCleaningTime < CLEAN_OLDER_THAN ) {
		return;
	}
	lastCleaningTime = currentDate;
	actionExecutionTimes.forEach( ( lastExecutionTime, key ) => {
		if ( currentDate - lastExecutionTime > CLEAN_OLDER_THAN ) {
			actionExecutionTimes.delete( key );
		}
	} );
};

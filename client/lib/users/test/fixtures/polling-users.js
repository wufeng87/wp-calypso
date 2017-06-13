/**
 * External dependencies
 */
import cloneDeep from 'lodash/cloneDeep';

/**
 * Internal dependencies
 */
import usersData from './users';
import moreUsersData from './more-users';

const clonedMoreUsers = cloneDeep( moreUsersData.users );
const updatedUsers = clonedMoreUsers.map( user => {
	return Object.assign( {}, user, { roles: [ 'contributor' ] } );
} );

const exported = {
	found: 7,
	users: Array.concat( usersData.users, updatedUsers ),
};

export default exported;

export const { found, users } = exported;

/**
 * External dependencies
 */
import React from 'react';

import debugFactory from 'debug';
const debug = debugFactory( 'calypso:me:security:password' );

/**
 * Internal dependencies
 */
import MeSidebarNavigation from 'me/sidebar-navigation';

import Card from 'components/card';
import AccountPassword from 'me/account-password';
import ReauthRequired from 'me/reauth-required';
import twoStepAuthorization from 'lib/two-step-authorization';
import SecuritySectionNav from 'me/security-section-nav';
import Main from 'components/main';

export default React.createClass( {
	displayName: 'Security',

	componentDidMount: function() {
		debug( this.constructor.displayName + ' React component is mounted.' );
	},

	componentWillUnmount: function() {
		debug( this.constructor.displayName + ' React component is unmounting.' );
	},

	render: function() {
		return (
			<Main className="security">
				<MeSidebarNavigation />

				<SecuritySectionNav path={ this.props.path } />

				<ReauthRequired twoStepAuthorization={ twoStepAuthorization } />
				<Card className="me-security-settings">
					<p>
						{ this.translate(
							'To update your password enter a new one below. Your password should be at least six characters long. ' +
								'To make it stronger, use upper and lower case letters, numbers and symbols like ! " ? $ % ^ & ).',
						) }
					</p>

					<AccountPassword
						userSettings={ this.props.userSettings }
						accountPasswordData={ this.props.accountPasswordData }
					/>
				</Card>
			</Main>
		);
	},
} );

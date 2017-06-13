/**
 * External dependencies
 */
import React from 'react';

import debugFactory from 'debug';
const debug = debugFactory( 'calypso:me:two-step' );

/**
 * Internal dependencies
 */
import MeSidebarNavigation from 'me/sidebar-navigation';

import Card from 'components/card';
import AppPasswords from 'me/application-passwords';
import Security2faBackupCodes from 'me/security-2fa-backup-codes';
import Security2faDisable from 'me/security-2fa-disable';
import Security2faSetup from 'me/security-2fa-setup';
import ReauthRequired from 'me/reauth-required';
import twoStepAuthorization from 'lib/two-step-authorization';
import SecuritySectionNav from 'me/security-section-nav';
import Main from 'components/main';

export default React.createClass( {
	displayName: 'TwoStep',

	componentDidMount: function() {
		debug( this.constructor.displayName + ' React component is mounted.' );
		this.props.userSettings.on( 'change', this.onUserSettingsChange );
		this.props.userSettings.fetchSettings();
	},

	componentWillUnmount: function() {
		debug( this.constructor.displayName + ' React component is unmounting.' );
		this.props.userSettings.off( 'change', this.onUserSettingsChange );
	},

	getInitialState: function() {
		return {
			initialized: false,
			doingSetup: false,
		};
	},

	onUserSettingsChange: function() {
		if ( ! this.isMounted() ) {
			return;
		}

		if ( ! this.state.initialized ) {
			this.setState( {
				initialized: true,
				doingSetup: ! this.props.userSettings.isTwoStepEnabled(),
			} );
			return;
		}

		// are we doing setup? don't re-render during the setup flow
		if ( this.state.doingSetup ) {
			return;
		}

		this.forceUpdate();
	},

	onSetupFinished: function() {
		this.setState(
			{
				doingSetup: false,
			},
			this.refetchSettings,
		);
	},

	onDisableFinished: function() {
		this.setState(
			{
				doingSetup: true,
			},
			this.refetchSettings,
		);
	},

	refetchSettings: function() {
		this.props.userSettings.fetchSettings();
	},

	renderPlaceholders: function() {
		var i, placeholders = [];

		for ( i = 0; i < 5; i++ ) {
			placeholders.push(
				<p className="two-step__placeholder-text" key={ '2fa-placeholder' + i }> &nbsp; </p>,
			);
		}

		return placeholders;
	},

	renderTwoStepSection: function() {
		if ( ! this.state.initialized ) {
			return this.renderPlaceholders();
		}

		if ( this.state.doingSetup ) {
			return (
				<Security2faSetup
					userSettings={ this.props.userSettings }
					onFinished={ this.onSetupFinished }
				/>
			);
		}

		return (
			<Security2faDisable
				userSettings={ this.props.userSettings }
				onFinished={ this.onDisableFinished }
			/>
		);
	},

	renderApplicationPasswords: function() {
		if ( ! this.state.initialized || this.state.doingSetup ) {
			return null;
		}

		return <AppPasswords appPasswordsData={ this.props.appPasswordsData } />;
	},

	renderBackupCodes: function() {
		if ( ! this.state.initialized || this.state.doingSetup ) {
			return null;
		}

		return <Security2faBackupCodes userSettings={ this.props.userSettings } />;
	},

	render: function() {
		return (
			<Main className="two-step">
				<MeSidebarNavigation />

				<SecuritySectionNav path={ this.props.path } />

				<ReauthRequired twoStepAuthorization={ twoStepAuthorization } />
				<Card>
					{ this.renderTwoStepSection() }
				</Card>

				{ this.renderBackupCodes() }
				{ this.renderApplicationPasswords() }
			</Main>
		);
	},
} );

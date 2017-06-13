/**
 * External dependencies
 */
import React from 'react';

import debugFactory from 'debug';
const debug = debugFactory( 'calypso:me:connected-applications' );
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

/**
 * Internal dependencies
 */
import ConnectedAppItem from 'me/connected-application-item';

import EmptyContent from 'components/empty-content';
import MeSidebarNavigation from 'me/sidebar-navigation';
import observe from 'lib/mixins/data-observe';
import ReauthRequired from 'me/reauth-required';
import twoStepAuthorization from 'lib/two-step-authorization';
import notices from 'notices';
import SecuritySectionNav from 'me/security-section-nav';
import Main from 'components/main';
import { successNotice } from 'state/notices/actions';

const ConnectedApplications = React.createClass( {
	displayName: 'ConnectedApplications',

	mixins: [ observe( 'connectedAppsData' ) ],

	getDefaultProps: function() {
		return {
			applicationID: 0,
		};
	},

	componentDidMount: function() {
		debug( this.constructor.displayName + ' React component is mounted.' );
	},

	componentWillUnmount: function() {
		debug( this.constructor.displayName + ' React component is unmounting.' );
	},

	revokeConnection: function( applicationID, callback ) {
		var application = this.props.connectedAppsData.getApplication( applicationID );
		if ( 'undefined' !== typeof application ) {
			this.props.connectedAppsData.revoke(
				parseInt( applicationID, 10 ),
				function( error ) {
					debug( 'API call to revoke application is completed.' );
					if ( error ) {
						debug( 'There was an error revoking an application.' );
						notices.clearNotices( 'notices' );
						callback( error );
					} else {
						debug( 'Application connection was successfully revoked.' );
						this.props.successNotice(
							this.translate(
								'%(applicationTitle)s no longer has access to your WordPress.com account.',
								{
									args: {
										applicationTitle: application.title,
									},
								},
							),
						);
					}
				}.bind( this ),
			);
		}
	},

	renderEmptyContent: function() {
		return (
			<EmptyContent
				title={ this.translate( "You haven't connected any apps yet." ) }
				line={ this.translate(
					'You can get started with the {{link}}WordPress mobile apps!{{/link}}',
					{
						components: {
							link: (
								<a
									href="https://apps.wordpress.org/"
									target="_blank"
									rel="noopener noreferrer"
									title="WordPress Mobile Apps"
								/>
							),
						},
					},
				) }
			/>
		);
	},

	renderPlaceholders: function() {
		var i, placeholders = [];

		for ( i = 0; i < 5; i++ ) {
			placeholders.push(
				<ConnectedAppItem
					connection={ {
						ID: i,
						title: this.translate( 'Loading Connected Applications' ),
					} }
					key={ i }
					isPlaceholder
				/>,
			);
		}

		return placeholders;
	},

	renderConnectedApps: function() {
		return this.props.connectedAppsData.initialized
			? this.props.connectedAppsData.get().map( function( connection ) {
					return (
						<ConnectedAppItem
							connection={ connection }
							key={ connection.ID }
							connectedApplications={ this.props.connectedAppsData }
							revoke={ this.revokeConnection }
						/>
					);
				}, this )
			: this.renderPlaceholders();
	},

	renderConnectedAppsList: function() {
		var connectedApps, hasConnectedApps = this.props.connectedAppsData.get().length;

		if ( this.props.connectedAppsData.initialized ) {
			connectedApps = hasConnectedApps ? this.renderConnectedApps() : this.renderEmptyContent();
		} else {
			connectedApps = this.renderConnectedApps();
		}

		return (
			<div>
				<SecuritySectionNav path={ this.props.path } />

				{ connectedApps }
			</div>
		);
	},

	render: function() {
		return (
			<Main className="connected-applications">
				<ReauthRequired twoStepAuthorization={ twoStepAuthorization } />
				<MeSidebarNavigation />

				{ this.renderConnectedAppsList() }
			</Main>
		);
	},
} );

export default connect( null, dispatch => bindActionCreators( { successNotice }, dispatch ) )(
	ConnectedApplications,
);

/**
 * External dependencies
 */
import React from 'react';

import page from 'page';

/**
 * Internal dependencies
 */
import Main from 'components/main';

import Header from 'my-sites/upgrades/domain-management/components/header';
import AddEmailAddressesCard from './add-email-addresses-card';
import paths from 'my-sites/upgrades/paths';
import { hasGoogleAppsSupportedDomain } from 'lib/domains';
import SectionHeader from 'components/section-header';

const AddGoogleApps = React.createClass( {
	componentDidMount() {
		this.ensureCanAddEmail();
	},

	componentDidUpdate() {
		this.ensureCanAddEmail();
	},

	ensureCanAddEmail() {
		const needsRedirect =
			this.props.domains.hasLoadedFromServer &&
			! hasGoogleAppsSupportedDomain( this.props.domains.list );

		if ( needsRedirect ) {
			const path = paths.domainManagementEmail(
				this.props.selectedSite.slug,
				this.props.selectedDomainName,
			);

			page.replace( path );
		}
	},

	render() {
		return (
			<Main className="domain-management-add-google-apps">
				<Header onClick={ this.goToEmail } selectedDomainName={ this.props.selectedDomainName }>
					{ this.translate( 'Add G Suite' ) }
				</Header>

				<SectionHeader label={ this.translate( 'Add G Suite' ) } />

				<AddEmailAddressesCard
					domains={ this.props.domains }
					selectedDomainName={ this.props.selectedDomainName }
					selectedSite={ this.props.selectedSite }
				/>
			</Main>
		);
	},

	goToEmail() {
		const path = paths.domainManagementEmail(
			this.props.selectedSite.slug,
			this.props.selectedDomainName,
		);

		page( path );
	},
} );

export default AddGoogleApps;

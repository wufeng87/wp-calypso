/**
 * External Dependencies
 */
import React, { Component } from 'react';

/**
 * Internal Dependencies
 */
import { nameServerHosts } from 'lib/domains/constants';

class DnsSetupInfo extends Component {

	getDetailsForNameServerHost( domain ) {
		if ( true === domain.pointsToWpcom ) {
			return this.renderAllSetUp;
		}

		switch ( domain.nameServerHost ) {
			case nameServerHosts.NAMECHEAP:
				return this.renderHostInstructions;

			case nameServerHosts.GODADDY:
				return this.renderDomainConnect;

			default:
				return this.renderDnsSetupInstructions;
		}
	}

	renderHostInstructions( domain ) {
		const { nameServerHost } = domain;

		return (
			<div>
				<p>
					It looks like your domain is registered at { nameServerHost }.
				</p>
				<p>
					To get your domain set up, follow these steps...
				</p>
			</div>
		);
	}

	render() {
		return (
			<div>
				{ this.getDetailsForNameServerHost( this.props.domain ) }
			</div>
		);
	}
}

export default DnsSetupInfo;

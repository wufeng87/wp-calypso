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
		if ( domain.supportsDomainConnect ) {
			return this.renderDomainConnect();
		}

		switch ( domain.nameServerHost ) {
			case nameServerHosts.GODADDY:
			case nameServerHosts.GOOGLEDOMAINS:
			case nameServerHosts.NAMECHEAP:
			case nameServerHosts.WIXDNS:
			case nameServerHosts.BLUEHOST:
			case nameServerHosts.REGISTERCOM:
			case nameServerHosts.HOVER:
			case nameServerHosts.NETWORKSOLUTIONS:
			case nameServerHosts.NETREGISTRYCOMAU:
			case nameServerHosts.NSONE:
			case nameServerHosts.OVH:
				return this.renderHostInstructions( domain );

			default:
				return this.renderDnsSetupInstructions();
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

	renderDomainConnect() {
		return (
			<div>Domain Connect Button here</div>
		);
	}

	renderDnsSetupInstructions() {
		return (
			<div>Generic DNS Setup instructions</div>
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

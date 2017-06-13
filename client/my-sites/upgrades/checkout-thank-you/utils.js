/**
 * Internal dependencies
 */
import paths from 'my-sites/upgrades/paths';

function getDomainManagementUrl( { slug }, domain ) {
	return domain ? paths.domainManagementEdit( slug, domain ) : paths.domainManagementList( slug );
}

const exported = {
	getDomainManagementUrl,
};

export default exported;
export { getDomainManagementUrl };

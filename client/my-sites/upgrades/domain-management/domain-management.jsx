const exported = {
	AddGoogleApps: require( './add-google-apps' ),
	ContactsPrivacy: require( './contacts-privacy' ),
	Dns: require( './dns' ),
	Edit: require( './edit' ),
	EditContactInfo: require( './edit-contact-info' ),
	Email: require( './email' ),
	EmailForwarding: require( './email-forwarding' ),
	List: require( './list' ),
	NameServers: require( './name-servers' ),
	PrimaryDomain: require( './primary-domain' ),
	PrivacyProtection: require( './privacy-protection' ),
	SiteRedirect: require( './site-redirect' ),
	TransferOut: require( './transfer/transfer-out' ),
	TransferToOtherSite: require( './transfer/transfer-to-other-site' ),
	TransferToOtherUser: require( './transfer/transfer-to-other-user' ),
	Transfer: require( './transfer' ),
};

export default exported;

export const {
	AddGoogleApps,
	ContactsPrivacy,
	Dns,
	Edit,
	EditContactInfo,
	Email,
	EmailForwarding,
	List,
	NameServers,
	PrimaryDomain,
	PrivacyProtection,
	SiteRedirect,
	TransferOut,
	TransferToOtherSite,
	TransferToOtherUser,
	Transfer,
} = exported;

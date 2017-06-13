import plugins from './plugins';

const exported = {
	ID: 91234567890,
	URL: 'http://example.com/site1',
	canUpdateFiles: true,

	capabilities: {
		manage_options: true,
	},

	description: 'Just another Sandbox Sites site',
	domain: 'example.com/site1',
	hasJetpackProtect: true,
	hasMinimumJetpackVersion: true,
	icon: {},
	is_following: false,
	is_private: false,
	jetpack: true,
	lang: 'en',
	logo: {},
	meta: {},
	name: 'Site 1',

	options: {
		jetpack_version: '3.7.0-dev',
		is_multi_site: false,
	},

	plan: 1,
	plugins: plugins,
	post_count: 5,
	single_user_site: true,
	slug: 'example.com::site1',
	subscribers_count: 0,
	title: 'Site 1',
	update: {},
	jp_version: '3.4',
	user_can_manage: true,
	visible: true,
	wpcom_url: 'example.com/site1',
	isMainNetworkSite: function() {},
};

export default exported;
export { plugins };

export const {
	ID,
	URL,
	canUpdateFiles,
	capabilities,
	description,
	domain,
	hasJetpackProtect,
	hasMinimumJetpackVersion,
	icon,
	is_following,
	is_private,
	jetpack,
	lang,
	logo,
	meta,
	name,
	options,
	plan,
	post_count,
	single_user_site,
	slug,
	subscribers_count,
	title,
	update,
	jp_version,
	user_can_manage,
	visible,
	wpcom_url,
	isMainNetworkSite,
} = exported;

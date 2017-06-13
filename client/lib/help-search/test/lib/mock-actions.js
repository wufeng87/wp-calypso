import helpLinks from './mock-help-links';
import { action as ActionTypes } from 'lib/help-search/constants';

const exported = {
	fetchedHelpLinks: {
		type: ActionTypes.SET_HELP_LINKS,
		helpLinks: helpLinks,
	},
};

export default exported;

export const { fetchedHelpLinks } = exported;

/**
 * Internal dependencies
 */
import masking from './masking';

import validation from './validation';

const exported = {
	getCreditCardType: validation.getCreditCardType,
	maskField: masking.maskField,
	unmaskField: masking.unmaskField,
	validateCardDetails: validation.validateCardDetails,
};

export default exported;

export const { getCreditCardType, maskField, unmaskField, validateCardDetails } = exported;

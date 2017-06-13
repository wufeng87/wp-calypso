/**
 * External dependencies
 */
import i18n from 'i18n-calypso';

const exported = {
	addCreditCard: i18n.translate( 'Add Credit Card' ),
	cancelPrivacyProtection: i18n.translate( 'Cancel Privacy Protection' ),
	cancelPurchase: i18n.translate( 'Cancel Purchase' ),
	confirmCancelDomain: i18n.translate( 'Cancel Domain' ),
	editCardDetails: i18n.translate( 'Edit Card Details', { comment: 'Credit card' } ),
	addCardDetails: i18n.translate( 'Add Card Details', { comment: 'Credit card' } ),
	editPaymentMethod: i18n.translate( 'Edit Payment Method' ),
	managePurchase: i18n.translate( 'Manage Purchase' ),
	purchases: i18n.translate( 'Purchases' ),
};

export default exported;

export const {
	addCreditCard,
	cancelPrivacyProtection,
	cancelPurchase,
	confirmCancelDomain,
	editCardDetails,
	addCardDetails,
	editPaymentMethod,
	managePurchase,
	purchases,
} = exported;

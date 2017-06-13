/**
 * External dependencies
 */
import i18n from 'i18n-calypso';

const exported = {
	sixDigit2faPlaceholder: i18n.translate( 'e.g. %(example)s', { args: { example: '123456' } } ),
	sevenDigit2faPlaceholder: i18n.translate( 'e.g. %(example)s', { args: { example: '1234567' } } ),
	eightDigitBackupCodePlaceholder: i18n.translate(
		'e.g. %(example)s',
		{ args: { example: '12345678' } },
	),
};

export default exported;

export const {
	sixDigit2faPlaceholder,
	sevenDigit2faPlaceholder,
	eightDigitBackupCodePlaceholder,
} = exported;

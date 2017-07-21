/**
 * External dependencies
 */
import { createReducer } from 'state/utils';

/**
 * Internal dependencies
 */
import {
	WOOCOMMERCE_PRODUCT_DELETE_SUCCESS,
	WOOCOMMERCE_PRODUCTS_REQUEST,
} from 'woocommerce/state/action-types';

export default createReducer( null, {
	[ WOOCOMMERCE_PRODUCT_DELETE_SUCCESS ]: productsDeleteSuccess,
	[ WOOCOMMERCE_PRODUCTS_REQUEST ]: productsRequest,
} );

export function productsRequest( state, action ) {
	const prevState = state || {};
	const { data, error } = action.meta.dataLayer;
	if ( error ) {
		return state;
	}

	if ( data ) {
		const response = data.data;
		const productIds = response.body.map( ( p ) => {
			return p.id;
		} );
		return { ...prevState,
			currentPage: action.page,
			productIds,
			requestedPage: null,
		};
	}

	return { ...prevState,
		requestedPage: action.page,
	};
}

export function productsDeleteSuccess( state, action ) {
	const prevState = state || {};
	const prevProductIds = prevState.productIds || [];
	const newProductIds = prevProductIds.filter( id => id !== action.data.id );
	return { ...prevState,
		productIds: newProductIds,
	};
}

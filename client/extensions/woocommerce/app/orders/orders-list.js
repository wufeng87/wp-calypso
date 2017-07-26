/**
 * External dependencies
 */
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { localize } from 'i18n-calypso';
import React, { Component } from 'react';

/**
 * Internal dependencies
 */
import EmptyContent from 'components/empty-content';
import { fetchOrders } from 'woocommerce/state/sites/orders/actions';
import formatCurrency from 'lib/format-currency';
import {
	areOrdersLoading,
	areOrdersLoaded,
	getOrders,
	getTotalOrders
} from 'woocommerce/state/sites/orders/selectors';
import { getLink } from 'woocommerce/lib/nav-utils';
import { getOrdersCurrentPage, getOrdersCurrentStatus } from 'woocommerce/state/ui/orders/selectors';
import { getSelectedSiteWithFallback } from 'woocommerce/state/sites/selectors';
import humanDate from 'lib/human-date';
import { updateCurrentOrdersQuery } from 'woocommerce/state/ui/orders/actions';
import NavItem from 'components/section-nav/item';
import NavTabs from 'components/section-nav/tabs';
import OrderStatus from 'woocommerce/components/order-status';
import Pagination from 'components/pagination';
import SectionNav from 'components/section-nav';
import Table from 'woocommerce/components/table';
import TableRow from 'woocommerce/components/table/table-row';
import TableItem from 'woocommerce/components/table/table-item';

class Orders extends Component {
	componentDidMount() {
		const { siteId, currentPage, currentStatus } = this.props;
		const query = {
			page: currentPage,
			status: currentStatus,
		};
		if ( siteId ) {
			this.props.fetchOrders( siteId, query );
		}
	}

	componentWillReceiveProps( newProps ) {
		const hasAnythingChanged = (
			newProps.currentPage !== this.props.currentPage ||
			newProps.currentStatus !== this.props.currentStatus ||
			newProps.siteId !== this.props.siteId
		);
		if ( newProps.siteId && hasAnythingChanged ) {
			const query = {
				page: newProps.currentPage,
				status: newProps.currentStatus,
			};
			this.props.fetchOrders( newProps.siteId, query );
		}
	}

	renderOrderItems = ( order, i ) => {
		const { site } = this.props;
		return (
			<TableRow key={ i } href={ getLink( `/store/order/:site/${ order.number }`, site ) }>
				<TableItem className="orders__table-name" isRowHeader>
					<span className="orders__item-link">#{ order.number }</span>
					<span className="orders__item-name">
						{ `${ order.billing.first_name } ${ order.billing.last_name }` }
					</span>
				</TableItem>
				<TableItem className="orders__table-date">
					{ humanDate( order.date_created_gmt + 'Z' ) }
				</TableItem>
				<TableItem className="orders__table-status">
					<OrderStatus status={ order.status } />
				</TableItem>
				<TableItem className="orders__table-total">
					{ formatCurrency( order.total, order.currency ) || order.total }
				</TableItem>
			</TableRow>
		);
	}

	onPageClick = page => {
		this.props.updateCurrentOrdersQuery( this.props.siteId, { page } );
	}

	render() {
		const {
			currentPage,
			orders,
			ordersLoading,
			ordersLoaded,
			site,
			total,
			translate
		} = this.props;

		// Orders are done loading, and there are definitely no orders for this query
		if ( ordersLoaded && ! total ) {
			return (
				<div className="orders__container">
					<EmptyContent
						title={ translate( 'Your orders will appear here as they come in.' ) }
					/>
				</div>
			);
		}

		const headers = (
			<TableRow isHeader>
				<TableItem className="orders__table-name" isHeader>{ translate( 'Order' ) }</TableItem>
				<TableItem className="orders__table-date" isHeader>{ translate( 'Date' ) }</TableItem>
				<TableItem className="orders__table-status" isHeader>{ translate( 'Status' ) }</TableItem>
				<TableItem className="orders__table-total" isHeader>{ translate( 'Total' ) }</TableItem>
			</TableRow>
		);

		return (
			<div className="orders__container">
				<SectionNav>
					<NavTabs label={ translate( 'Status' ) } selectedText={ translate( 'All orders' ) }>
						<NavItem path={ getLink( '/store/orders/:site', site ) } selected={ true }>{ translate( 'All orders' ) }</NavItem>
					</NavTabs>
				</SectionNav>

				<Table className="orders__table" header={ headers } horizontalScroll>
					{ ordersLoading
						? null
						: orders.map( this.renderOrderItems ) }
				</Table>

				<Pagination
					page={ currentPage }
					perPage={ 50 }
					total={ total }
					pageClick={ this.onPageClick }
				/>
			</div>
		);
	}
}

export default connect(
	state => {
		const site = getSelectedSiteWithFallback( state );
		const siteId = site ? site.ID : false;
		const currentPage = getOrdersCurrentPage( state, siteId );
		const currentStatus = getOrdersCurrentStatus( state, siteId );
		const total = getTotalOrders( state, { status: currentStatus }, siteId );

		const query = { page: currentPage, status: currentStatus };
		const orders = getOrders( state, query, siteId );
		const ordersLoading = areOrdersLoading( state, query, siteId );
		const ordersLoaded = areOrdersLoaded( state, query, siteId );

		return {
			currentPage,
			currentStatus,
			orders,
			ordersLoading,
			ordersLoaded,
			site,
			siteId,
			total,
		};
	},
	dispatch => bindActionCreators( { fetchOrders, updateCurrentOrdersQuery }, dispatch )
)( localize( Orders ) );

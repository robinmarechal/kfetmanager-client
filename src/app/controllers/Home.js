import React from 'react';
import CustomersPanel from '../containers/home/CustomersPanel';
import OrdersPanel from '../containers/home/OrdersPanel';
import ProductsPanel from '../containers/home/ProductsPanel';
import { connect } from 'react-redux';
import Order from '../models/Order';
import Product from '../models/Product';
import { awaitOrEmpty } from '../../libs/helpers';
import { fetchOrderBegin, fetchOrderSuccess } from '../actions/models/orders';
import { fetchCustomerBegin, fetchCustomerSuccess } from '../actions/models/customers';
import { fetchProductBegin, fetchProductSuccess } from '../actions/models/products';
import Customer from '../models/Customer';

const maxItemsFetch = 20;

class Home extends React.Component {

    componentDidMount() {
        this.loadOrders();
        this.loadCustomers();
        this.loadProducts();

        this.loadOrders = this.loadOrders.bind(this);
        this.loadCustomers = this.loadCustomers.bind(this);
        this.loadProducts = this.loadProducts.bind(this);
    }


    fetchOrders() {
        return async function (dispatch) {
            dispatch(fetchOrderBegin());
            const orders = await awaitOrEmpty(new Order().limit(maxItemsFetch).orderByDesc('id').with('menu', 'customer', 'products').all());
            dispatch(fetchOrderSuccess(orders));

            return orders;
        };
    }

    fetchCustomers() {
        return async function (dispatch) {
            dispatch(fetchCustomerBegin());
            const customers = await awaitOrEmpty(new Customer().limit(maxItemsFetch).orderBy('balance').all());
            dispatch(fetchCustomerSuccess(customers));

            return customers;
        };
    }

    fetchProducts() {
        return async function (dispatch) {
            dispatch(fetchProductBegin());
            const products = await awaitOrEmpty(new Product().limit(maxItemsFetch).orderBy('stock').with('subcategory.category').all());
            dispatch(fetchProductSuccess(products));

            return products;
        };
    }

    loadOrders() {
        console.log('loadOrders');
        this.props.dispatch(this.fetchOrders());
    }

    loadCustomers() {
        console.log('loadCustomers');
        this.props.dispatch(this.fetchCustomers());
    }

    loadProducts() {
        console.log('loadProducts');
        this.props.dispatch(this.fetchProducts());
    }


    render() {
        const { dispatch } = this.props.dispatch;

        return (
            <div className="flex justify-between">
                <div className="m-8 w-1/3">
                    <OrdersPanel onSync={this.loadOrders}/>
                </div>
                <div className="w-1/3 mt-8">
                    <CustomersPanel onSync={this.loadCustomers}/>
                </div>
                <div className="m-8 w-1/3">
                    <ProductsPanel onSync={this.loadProducts}/>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        ...state,
    };
}

export default connect(mapStateToProps)(Home);
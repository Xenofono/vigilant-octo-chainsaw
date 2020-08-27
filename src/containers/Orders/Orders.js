import React, {useEffect, useState} from 'react'
import Order from '../../components/Order/Order'
import Spinner from '../../components/UI/Spinner/Spinner'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
import axios from '../../axios-orders'

import {connect} from 'react-redux'
import {fetchOrders} from '../../store/actions/index'

const Orders = (props) => {
    console.log(props.loading)

    useEffect(() => {
        props.fetchOrders()
    }, [])

    return props.loading ? <Spinner></Spinner> : (
        <div>
            {props.orders.map(order => <Order key={order.id} ingredients={order.ingredients} price={order.price}></Order>)}
        </div>
    )
}

const mapDispatchToProps = dispatch => ({
    fetchOrders: () => dispatch(fetchOrders())
})

const mapStateToProps = state => ({
    orders: state.orderReducer.orders,
    loading: state.orderReducer.loading
})

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios))

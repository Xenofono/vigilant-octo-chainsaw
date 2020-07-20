import React, {useEffect, useState} from 'react'
import Order from '../../components/Order/Order'
import Spinner from '../../components/UI/Spinner/Spinner'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
import axios from '../../axios-orders'

export default withErrorHandler(function Orders() {

    const [orders, setOrders] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        (async() => {
            try{
                const response = await axios.get("orders.json")
                const data = response.data;
                const newOrders = Object.entries(data).map(order => {
                    return {...order[1], id:order[0]}
                })
                 setOrders(() => {
                    setLoading(false)
                    return newOrders
                })
            }catch(e) {
                
            }

        })()
    }, [])

    return loading ? <Spinner></Spinner> : (
        <div>
            {orders.map(order => <Order key={order.id} ingredients={order.ingredients} price={order.price}></Order>)}
        </div>
    )
}, axios) 

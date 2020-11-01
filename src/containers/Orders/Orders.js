import React, { useEffect } from "react";
import Order from "../../components/Order/Order";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import axios from "../../axios-orders";

import { connect } from "react-redux";
import { fetchOrders } from "../../store/actions/index";

const Orders = ({ orders, loading, token, userId, fetchOrders }) => {
  useEffect(() => {
    fetchOrders(token, userId);
  }, [fetchOrders, token, userId]);

  return loading ? (
    <Spinner></Spinner>
  ) : (
    <div>
      {orders.map((order) => (
        <Order
          key={order.id}
          ingredients={order.ingredients}
          price={order.price}
        ></Order>
      ))}
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  fetchOrders: (token, userId) => dispatch(fetchOrders(token, userId)),
});

const mapStateToProps = (state) => ({
  orders: state.orderReducer.orders,
  loading: state.orderReducer.loading,
  token: state.authReducer.token,
  userId: state.authReducer.userId,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(Orders, axios));

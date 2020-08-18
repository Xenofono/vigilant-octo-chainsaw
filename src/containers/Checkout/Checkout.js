import React, { useState, useEffect, useRef } from "react";
import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";
import ContactData from './ContactData/ContactData'
import {Route} from 'react-router-dom'
import {connect} from 'react-redux'

const Checkout = (props) => {

  // const useComponentWillMount = func => {
  //   const willMount = useRef(true);
  
  //   if (willMount.current) {
  //     func();
  //   }
  
  //   willMount.current = false;
  // };

  const onCancelCheckout = () => {
    props.history.goBack();
  };
  const onContinueCheckout = () => {
    props.history.replace("/checkout/contact-data");
  };

  return (
    <div>
      <CheckoutSummary
        ingredients={props.ingredients}
        onCancelCheckout={onCancelCheckout}
        onContinueCheckout={onContinueCheckout}
      ></CheckoutSummary>
      <Route path={`${props.match.path}/contact-data`}
       component={ContactData}></Route>
    </div>
  );
};



const mapStateToProps = state => {
  return {
    ingredients : state.ingredients,
  }
  
}

export default connect(mapStateToProps)(Checkout);

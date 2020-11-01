import React, {  useEffect } from "react";
import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";
import ContactData from './ContactData/ContactData'
import {Route, Redirect} from 'react-router-dom'
import {connect} from 'react-redux'

import {purchaseInit} from '../../store/actions/index'

const Checkout = (props) => {

  // const useComponentWillMount = func => {
  //   const willMount = useRef(true);
  
  //   if (willMount.current) {
  //     func();
  //   }
  
  //   willMount.current = false;
  // };

  useEffect(() => {
    props.onPurchaseInit()
  })

  const onCancelCheckout = () => {
    props.history.goBack();
  };
  const onContinueCheckout = () => {
    props.history.replace("/checkout/contact-data");
  };

  const summary = !props.ingredients || props.purchased ?
   <Redirect to="/"></Redirect> :
   <div>
   <CheckoutSummary
     ingredients={props.ingredients}
     onCancelCheckout={onCancelCheckout}
     onContinueCheckout={onContinueCheckout}
   ></CheckoutSummary>
   <Route path={`${props.match.path}/contact-data`}
    component={ContactData}></Route>
 </div>

  return summary;
};

const mapDispatchToProps = dispatch => ({
  onPurchaseInit: () => dispatch(purchaseInit())
})

const mapStateToProps = state => {
  return {
    ingredients : state.burgerBuilderReducer.ingredients,
    purchased: state.orderReducer.purchased
  }
  
}

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);

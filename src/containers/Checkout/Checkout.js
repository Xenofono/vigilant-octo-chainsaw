import React, { useState, useEffect, useRef } from "react";
import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";
import ContactData from './ContactData/ContactData'
import {Route} from 'react-router-dom'

const Checkout = (props) => {
  console.log(props);

  const [ingredients, setIngredients] = useState(null);
  const [price, setPrice] = useState(0)

  const useComponentWillMount = func => {
    const willMount = useRef(true);
  
    if (willMount.current) {
      func();
    }
  
    willMount.current = false;
  };

  useComponentWillMount(() => {
      if(props.location.search !== ""){
        const query = new URLSearchParams(props.location.search);
        const newIngredients = {}
        for(let entry of query.entries()){
          if(entry[0] === "price"){
            setPrice(entry[1])
          }
          else{
            newIngredients[entry[0]] = +entry[1];
          }
        }
        setIngredients(newIngredients)
      }
  });

  const onCancelCheckout = () => {
    props.history.goBack();
  };
  const onContinueCheckout = () => {
    props.history.replace("/checkout/contact-data");
  };

  return (
    <div>
      <CheckoutSummary
        ingredients={ingredients}
        onCancelCheckout={onCancelCheckout}
        onContinueCheckout={onContinueCheckout}
      ></CheckoutSummary>
      <Route path={`${props.match.path}/contact-data`}
       render={(props) => (<ContactData ingredients={ingredients} price={price} {...props}></ContactData>)}></Route>
    </div>
  );
};

export default Checkout;

import React, { useState, useEffect } from "react";
import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";

const Checkout = (props) => {
  console.log(props);

  const [ingredients, setIngredients] = useState({
    salad: 1,
    meat: 1,
    cheese: 1,
    bacon: 1,
  });

  useEffect(() => {
    const query = new URLSearchParams(props.location.search);
    const newIngredients = {}
    for(let entry of query.entries()){
        newIngredients[entry[0]] = +entry[1];
    }
    setIngredients(newIngredients)
  }, [props.location.search]);

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
    </div>
  );
};

export default Checkout;

import React from "react";

const OrderSummary = (props) => {
  const ingredientsSummary = Object.keys(props.ingredients).map((key) => (
    <li key={key}><span>{key}: </span>{props.ingredients[key]}</li>
  ));

  return (
    <React.Fragment>
      <h3>Din beställning</h3>
      <p>En mumsig burgare med följande ingredienser:</p>
      <ul>{ingredientsSummary}</ul>
      <p>Fortsätta beställning?</p>
    </React.Fragment>
  );
};

export default OrderSummary;

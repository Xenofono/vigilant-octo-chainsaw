import React from "react";
import Button from '../../UI/Button/Button';

const OrderSummary = (props) => {



  const ingredientsSummary = Object.keys(props.ingredients).map((key) => (
    <li key={key}><span>{key}: </span>{props.ingredients[key]}</li>
  ));

  return (
    <React.Fragment>
      <h3>Din beställning</h3>
      <p>En mumsig burgare med följande ingredienser:</p>
      <ul>{ingredientsSummary}</ul>
      <p><strong>Pris: {props.totalPrice} kr</strong></p>
      <p>Fortsätta beställning?</p>
      <Button clicked={props.modalClosed} btnType="Danger">AVBRYT</Button>
      <Button clicked={props.purchaseContinue} btnType="Success">FORTSÄTT</Button>
    </React.Fragment>
  );
};

export default OrderSummary;

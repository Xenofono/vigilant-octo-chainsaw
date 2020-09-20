import React from "react";
import css from "./Order.module.css";

export default function Order(props) {
    const ingredients = Object.entries(props.ingredients).map((ing) => {
        return (
          <span className={css.OrderSpan}>
            {ing[0]}: {ing[1]}
          </span>
        );
      })
  return (
    <div className={css.Order}>
      <p>Ingredienser: {ingredients}</p>
      <p>
        Pris: <strong>{props.price}</strong> kr
      </p>
    </div>
  );
}

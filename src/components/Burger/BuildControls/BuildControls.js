import React from "react";
import classes from "./BuildControls.module.css";

import BuildControl from "./BuildControl/BuildControl";

const BuildControls = (props) => {
  const controls = [
    { label: "Salad", type: "salad" },
    { label: "Bacon", type: "bacon" },
    { label: "Meat", type: "meat" },
    { label: "Cheese", type: "cheese" }
  ];

  return (
    <div className={classes.BuildControls}>
      <p>
        Pris: <strong>{props.totalPrice} kr</strong>
      </p>
      <div></div>
      {controls.map((control) => (
        <BuildControl
          key={control.label}
          label={control.label}
          isZero={props.disabledInfo[control.type]}
          addHandler={() => props.addHandler(control.type)}
          removeHandler={() => props.removeHandler(control.type)}
          price={props.INGREDIENT_PRICES[control.type]}
        />
      ))}
    </div>
  );
};

export default BuildControls;

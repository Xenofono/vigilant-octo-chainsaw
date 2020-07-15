import React from "react";
import classes from "./BuildControl.module.css";

const BuildControl = (props) => {
  return (
    <div className={classes.BuildControl}>
      <div className={classes.Label}>{props.label}</div>
      <button
        className={classes.Less}
        onClick={props.removeHandler}
        disabled={props.isZero}>
        Mindre
      </button>
      <button className={classes.More} onClick={props.addHandler}>
        Mer
      </button>
      <div className={classes.Label}>{props.price} kr</div>
    </div>
  );
};

export default BuildControl;

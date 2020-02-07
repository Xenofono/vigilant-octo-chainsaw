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
        Less
      </button>
      <button className={classes.More} onClick={props.addHandler}>
        More
      </button>
      <div className={classes.Label}>{props.price} kr</div>
    </div>
  );
};

export default BuildControl;

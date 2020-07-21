import React from "react";

import css from './Input.module.css'

export default function Input(props) {
  let input = null;
  switch (props.elementType) {
    case "input":
      input = <input {...props.elementConfig} className={css.InputElement} value={props.value}></input>;
      break;
    case "textarea":
      input = <textarea {...props} className={css.InputElement}></textarea>;
      break;
    case "select":
      input = <select>
        {props.elementConfig.options.map(option =><option value={option.value}>{option.displayValue}</option>)}
      </select>
      break;
    default:
      input = <input {...props} className={css.InputElement}></input>;
  }
  return (
    <div className={css.Input}>
      <label className={css.Label}>{props.label}</label>
      {input}
    </div>
  );
}

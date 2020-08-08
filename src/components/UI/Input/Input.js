import React from "react";

import css from './Input.module.css'

export default function Input(props) {
  let input = null;
  const cssClasses = [css.InputElement]

  if(!props.valid){
    cssClasses.push(css.Invalid)
  }
  switch (props.elementType) {
    case "input":
      input = <input {...props.elementConfig} className={cssClasses.join(' ')} value={props.value} onChange={props.changed}></input>;
      break;
    case "textarea":
      input = <textarea {...props} className={css.InputElement} onChange={props.changed}></textarea>;
      break;
    case "select":
      input = <select className={css.InputElement} onChange={props.changed}>
        {props.elementConfig.options.map(option =><option value={option.value}>{option.displayValue}</option>)}
      </select>
      break;
    default:
      input = <input {...props} className={css.InputElement} onChange={props.changed}></input>;
  }
  return (
    <div className={css.Input}>
      <label className={css.Label}>{props.label}</label>
      {input}
    </div>
  );
}

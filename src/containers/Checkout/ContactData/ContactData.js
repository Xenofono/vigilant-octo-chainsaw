import React, { useState } from "react";

import Button from "../../../components/UI/Button/Button";
import Spinner from "../../../components/UI/Spinner/Spinner";
import Input from "../../../components/UI/Input/Input";
import axios from "../../../axios-orders";
import css from "./ContactData.module.css";

export default function ContactData(props) {
  const [formElements, setFormElements] = useState({
    name: {
      elementType: "input",
      elementConfig: {
        type: "text",
        placeholder: "Ditt namn",
      },
      value: "",
      validation:{
        required:true
      },
      valid: false
    },
    street: {
      elementType: "input",
      elementConfig: {
        type: "text",
        placeholder: "Din gatuadress",
      },
      value: "",
      validation:{
        required:true
      },
      valid: false
    },
    zipCode: {
      elementType: "input",
      elementConfig: {
        type: "text",
        placeholder: "Ditt postnummer",
      },
      value: "",
      validation:{
        required:true,
        minLength: 5
      },
      valid: false
    },
    city: {
      elementType: "input",
      elementConfig: {
        type: "text",
        placeholder: "Ort",
      },
      value: "",
      validation:{
        required:true
      },
      valid: false
    },
    email: {
      elementType: "input",
      elementConfig: {
        type: "email",
        placeholder: "Epost",
      },
      value: "",
      validation:{
        required:true
      },
      valid: false
    },
    deliveryMethod: {
      elementType: "select",
      elementConfig: {
        options: [
          { value: "Snabbast", displayValue: "Snabbast" },
          { value: "Billigast", displayValue: "Billigast" },
        ],
      },
      value: "Snabbast",
      validation:{},
      valid:true
    },
  });
  const [loading, setLoading] = useState(false);
  const [formIsValid, setFormIsValid] = useState(false)

  const orderHandler = (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = {}
    for(let formEl in formElements){
      console.log(formEl)
      formData[formEl] = formElements[formEl].value
    }
    const order = {
      ingredients: props.ingredients,
      price: props.price,
      orderData: formData
    };
    axios
      .post("/orders.json", order)
      .then((response) => {
        setLoading(false);
        props.history.push("/");
      })
      .catch((err) => {
        setLoading(false);
      });
  };

  const checkValidity = (value, rules) => {
    let isValid = true;
    if(rules.required){
      isValid = value.trim() !== '' && isValid
    }
    if(rules.minLength){
      isValid = value.length >= 5 && isValid
    }
    console.log(isValid)
    return isValid
  }


  const inputChangedHandler = (e, inputIdentifier) => {
    const formClone = {...formElements}
    const inputClone = {...formClone[inputIdentifier]}
    inputClone.value = e.target.value
    inputClone.valid = checkValidity(inputClone.value, inputClone.validation)
    formClone[inputIdentifier] = inputClone

    let entireFormValid = true;
    for(let formEl in formClone){
      if(!formClone[formEl].valid){
        entireFormValid = false
      }
    }
    setFormElements(() => {
      setFormIsValid(entireFormValid)
      return formClone
    })
  }

  const formElementsArr = Object.entries(formElements).map((el) => {
    return { key: el[0], config: el[1] };
  });

  

  return !loading ? (
    <div className={css.ContactData}>
      <h4>Dina kontaktuppgifter</h4>
      <form onSubmit={orderHandler}>
        {formElementsArr.map(el => <Input 
        key={el.key}
        elementType={el.config.elementType} 
        elementConfig={el.config.elementConfig} 
        value={el.config.value}
        valid={el.config.valid}
        changed={(event) => inputChangedHandler(event, el.key)} ></Input>)}
        <Button btnType="Success" disabled={!formIsValid}>
          BESTÄLL
        </Button>
      </form>
    </div>
  ) : (
    <Spinner></Spinner>
  );
}

import React, { useState } from "react";

import Button from "../../../components/UI/Button/Button";
import Spinner from "../../../components/UI/Spinner/Spinner";
import Input from "../../../components/UI/Input/Input";
import axios from "../../../axios-orders";
import css from "./ContactData.module.css";

export default function ContactData(props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState(null);
  const [formElements, setFormElements] = useState({
    name: {
      elementType: "input",
      elementConfig: {
        type: "text",
        placeholder: "Ditt namn",
      },
      value: "",
    },
    street: {
      elementType: "input",
      elementConfig: {
        type: "text",
        placeholder: "Din gatuadress",
      },
      value: "",
    },
    zipCode: {
      elementType: "input",
      elementConfig: {
        type: "text",
        placeholder: "Ditt postnummer",
      },
      value: "",
    },
    city: {
      elementType: "input",
      elementConfig: {
        type: "text",
        placeholder: "Ort",
      },
      value: "",
    },
    email: {
      elementType: "input",
      elementConfig: {
        type: "email",
        placeholder: "Epost",
      },
      value: "",
    },
    deliveryMethod: {
      elementType: "select",
      elementConfig: {
        options: [
          { value: "Snabbast", displayValue: "Snabbast" },
          { value: "Billigast", displayValue: "Billigast" },
        ],
      },
      value: "",
    },
  });
  const [loading, setLoading] = useState(false);

  const orderHandler = (e) => {
    e.preventDefault();
    setLoading(true);

    const order = {
      ingredients: props.ingredients,
      price: props.price,
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

  const formElementsArr = Object.entries(formElements).map((el) => {
    return { key: el[0], config: el[1] };
  });

  return !loading ? (
    <div className={css.ContactData}>
      <h4>Dina kontaktuppgifter</h4>
      <form>
        {formElementsArr.map(el => <Input 
        key={el.key}
        elementType={el.config.elementType} 
        elementConfig={el.config.elementConfig} 
        value={el.config.value} ></Input>)}
        <Button btnType="Success" clicked={orderHandler}>
          BESTÄLL
        </Button>
      </form>
    </div>
  ) : (
    <Spinner></Spinner>
  );
}

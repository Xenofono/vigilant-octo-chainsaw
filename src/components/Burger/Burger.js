import React, { useState } from "react";
import classes from "./Burger.module.css";

import BurgerIngredient from "./BurgerIngredients/BurgerIngredient";

const Burger = props => {
  //accepts object of ingredients, constructs array from value, maps that array to the key ingredient, repeat for each ingredient
  const arrayOfIngredients = Object.keys(props.ingredients).map(key => {
    return [...Array(props.ingredients[key])].map((_, i) => {
      return <BurgerIngredient key={key + i} type={key}></BurgerIngredient>;
    });
  }).flat();


  return (
    <div className={classes.Burger}>
      <BurgerIngredient type="bread-top"></BurgerIngredient>
      {arrayOfIngredients}
      <BurgerIngredient type="bread-bottom"></BurgerIngredient>
    </div>
  );
};

export default Burger;

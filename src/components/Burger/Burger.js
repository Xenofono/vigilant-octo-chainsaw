import React from "react";
import classes from "./Burger.module.css";

import BurgerIngredient from "./BurgerIngredients/BurgerIngredient";

const Burger = (props) => {
  //accepts object of ingredients, constructs array from value, maps that array to the key ingredient, repeat for each ingredient
  const arrayOfIngredients = Object.keys(props.ingredients)
    .map((key) => {
      return [...Array(props.ingredients[key])].map((_, i) => {
        return <BurgerIngredient key={key + i} type={key}></BurgerIngredient>;
      });
    })
    .flat();

  const burgerReadyToDisplay =
    arrayOfIngredients.length > 0 ? (
      arrayOfIngredients
    ) : (
      <h3>Börja välja pålägg</h3>
    );
  const burger = (
    <React.Fragment>
      <BurgerIngredient type="bread-top"></BurgerIngredient>
      {burgerReadyToDisplay}
      <BurgerIngredient type="bread-bottom"></BurgerIngredient>
    </React.Fragment>
  );

  return <div className={classes.Burger}> {burger}</div>;
};

export default Burger;

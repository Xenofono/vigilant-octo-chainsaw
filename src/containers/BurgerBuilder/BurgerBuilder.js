import React, { Component } from "react";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";

const INGREDIENT_PRICES = {
  salad: 5,
  cheese: 8,
  meat: 20,
  bacon: 12
};

class BurgerBuilder extends Component {
  state = {
    ingredients: {
      salad: 0,
      bacon: 0,
      cheese: 0,
      meat: 0
    },
    totalPrice: 70,
    purchaseNow: false
  };

  togglePurchaseNow = () =>
    this.setState((oldState) => {
      return { purchaseNow: !oldState.purchaseNow };
    });

  addIngredientsHandler = (ingredient) => {
    const oldCount = this.state.ingredients[ingredient];
    const updatedIngredients = { ...this.state.ingredients };
    updatedIngredients[ingredient] = oldCount + 1;
    const priceAddition = INGREDIENT_PRICES[ingredient];
    const newPrice = this.state.totalPrice + priceAddition;
    this.setState({ totalPrice: newPrice, ingredients: updatedIngredients });
  };

  removeIngredientsHandler = (ingredient) => {
    const oldCount = this.state.ingredients[ingredient];
    if (oldCount > 0) {
      const updatedIngredients = { ...this.state.ingredients };
      updatedIngredients[ingredient] = oldCount - 1;
      const priceSubtraction = INGREDIENT_PRICES[ingredient];
      const newPrice = this.state.totalPrice - priceSubtraction;
      this.setState({ totalPrice: newPrice, ingredients: updatedIngredients });
    }
  };

  render() {
    const disabledInfo = {
      ...this.state.ingredients
    };
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }
    return (
      <React.Fragment>
        <Modal show={this.state.purchaseNow}>
          <OrderSummary ingredients={this.state.ingredients}></OrderSummary>
        </Modal>

        <Burger ingredients={this.state.ingredients}></Burger>
        <BuildControls
          totalPrice={this.state.totalPrice}
          INGREDIENT_PRICES={INGREDIENT_PRICES}
          disabledInfo={disabledInfo}
          addHandler={this.addIngredientsHandler}
          removeHandler={this.removeIngredientsHandler}
          togglePurchaseNow={this.togglePurchaseNow}
        />
      </React.Fragment>
    );
  }
}

export default BurgerBuilder;

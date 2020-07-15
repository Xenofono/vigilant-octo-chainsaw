import React, { Component } from "react";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import axios from "../../axios-orders";

const INGREDIENT_PRICES = {
  salad: 5,
  cheese: 8,
  meat: 20,
  bacon: 12
};

class BurgerBuilder extends Component {
  state = {
    ingredients: null,
    totalPrice: 70,
    purchaseNow: false,
    loading: false,
    error: false
  };
  componentDidMount = () => {
    axios
      .get("ingredients.json")
      .then((response) => {
        console.log(response);
        this.setState({ ingredients: response.data });
      })
      .catch((error) => {
        this.setState({ error: true });
      });
  };

  togglePurchaseNow = () =>
    this.setState((oldState) => {
      return { purchaseNow: !oldState.purchaseNow };
    });

  purchaseContinueHandler = () => {
    // this.setState({ loading: true });

    // const order = {
    //   ingredients: this.state.ingredients,
    //   price: this.state.totalPrice,
    //   customer: {
    //     name: "Kristoffer Näsström",
    //     address: {
    //       street: "Cevelidsgatan 17",
    //       zipCode: "86035",
    //       city: "Söråker"
    //     },
    //     email: "test@test.com"
    //   },
    //   expressDelivery: true
    // };
    // axios
    //   .post("/orders.json", order)
    //   .then((response) => {
    //     this.setState({ loading: false, purchaseNow: false });
    //   })
    //   .catch((err) => {
    //     this.setState({ loading: false, purchaseNow: false });
    //   });
    const queryParams = Object.entries(this.state.ingredients).map(ing => {
      //return for example bacon=3
      return `${encodeURIComponent(ing[0])}=${encodeURIComponent(ing[1])}`
    })
    this.props.history.push({
      pathname:"/checkout",
      search: `?${queryParams.join("&")}`
    })
  };

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
    let orderSummary = null;
    let displayBurger = this.state.error ? (
      <p>Kan inte ladda ingredienser!</p>
    ) : (
      <Spinner></Spinner>
    );

    if (this.state.ingredients) {
      orderSummary = (
        <OrderSummary
          totalPrice={this.state.totalPrice}
          ingredients={this.state.ingredients}
          purchaseContinue={this.purchaseContinueHandler}
          modalClosed={this.togglePurchaseNow}></OrderSummary>
      );

      displayBurger = (
        <React.Fragment>
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

    if (this.state.loading) {
      orderSummary = <Spinner></Spinner>;
    }

    return (
      <React.Fragment>
        <Modal
          show={this.state.purchaseNow}
          modalClosed={this.togglePurchaseNow}>
          {orderSummary}
        </Modal>
        {displayBurger}
      </React.Fragment>
    );
  }
}

export default withErrorHandler(BurgerBuilder, axios);

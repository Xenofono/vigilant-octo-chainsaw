import React, { Component } from "react";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import {connect} from 'react-redux'
import axios from "../../axios-orders";

import * as burgerBuilder from '../../store/actions/index'


class BurgerBuilder extends Component {
  state = {
    purchaseNow: false,
  };
  componentDidMount = () => {
    this.props.onInitIngredients()
  };

  togglePurchaseNow = () =>
    this.setState((oldState) => {
      return { purchaseNow: !oldState.purchaseNow };
    });

  purchaseContinueHandler = () => {
 
    const queryParams = Object.entries(this.props.ingredients).map(ing => {
      //return for example bacon=3
      return `${encodeURIComponent(ing[0])}=${encodeURIComponent(ing[1])}`
    })
    queryParams.push(`price=${this.props.totalPrice}`)
    this.props.history.push({
      pathname:"/checkout",
      search: `?${queryParams.join("&")}`
    })
  };

  disableButtons = () => {
    const disabledInfo = {
      ...this.props.ingredients
    };
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }
    return disabledInfo;
  }

  render() {
    let orderSummary = null;
    let displayBurger = this.props.error ? (
      <p>Kan inte ladda ingredienser!</p>
    ) : (
      <Spinner></Spinner>
    );

    if (this.props.ingredients) {
      orderSummary = (
        <OrderSummary
          totalPrice={this.props.totalPrice}
          ingredients={this.props.ingredients}
          purchaseContinue={this.purchaseContinueHandler}
          modalClosed={this.togglePurchaseNow}></OrderSummary>
      );

      displayBurger = (
        <React.Fragment>
          <Burger ingredients={this.props.ingredients}></Burger>
          <BuildControls
            totalPrice={this.props.totalPrice}
            disabledInfo={this.disableButtons()}
            addHandler={this.props.addIngredientHandler}
            removeHandler={this.props.removeIngredientHandler}
            togglePurchaseNow={this.togglePurchaseNow}
          />
        </React.Fragment>
      );
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

const mapStateToProps = state => {
  return {ingredients: state.burgerBuilderReducer.ingredients,
     totalPrice: state.burgerBuilderReducer.totalPrice,
    error: state.burgerBuilderReducer.error}
}

const mapDispatchToProps = dispatch => {
  return { 
    addIngredientHandler: (ingredient) => dispatch(burgerBuilder.addIngredient(ingredient)),
    removeIngredientHandler: (ingredient) => dispatch(burgerBuilder.removeIngredient(ingredient)),
    onInitIngredients: () => dispatch(burgerBuilder.initIngredients())
  }
}



export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));

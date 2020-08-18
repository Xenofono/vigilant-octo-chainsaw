import React, { Component } from "react";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import axios from "../../axios-orders";
import {connect} from 'react-redux'
import * as burgerBuilder from '../../store/actions/index'


class BurgerBuilder extends Component {
  state = {
    purchaseNow: false,
    loading: false,
    error: false
  };
  componentDidMount = () => {
    // axios
    //   .get("ingredients.json")
    //   .then((response) => {
    //     console.log(response);
    //     this.setState({ ingredients: response.data });
    //   })
    //   .catch((error) => {
    //     this.setState({ error: true });
    //   });
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
    let displayBurger = this.state.error ? (
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
      console.log(this.props)

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

const mapStateToProps = state => {
  console.log(state.burgerBuilderReducer)
  return {ingredients: state.burgerBuilderReducer.ingredients, totalPrice: state.burgerBuilderReducer.totalPrice}
}

const mapDispatchToProps = dispatch => {
  return { 
    addIngredientHandler: (ingredient) => dispatch(burgerBuilder.addIngredient(ingredient)),
    removeIngredientHandler: (ingredient) => dispatch(burgerBuilder.removeIngredient(ingredient)),
  }
}



export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));

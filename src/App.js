import React, { Component } from "react";
import Layout from "./hoc/Layout/Layout";
import { Route, withRouter, Switch, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { authRetrieveStorage } from "./store/actions/index";

import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder";
import Checkout from "./containers/Checkout/Checkout";
import Orders from "./containers/Orders/Orders";
import Auth from "./containers/Auth/Auth";
import Logout from "./containers/Auth/Logout/Logout";
import asyncComponent from './hoc/asyncComponent/asyncComponent'

const asyncCheckout = asyncComponent(() => {
  return import('./containers/Checkout/Checkout')
})

const asyncOrders = asyncComponent(() => {
  return import('./containers/Orders/Orders')
})

const asyncAuth = asyncComponent(() => {
  return import('./containers/Auth/Auth')
})

class App extends Component {
  state = {};

  componentDidMount() {
    this.props.checkIfLoggedIn();
  }

  render() {
    let routes = (
      <Switch>
        <Route path="/auth" component={asyncAuth}></Route>
        <Route path="/" exact component={BurgerBuilder}></Route>
      </Switch>
    );

    if (this.props.isAuthenticated) {
      routes = (
        <Switch>
          <Route path="/orders" component={asyncOrders}></Route>
          <Route path="/checkout" component={asyncCheckout}></Route>
          <Route path="/auth" component={asyncAuth}></Route>
          <Route path="/logout" component={Logout}></Route>
          <Route path="/" exact component={BurgerBuilder}></Route>
        <Redirect to="/"></Redirect>

        </Switch>
      );
    }

    return (
      <div>
        <Layout>{routes}</Layout>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.authReducer.token !== null,
});

const mapDispatchToProps = (dispatch) => ({
  checkIfLoggedIn: () => dispatch(authRetrieveStorage()),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));

import React, { Component } from "react";
import Layout from "./hoc/Layout/Layout";
import { Route, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { authRetrieveStorage } from "./store/actions/index";

import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder";
import Checkout from "./containers/Checkout/Checkout";
import Orders from "./containers/Orders/Orders";
import Auth from "./containers/Auth/Auth";
import Logout from "./containers/Auth/Logout/Logout";

class App extends Component {
  state = {};

  componentDidMount(){
    this.props.checkIfLoggedIn();

  }

  render() {

    return (
      <div>
        <Layout>
          <Route path="/orders" component={Orders}></Route>
          <Route path="/checkout" component={Checkout}></Route>
          <Route path="/auth" component={Auth}></Route>
          <Route path="/logout" component={Logout}></Route>
          <Route path="/" exact component={BurgerBuilder}></Route>
        </Layout>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  checkIfLoggedIn: () => dispatch(authRetrieveStorage()),
});

export default withRouter(connect(null, mapDispatchToProps)(App));

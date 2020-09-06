import React, { Component } from 'react';
import Layout from './hoc/Layout/Layout'
import {Route} from 'react-router-dom'

import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder'
import Checkout from './containers/Checkout/Checkout'
import Orders from './containers/Orders/Orders'
import Auth from './containers/Auth/Auth'

class App extends Component {

  state = {

  }

  render() {
    return (
      <div>
        <Layout>
          <Route path="/orders" component={Orders}></Route>
          <Route path="/checkout" component={Checkout}></Route>
          <Route path="/auth" component={Auth}></Route>
          <Route path="/" exact component={BurgerBuilder}></Route>
        </Layout>
      </div>
    );
  }

}

export default App;

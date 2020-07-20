import React, { Component } from 'react';
import Layout from './hoc/Layout/Layout'
import {Route} from 'react-router-dom'

import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder'
import Checkout from './containers/Checkout/Checkout'
import Orders from './containers/Orders/Orders'

class App extends Component {

  state = {

  }

  render() {
    return (
      <div>
        <Layout>
          <Route path="/orders" component={Orders}></Route>
          <Route path="/checkout" component={Checkout}></Route>
          <Route path="/" exact component={BurgerBuilder}></Route>
        </Layout>
      </div>
    );
  }

}

export default App;

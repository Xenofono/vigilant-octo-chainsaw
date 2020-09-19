import React, { Component } from "react";
import Input from "../../components/UI/Input/Input";
import Button from "../../components/UI/Button/Button";
import * as actions from "../../store/actions/index";
import { connect } from "react-redux";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import axios from "axios";
import {Redirect} from 'react-router-dom'

import css from "./Auth.module.css";

class Auth extends Component {
  state = {
    controls: {
      email: {
        elementType: "input",
        elementConfig: {
          type: "email",
          placeholder: "Din epostadress",
        },
        value: "",
        validation: {
          required: true,
          isEmail: true,
        },
        valid: false,
      },
      password: {
        elementType: "input",
        elementConfig: {
          type: "password",
          placeholder: "Lösenord",
        },
        value: "",
        validation: {
          required: true,
          minLength: 6,
        },
        valid: false,
      },
    },
    isSignUp: true,
  };

  componentDidMount(){
    if(!this.props.isBuilt && this.props.authRedirectPath !== "/"){
      this.props.onSetAuthRedirectPath()
    }
  }

  checkValidity = (value, rules) => {
    let isValid = true;
    if (rules.required) {
      isValid = value.trim() !== "" && isValid;
    }
    if (rules.minLength) {
      isValid = value.length >= 6 && isValid;
    }
    return isValid;
  };

  inputChangedHandler = (e, inputName) => {
    const formClone = {
      ...this.state.controls,
      [inputName]: {
        ...this.state.controls[inputName],
        value: e.target.value,
        valid: this.checkValidity(
          e.target.value,
          this.state.controls[inputName].validation
        ),
      },
    };

    this.setState({ controls: formClone });
  };

  submitHandler = (event) => {
    event.preventDefault();
    const { email, password } = this.state.controls;
    console.log(this.state.isSignUp);
    this.props.onAuth(email.value, password.value, this.state.isSignUp);
  };

  render() {
    const formElementsArray = [];
    for (let inputName in this.state.controls) {
      formElementsArray.push({
        id: inputName,
        config: this.state.controls[inputName],
      });
    }

    const switchAuthMode = () =>
      this.setState((oldState) => ({ isSignUp: !oldState.isSignUp }));

    let form = formElementsArray.map((el) => (
      <Input
        key={el.id}
        elementType={el.config.elementType}
        elementConfig={el.config.elementConfig}
        value={el.config.value}
        valid={el.config.valid}
        changed={(event) => this.inputChangedHandler(event, el.id)}
      ></Input>
    ));

    if (this.props.loading) {
      form = <Spinner></Spinner>;
    }

    const errorMessage = this.props.error ? (
      <p>{this.props.error.message}</p>
    ) : null;

    if(this.props.isAuthenticated){
      return <Redirect to={this.props.authRedirectPath}></Redirect>
    }

    return (
      <div className={css.Auth}>
        {errorMessage}
        <form onSubmit={this.submitHandler}>
          {form}
          <Button btnType="Success">
            {this.state.isSignUp ? "REGISTRERA" : "LOGGA IN"}
          </Button>
        </form>
        <Button btnType="Danger" clicked={switchAuthMode}>
          BYT TILL {this.state.isSignUp ? "LOGIN" : "REGISTRERING"}
        </Button>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onAuth: (email, password, isSignUp) =>
      dispatch(actions.auth(email, password, isSignUp)),
      onSetAuthRedirectPath: () => dispatch(actions.authRedirect("/"))
  };
};

const mapStateToProps = (state) => ({
  loading: state.authReducer.loading,
  error: state.authReducer.error,
  isAuthenticated: state.authReducer.token !== null,
  isBuilt: state.burgerBuilderReducer.building,
  authRedirectPath: state.authReducer.authRedirectPath
});

export default connect(mapStateToProps, mapDispatchToProps)(Auth);

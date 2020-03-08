import React, { useState, useEffect } from "react";
import Modal from "../../components/UI/Modal/Modal";
const withErrorHandler = (WrappedComponent, axios) => {
  return props => {
    const [stateError, setStateError] = useState(null);
    useEffect(() => {
      axios.interceptors.request.use(req => {
        setStateError(null);
        return req;
      });
      axios.interceptors.response.use(res => res, error => {
        setStateError(error);
      });
    });
    const errorConfirmedHandler = () => {
      setStateError(null);
    };
    return (
      <React.Fragment>
        <Modal show={stateError} modalClosed={errorConfirmedHandler}>
          {stateError ? stateError.message : null}
        </Modal>
        <WrappedComponent {...props}></WrappedComponent>
      </React.Fragment>
    );
  };
};

export default withErrorHandler;

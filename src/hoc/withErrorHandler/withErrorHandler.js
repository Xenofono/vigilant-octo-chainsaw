import React, { useState, useEffect } from "react";
import Modal from "../../components/UI/Modal/Modal";
const withErrorHandler = (WrappedComponent, axios) => {
  return (props) => {
    const [stateError, setStateError] = useState(null);

    const reqInterceptor = axios.interceptors.request.use((req) => {
      setStateError(null);
      return req;
    });
    const resInterceptor = axios.interceptors.response.use(
      (res) => res,
      (error) => {
        setStateError(error);
      }
    );
    useEffect(() => {
      return () => {
        axios.interceptors.request.eject(reqInterceptor);
        axios.interceptors.response.eject(resInterceptor);
      };
    }, [reqInterceptor, resInterceptor]);
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

import React, { useEffect } from "react";
import PropTypes from "prop-types";
import classes from "./Modal.module.css";
import Backdrop from "../Backdrop/Backdrop";

const Modal = props => {
  useEffect(() => {
    console.log("MODAL UPDATED");
  });
  return (
    <React.Fragment>
      <Backdrop show={props.show} clicked={props.modalClosed}></Backdrop>
      <div
        className={classes.Modal}
        style={{
          transform: props.show ? "translateY(0)" : "translateY(-100vh)",
          opacity: props.show ? 1 : 0
        }}
      >
        {props.children}
      </div>
    </React.Fragment>
  );
};

Modal.propTypes = {
  show: PropTypes.bool.isRequired
};

export default React.memo(
  Modal,
  (prev, next) => prev.show === next.show && prev.children === next.children
);

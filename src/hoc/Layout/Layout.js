import React, { useState } from "react";
import "./Layout.css";
import Toolbar from "../../components/Navigation/Toolbar/Toolbar";
import SideDrawer from "../../components/Navigation/SideDrawer/SideDrawer";
import { connect } from "react-redux";

const Layout = (props) => {
  const [showSideDrawer, setShowSideDrawer] = useState(false);

  const sideDrawerClosedHandler = () => {
    setShowSideDrawer((oldState) => !oldState);
  };

  return (
    <React.Fragment>
      <Toolbar
        isAuthenticated={props.isAuthenticated}
        sideDrawerHandler={sideDrawerClosedHandler}
      ></Toolbar>
      <SideDrawer
        isAuthenticated={props.isAuthenticated}
        open={showSideDrawer}
        close={sideDrawerClosedHandler}
      ></SideDrawer>
      <main className="Content">{props.children}</main>
    </React.Fragment>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.authReducer.token !== null,
});

export default connect(mapStateToProps)(Layout);

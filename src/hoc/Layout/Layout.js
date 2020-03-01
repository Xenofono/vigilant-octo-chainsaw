import React, { useState } from "react";
import "./Layout.css";
import Toolbar from "../../components/Navigation/Toolbar/Toolbar";
import SideDrawer from "../../components/Navigation/SideDrawer/SideDrawer";

const Layout = (props) => {

  const [showSideDrawer, setShowSideDrawer] = useState(false)

  const sideDrawerClosedHandler = () => {
    setShowSideDrawer(oldState => !oldState)
  }

  return (
    <React.Fragment>
      <Toolbar sideDrawerHandler={sideDrawerClosedHandler}></Toolbar>
      <SideDrawer open={showSideDrawer} close={sideDrawerClosedHandler}></SideDrawer>
      <main className="Content">{props.children}</main>
    </React.Fragment>
  );
};

export default Layout;

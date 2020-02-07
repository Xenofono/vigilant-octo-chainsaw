import React from "react";
import "./Layout.css";

const layout = props => (
<<<<<<< HEAD
    <React.Fragment>
        <div>
            Toolbar, SideDrawer, Backdrop

        </div>
        <main>
            {props.children}
        </main>
    </React.Fragment>
)
=======
  <React.Fragment>
    <div>Toolbar, SideDrawer, Backdrop</div>
    <main className="Content">{props.children}</main>
  </React.Fragment>
);
>>>>>>> d6f3103d2471c774f5e3b240a372bbaa96b1cc4c

export default layout;

import React, { useState, useEffect } from "react";

const asyncComponent = (inputComponent) => {
  return (props) => {
    const [component, setComponent] = useState(null);

    useEffect(() => {
      inputComponent().then((cmp) => setComponent(cmp.default));
    });

    const Component = component;

    return Component ? <Component {...props}></Component> : null;
  };
};

export default asyncComponent;

import React from "react";

const Container = ({ Component = "div", ...props }) => {
  return (
    <Component
      {...props}
      className={`container p-8 mx-auto xl:px-4 ${
        props.className ? props.className : ""
      }`}
    >
      {props.children}
    </Component>
  );
};

export default Container;

import React, { useState } from "react";

const WhyUseState = () => {
  console.log("TOP of Logic");
  const [state, setState] = useState(0);

  console.log("MIDDLE of Login", `state is ${state}`);
  const onClickHandler = () => {
    console.log("clicked event occured", `state is ${state}`);
    setState(1);
    if (state === 1) {
      console.log("is it work?", `state is ${state}`);
    }
    console.log("clicked event end", `state is ${state}`);
  };
  return (
    <div>
      <button onClick={onClickHandler}>Button</button>
    </div>
  );
};

export default WhyUseState;

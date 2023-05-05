import React, { useState } from "react";

/*
let _value

export useState(initialVale) {
    if (_value === undefined) {
        _value = initialValue
    }
    const setState = (newValue) => {
        _value = newValue
    }

    return [_value, setState]
}

*/

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
      <div>
        <button onClick={onClickHandler}>Button</button>
      </div>
      <div style={{ marginTop: "10px" }}>
        <button onClick={console.log("button was rendered")} disabled={true}>
          Rendering Check
        </button>
      </div>
    </div>
  );
};

export default WhyUseState;

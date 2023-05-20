import { useRef } from "react";

const WhyUseRef = () => {
  const ref = useRef(0);

  const handleClick = () => {
    ref.current = ref.current + 1;
    alert(`You clicked ${ref.current} times!`);
  };
  return (
    <>
      <p>{ref.current}</p>
      <button onClick={handleClick}>click</button>
    </>
  );
};

export default WhyUseRef;

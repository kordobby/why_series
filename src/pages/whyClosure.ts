export const whyClosure = () => {
  function outer(age: number) {
    const name = "leetrue";
    console.log(`hi, i'm ${name} and ${age} years old`);
  }

  const whoAmI = () => outer(15);
  whoAmI();
};

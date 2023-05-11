export const whyClosure = () => {
  function outer(country: string) {
    let language = "한국어";
    return function inner(name: string, age: number) {
      console.log(`제 이름은 ${name} 입니다. 저는 ${age}살 입니다. 
        저는 ${country}에 살고 ${language}를 사용해요.`);
    };
  }
  let a = outer("고양");
  a("이트루", 22);
};

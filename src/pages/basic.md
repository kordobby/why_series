## Element

`element` 는 실제로 화면에 렌더링 할 DOM 노드들의 정보를 React 에 알려주기 위한 하나의 수단이다. DOM 노드 혹은 컴포넌트를 표현하는 JavaScript 의 일반 불변 객체(Plain Immutable Object)에 해단이 되며 type 필드와 props 필드로 표현이 된다.
element 의 type 필드는 문자열 혹은 함수형/클래스형 컴포넌트 이며, props 필드는 객체이다. 일반적으로 하나 이상의 child element 는 props 의 children 필드로 표현되며, 이것을 통해 element 들이 중첩될 수 있다. 이 필드에는 텍스트에 해당하는 문자열, element, 또는 element 배열 등이 저장될 수 있다.
element는 javaScript 의 React.createElement() 함수 또는 JSX 의 태그 문법으로 작성한다. element 들로 이루어진 트리를 element tree 라 부르며, 이는 메모리 상에만 존재하게 되는 virtual DOM 이다.

### JSX tag 형식

```javascript
<div>
    <WhyUseState>
</div>
```

### JavaScript Plain Object

```javascript
{
    type: "div",
    props: {
        className: "why_useState"
        children: [ ... ]
    }
}
```

하지만 말이 너무 어렵다. 간단하게 정리하면 element 는 컴포넌트를 JSON 으로 표현한 것이다.

```javascript
<div class="leetrue">
  <b>leetrue</b>
</div>
```

```json
{
  "type": "div",
  "props": {
    "className": "leetrue",
    "children": {
      "type": "b",
      "children": "leetrue"
    }
  }
}
```

type 이 string 인 경우에 type 은 해당 컴포넌트가 어떤 HTML tag 인지 표현한다. type 이 string 인 경우 props 는 해당 HTML tag 의 속성을 명시한다.

## DOM Element

element 의 type 이 태그 이름에 해당하는 문자열인 경우(소문자로 시작)를 말한다. 해당 태그를 가진 DOM 노드를 표현하며, props 정보를 통해서 해당 노드의 attribute 들을 표현한다. React 가 실제로 화면에 렌더링 하는 대상에 해당한다.

## Component Element

element 의 type 이 클래스형/함수형 컴포넌트인 경우를 말한다. 사용자가 직접 정의한 컴포넌트를 표현하며, 입력으로 `props` 를 받으면 렌더링할 element tree 를 반환한다. 이 element tree 는 어떠한 element tree 를 반환하는지 묻는 것을 반복한다. 물론 클래스형 컴포넌트의 경우 당연히 컴포넌트 인스턴스의 생성이 선행될 것이다.

- 클래스형 컴포넌트
  지역 상태를 가질 수 있고, 해당 컴포넌트 인스턴스에 대응하는 DOM 노드가 생성, 수정, 삭제될 때의 동작을 제어할 수 있다.(생명 주기)

- 함수형 컴포넌트
  `render()` 함수만 가지는 클래스형 컴포넌트와 동일하며, 지역 상태를 가질 수 없지만 구현이 단순하다.

## element 핵심 아이디어

Component element 도 DOM element 와 같은 element 이므로 서로 중첩되거나 섞이는 것이 가능하다. 따라서 하나의 컴포넌트를 정의하는 데 있어서 또 다른 컴포넌틀르 사용하는 것이 가능하게 된다.
이 때, 가져다 쓰는 컴포넌트의 내부 구조를 자세히 몰라도 문제 되지 않는다. 이것은 컴포넌트들의 완전한 분리를 가능하게 하며, 복잡한 UI 를 더욱 쉽게 구성할 수 있도록 돕는다.

## Component Instance

클래스로 선언된 컴포넌트들만 인스턴스를 가지며, 이것을 컴포넌트 인스턴스라고 부른다. 컴포넌트 클래스 내부에서 this 키워드를 통해 참조하는 대상에 해당한다. 지역 상태를 저장하고 생명 주기 이벤트들에 대한 반응을 제어할 때 매우 유용하다. 함수형 컴포넌트는 인스턴스를 가지지 않는다.

- 인스턴스가 뭔데?
  비슷한 성질을 가진 여러 개의 객체를 생성하기 위해 사용되는, 생성자 함수(constructor)를 하나의 붕어빵 틀이라고 생각한다면 이렇게 찍어낸 붕어빵들을 인스턴스라고 한다.

```javascript
function FishBread(anggo, price) {
  this.anggo = anggo;
  this.price = price;
  this.desciption = function () {
    console.log(`이 붕어빵 앙꼬는 ${this.anggo}이고 ${price}원입니다!`);
  };
}

const creamFishBread = new FishBread("슈크림", 2000);
console.log(creamFishBread); // FishBread { anggo: '슈크림', price: 2000, is: f }

creamFishBread.desciption(); // 이 붕어빵 앙꼬는 슈크림이고 2000원입니다!
```

객체지향 언어에서 흔히 사용되는 `Class` 가 javascript 에서는 `prototype` 이며, 생성자 함수가 사용된다. 클래스나 프로토타입을 사용해 만들어 낸 것의 결과물이 곧 인스턴스이다. 이렇게 생성된 인스턴스는 원래의 객체인 클래스나 프로토 타입이 가지고 있는 property 와 method 를 모두 상속받는다.

- 그럼 React 에서 인스턴스는 뭔데
  함수형 컴포넌트와 클래스형 컴포넌트부터 다시 들어가보자. 두 가지 타입의 컴포넌트는 모두 props 객체 인자를 받고 React element 를 반환하는 컴포넌트이지만 유형이 다르다.

```javascript
function FuntionalComponent(props) {
  return <h1>Hello, {props.name}</h1>;
}
```

```javascript
class ClassComponent extends React.Component {
    render() {
        return <h1>Hello, {this.props.name}<h1>
    }
}
```

위 코드와 같이 컴포넌트를 사용해 React 에게 내가 화면에 어떤 것을 보여주고 싶은지 알려줄 수 있다. 그리고 데이터가 변경이 된다면 컴포넌트를 효율적으로 업데이트하고 렌더링을 해준다.

```javascript
class ClassComponent extends React.Component {
    render() {
        return <h1>Hello, {this.props.name}<h1>
    }
}
```

위 코드는 클래스형 컴포넌트로, React 컴포넌트 클래스 또는 React 컴포넌트 타입이라고 한다. 각각의 컴포넌트는 props 라는 매개변수를 받고 `render` 함수를 통해 표시할 뷰 계층 구조를 반환한다.

```javascript
const App = function () {
  return <div>Hi!</div>;
};
```

위 코드 같은 경우는 인스턴스가 아니다. 이 함수는 팩토리 형태이며, 실제 DOM 에 렌더링 되는 컴포넌트의 인스턴스들을 생성한다.

```javascript
// use babel
"use strict";

var App = function App() {
  return /*#__PURE__*/ React.createElement("div", null, "Hi!");
};

/*#__PURE__*/
React.createElement("div", null);
```

`<div></div>` 처럼 JSX 태그를 작성하고, 컴포넌트 이름을 넣을 때마다 실제 요소를 생성하는 `createElement` 함수를 호출한다. JSX 를 이용해서 React 구조를 작성하면 구문을 빌드하는 시점에 `React.createElement('div')` 이런 식으로 변화된다는 의미이다.

즉 컴포넌트 이름은 컴포넌트 클래스, JSX 안에서 사용되는 이름은 컴포넌트 인스턴스가 된다. 이렇게 JSX 컴포넌트와 인스턴스 사이를 엮는 것이다.

```javascript
// DOM에 렌더링하기 전에 컴포넌트를 인스턴스화해야한다.->JSX를 이용.
ReactDOM.render(<App />);

// ReactDOM.render(App);
// 이렇게 전달하면 '클래스'를 전달한 것.
```

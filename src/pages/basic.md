## Element

`element` 는 실제로 화면레 렌더링 할 DOM 노드들의 정보를 React 에 알려주기 위한 하나의 수단이다. DOM 노드 혹은 컴포넌트를 표현하는 JavaScript 의 일반 불변 객체(Plain Immutable Object)에 해단이 되며 type 필드와 props 필드로 표현이 된다.
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

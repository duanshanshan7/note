//
a = "aaa";
function foo() {
  console.log(this.a);
}
foo();

const obj = {
  a: 111,
  b: 222
};

// 手写call
Function.prototype.myCall = function(context, ...args) {
  context = (context ?? window) || new Object(context);
  const key = Symbol();
  context[key] = this;
  const result = context[key](...args);
  delete context[key];
  return result;
};

foo.myCall(obj);

// 手写apply
Function.prototype.myApply = function(context) {
  context = (context ?? window) || new Object(context);
  const key = Symbol();
  const args = arguments[1];
  context[key] = this;
  const result = args ? context[key](...args) : context[key]();
  delete context[key];
  return result;
};

// 手写bind
Function.prototype.myBind = function(context) {
  if (typeof this !== "function") {
    throw new Error(
      "Function.prototype.bind - what is trying to be bound is not callable"
    );
  }
  const self = this;
  const args = Array.prototype.slice.call(arguments, 1);
  const fNOP = function() {};
  const fBOUND = function() {
    console.log(this, self);
    const bindArgs = Array.prototype.slice.call(arguments);
    return self.apply(
      this instanceof fNOP ? this : context,
      args.concat(bindArgs)
    );
  };
  console.log(this);
  fNOP.prototype = this.prototype;
  fBOUND.prototype = new fNOP();
  return fBOUND;
};

const fBind = foo.myBind(obj);
const objBind = new fBind();

// 手写new
function objFactory() {
  const obj = new Object();
  Constructor = Array.prototype.shift.call(arguments);
  obj._proto_ = Constructor.prototype;
  const result = Constructor.apply(obj, arguments);
  return typeof result === "object" ? result : obj;
}

function Factory(name, age) {
  this.x = 1;
  this.y = 2;
  this.name = name;
  this.age = age;
  return {
    a: "a",
    b: "b"
  };
}

const factoryObj = objFactory(Factory, "lily", 18);
console.log(factoryObj);

// 防抖函数
function debounce(fn, wait, immediate) {
  let timeout = null;
  const debounced = function() {
    const self = this;
    const args = arguments;
    let result;
    clearTimeout(timeout);
    if (immediate) {
      if (!timeout) {
        result = fn.apply(self, args);
      }
      timeout = setTimeout(() => {
        timeout = null;
      }, wait);
    } else {
      timeout = setTimeout(() => {
        result = fn.apply(self, args);
      }, wait);
    }
    return result;
  };
  debounced.cancel = function() {
    clearTimeout(timeout);
    timeout = null;
  };
  return debounced;
}
document.addEventListener(
  "click",
  debounce(() => console.log(123), 1000, true)
);

// 节流函数
function throttle(fn, wait) {
  let previous = 0;
  return function() {
    const self = this;
    const args = arguments;
    let now = +new Date();
    let result;
    if (now - previous > wait) {
      result = fn.apply(self, args);
      previous = now;
    }
    return result;
  };
}
document.addEventListener(
  "click",
  throttle(() => console.log(111), 1000)
);

// 遍历对象
// for in , Object.keys(), Object.values()
// 数组  for循环  for of
// for in 可以遍历原型链上的属性，其他只遍历对象自身的属性  判断是否是自身属性：使用 hasOwnProperty

// 深拷贝
arr.concat(), arr.slice(); // 适合基本类型的数组拷贝,不能深拷贝引用型数组
JSON.parse(JSON.stringify(arr)); //可以拷贝引用型数组，但不能拷贝函数

// 深拷贝函数
function deepClone(obj) {
  if (typeof obj !== "object") {
    return;
  }
  let cloneObj = Array.isArray(obj) ? [] : {};
  for (let key in obj) {
    cloneObj[key] =
      typeof obj[key] === "object" ? deepClone(obj[key]) : obj[key];
  }
  return cloneObj;
}

// 数组扁平化
function flatDeep(arr, d = 1) {
  return d > 0 ?
    arr.reduce(
      (total, currentValue) =>
      total.concat(Array.isArray(currentValue) ? flatDeep(currentValue, d - 1) : currentValue),
      [] // 初始值(initialValue)是一个空数组
    ) :
    arr
}

// 原型和原型链
function Person() {
  this.name = "jack";
  this.age = 18;
}
Person.prototype.sex = "male";

const person = new Person();
person.name; //jack
person.sex; //male

person._proto_ === Person.prototype; //true
Person.prototype.constructor === Person; //true
Person.prototype._proto_ === Object.prototype; // true
Object.prototype.constructor === Object; // true
Object.prototype._proto_ === null; // true

// 创建对象的多种方式及优缺点
// 1. 工厂模式；
// 缺点：对象无法识别，因为所有的实例都指向一个原型
function createPerson(name, age) {
  let person = new Object();
  person.name = name;
  person.age = age;
  person.sayHi = function() {
    console.log("hi");
  };
  return person;
}
// 2. 构造函数模式；
// 优点：实例可以识别为一个特定的类型
// 缺点：每次创建实例时，每个方法都要被创建一次
function Person(name, age) {
  this.name = name;
  this.age = age;
  this.sayHi = function() {
    console.log("hi");
  };
}
const jack = new Person("jack", 20);

// 3. 原型模式；
// 优点：方法不会每次都被创建
// 缺点：所有的属性和方法都可以共享，不能初始化参数
function Person(name) {}
Person.prototype.name = this.name;
Person.prototype.getName = function() {
  console.log(this.name);
};
const rose = new Person("rose");
rose.getName(); //空字符串  不能初始化参数

// 4. 原型模式优化
// 优点：能传参，可控制私有属性和共享属性
// 缺点：封装性不太好
function Person(name, age) {
  this.name = name;
  this.age = age;
}
Person.prototype = {
  constructor: Person,
  sex: "male",
  getName: function() {
    console.log(this.name);
  }
};
const lily = new Person("lily", 20);
lily.getName();

// 5. 原型模式更好封装
// 缺点：不能使用字面量赋值prototype
function Person(name, age) {
  this.name = name;
  this.age = age;
  if (typeof this.getName !== "function") {
    Person.prototype = {
      constructor: Person,
      sex: "male",
      getName: function() {
        console.log(this.name);
      }
    };
  }
}
// 改写为
function Person(name, age) {
  this.name = name;
  this.age = age;
  if (typeof this.getName !== "function") {
    Person.prototype = {
      constructor: Person,
      sex: "male",
      getName: function() {
        console.log(this.name);
      }
    };
    return new Person(); //加一行
  }
}

// 继承的多种方式及优缺点
// 1. 原型链继承
// 缺点：所有的属性和方法都共享，引用类型, 不能向父级传参
function Parent() {
  this.name = "jack";
  this.hobby = ["a", "b"];
  this.getName = function() {
    console.log(this.name);
  };
}

function Child() {
  this.name = "rose";
}
Child.prototype = new Person();
let child1 = new Child();
child1.hobby.push("c");
let child2 = new Child();
child1.hobby; // ['a', 'b', 'c']
child2.hobby; // ['a', 'b', 'c']  都改变了

// 2. 构造函数继承
// 优点：改变实例的属性不影响父级属性，可以在 Child 中向 Parent 传参
// 缺点：方法都在构造函数中定义，每次创建实例都会创建一遍方法。
function Parse(name) {
  this.name = name;
  this.hobby = [1, 2, 3];
  this.getName = function() {
    console.log(this.name);
  };
}

function Child(name) {
  Parse.call(this, name);
}

let child1 = new Child("jack");
let child2 = new Child("rose");

// 3. 组合继承（原型链+构造函数）
// 优点：融合原型链继承和构造函数的优点，是 JavaScript 中最常用的继承模式。
function Parent(name, age) {
  this.name = name;
  this.age = age;
}
Parent.prototype.getName = function() {
  console.log(this.name);
};

function Child(name, age) {
  Parent.call(this, name, age);
}
Child.prototype = new Parent();
Child.prototype.constructor = Child;

let child1 = new Child("child1", 20);
let child2 = new Child("child2", 22);

// 寄生组合继承
function createObj(o) {
  function F() {}
  F.prototype = o;
  return new F();
}

function prototype(Child, Parent) {
  const prototype = createObj(Parent);
  prototype.constructor = Child;
  Child.prototype = prototype;
}

// JS类型转换
// https://github.com/mqyqingfeng/Blog/issues/159

// 类型判断
// typeof   不能判断数组、json等对象类型
typeof ""; //string
typeof 1; //number
typeof true; //boolean
typeof Symbol(); //symbol
typeof null; //object
typeof undefined; //undefined
typeof []; //object
typeof {}; //object
typeof function() {}; //function
typeof new Date(); //object

// Object.prototype.toString();
Object.prototype.toString.call(new Date())(
  //object Date

  // instanceof：用于检测构造函数的 prototype 属性是否出现在某个实例对象的原型链上。
  [] instanceof Array
); // true

// 数组排序
// 1. 利用数组自带sort方法
function sortArray(arr) {
  const newArr = arr.slice(0);
  if (!Array.isArray(newArr)) {
    return;
  }
  newArr.sort((a, b) => {
    return a - b;
  });
  return newArr;
}

// 2. 冒泡排序算法
// 当前项和后一项进行比较 如果当前项大于后一项则 交换位置
function bubbleSort(arr) {
  const newArr = arr.slice(0);
  for (let i = 0; i < newArr.length; i++) {
    for (let j = 0; j < newArr.length; j++) {
      if (newArr[j] > newArr[j + 1]) {
        const temp = newArr[j];
        newArr[j] = newArr[j + 1];
        newArr[j + 1] = temp;
      }
    }
  }
  return newArr;
}

// 3.快速排序算法
// 创建两个数组(left right) 用中间项和其它项比较，比中间项小的放在左边数组 比中间项大的放在右边数组...
// 左边数组和右边数组均按照以上思路 进行排序
function quickSort(arr) {
  const newArr = arr.slice(0);
  if (newArr.length <= 1) {
    return newArr;
  }
  const midIndex = Math.floor(newArr.length / 2);
  const mid = newArr.splice(midIndex, 1);
  const leftArr = [];
  const rightArr = [];
  for (let i = 0; i < newArr.length; i++) {
    newArr[i] < mid ? leftArr.push(newArr[i]) : rightArr.push(newArr[i]);
  }
  return quickSort(leftArr).concat(mid, quickSort(rightArr));
}

// Promise
// 见promise.js文件




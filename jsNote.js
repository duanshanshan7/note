//js中的8大数据类型
'string'
'number',
'boolean'
null
undefined
'object'
'symbol'
'bigInt'

// object 里面又包含
'正则对象'
'array'
'function'
'date'

// 判断数据类型的四种方法
//1. typeof
typeof 1 //number
typeof 'string' //string
typeof true  //boolean
typeof null //object
typeof undefined //undefined
typeof function(){} //function
typeof Symbol() //symbol
typeof [] /new Date() /new RegExp();  //object

// 2. instanceof
// instanceof 是用来判断 A 是否为 B 的实例，表达式为：A instanceof B，如果 A 是 B 的实例，则返回 true,否则返回 false。
[] instanceof Array; // true
Object() instanceof Object; //true
newDate() instanceof Date; // true
function Person(){};
newPerson() instanceof Person;
[] instanceof Object;// true
newDate() instanceof Object;// true
newPerson instanceof Object;// true


// 3. Object.prototype.toString.call()
Object.prototype.toString.call()

// 4. constructor
[].constructor === Array;  // true

// =================================================================================================
// js的堆栈内存的运行机制
// js之所以能在浏览器中运行，是因为浏览器给js提供了执行环境运行的栈内存
// 浏览器会在计算机内存中分配一块内存，专门用来供代码执行=》栈内存ECStack（Execution Context Stack）执行环境栈，
// 每打开一个网页都会生成一个全新的ECS
// ECS的作用
  // 提供一个供JS代码自上而下执行的环境（代码都在栈中执行）
  // 由于基本数据类型值比较简单，他们都是直接在栈内存中开辟一个位置，把值直接存储进去的，当栈内存被销毁，存储的那些基本值也都跟着销毁

// 堆内存
  // 堆内存：引用值对应的空间
  // 存储引用类型值（对象：键值对， 函数：代码字符串），当内存释放销毁，那么这个引用值彻底没了
  // 堆内存释放
    // 当堆内存没有被任何得变量或者其他东西所占用，浏览器会在空闲的时候，自主进行内存回收，把所有不被占用得内存销毁掉
    // 谷歌浏览器（webkit），每隔一定时间查找对象有没有被占用
    // 引用计数器:当对象引用为0时释放它

// GO VO EO AO
  // GO：全局对象，浏览器会让window指向GO
  // EO 执行上下文
  // VO 变量对象
  // AO 活动对象，函数私有执行上下文中的活动变量，属于VO

// 变量提升机制

// 作用域和作用域链

// 原型和原型链

// 闭包，闭包的两大作用：保存和保护

// 类和实例

// DOM0 DOM2 DOM3事件
  // https://www.jianshu.com/p/3acdf5f71d5b/

// js中this的五种情况
  // 1.给元素的某个事件行为绑定方法，事件触发，方法执行，此时方法中的this一般都是当前元素本身：DOM2事件除外，指向window
  // 2.普通函数执行，它里边的this是谁，取决于方法执行前面是否有“.”，有的话，“.”前面是谁this就是谁，没有的话并且是在非严格模式下this就是window，严格模式下是undefined：
  // 3.构造函数执行(也即是new执行)，函数中的this是当前类的实例
  // 4.箭头函数中没有this，所用到的this都是其上下文中的this(或者说是上级上下文)
  // 5.基于call/apply/bind可以改变函数中this的指向：

// js中的四大继承方案
// 1. 原型继承：子类的原型指向父类的一个实例。
// 2. 构造函数继承：call继承
// 3. 寄生组合继承：call继承+变异版的原型继承共同完成的。
// 4. 


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

// 3. 寄生组合继承
function A() {
  this.x = 100;
}
A.prototype.getX = function getX() {
  console.log(this.x);
};

function B() {
  A.call(this);
  this.y = 200;
}
//=>Object.create(OBJ) 创建一个空对象，让其__proto__指向OBJ（把OBJ作为空对象的原型）
B.prototype = Object.create(A.prototype);
B.prototype.constructor = B; //把constructor补上
B.prototype.getY = function getY() {
  console.log(this.y);
};
let b = new B;
console.log(b);

// 4. ES6中class类
class A {
  constructor() {
      this.x = 100;
  }
  getX() {
      console.log(this.x);
  }
}
//=>extends继承和寄生组合继承基本类似
class B extends A {
  constructor() {
      super(); //=>一但使用extends实现继承，只要自己写了constructor，就必须写super
      this.y = 200;
  }
  getY() {
      console.log(this.y);
  }
}
let b = new B;
// 其实extends继承和寄生组合继承基本类似，而且必须加上super()函数，它相当于A.call(this)。

// 项目中我们会用到继承地方比如自己写插件或者类库的时候，还有就是react中用class实现继承。


// ===========================================================================================
// let、const 和var的区别
// 解构赋值和拓展运算符
// set map weakSet weakMap
// generator生成器函数
// async await原理
// eventLoop 事件循环机制 宏任务，微任务

// ============================================================================================
// ajax核心四部操作
  // 1. 创建一个XMLHttpRequest实例对象。
  let xhr = new XMLHttpRequest;
  // 2. 打开请求连接，配置请求信息。
  xhr.open(method,url,async);
  // 3. 发送AJAX请求，AJAX任务开始，一直到响应主体信息返回代表任务结束
  xhr.send(formData);
  // 4. 监听请求状态——不同的状态做不同的事。
  xhr.onreadystatechange = () => {}

// get/post 的核心机制与区别

// 前端跨域的解决方案
// 1. jsonp 只适用于get
// 2. cros 设置响应头
// 3. proxy代理

// 浏览器输入网址之后发生了什么

// 浏览器渲染原理，回流和重绘，哪些操作会引起回流，如何避免？

// cookie localStorage sessionStorage的区别


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




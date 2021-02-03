class Point {
  constructor() {
    this.x = 1;
    this.y = 2;
  }

  add() {
    return this.x + this.y;
  }
}
function Func() {
  this.x = 2;
  this.y = 3;
  this.add = function () {
    return this.x + this.y;
  };
}

Point.prototype.toString = function () {};
Func.prototype.toString = function () {};
console.log(Object.keys(Point.prototype));
console.log(Object.keys(Func.prototype));

const point = new Point();
console.log(point.x); // 1
console.log(point.y); // 2
console.log(point.add()); // 3

const func = new Func();
console.log(func.x); // 2
console.log(func.y); // 3
console.log(func.add()); // 5

console.log(point, func);

// 遍历对象的三种方法
// 1. for in 只遍历对象自身可枚举的属性，不包括原型链上的属性，不包括不可枚举的属性
// 2. Object.keys 遍历自身和原型链上可枚举的属性， 不包括不可枚举的属性
// 3. Object.getOwnPropertyNames  遍历自身的所有属性，包括可枚举和不可枚举的， 不包括原型链上的属性
for(let key in Point.prototype){
  console.log(key)
}
console.log(Object.keys(Point.prototype))
console.log(Object.getOwnPropertyNames(Point.prototype))

for(let key in point){
  console.log(key)
}
console.log(Object.keys(point))
console.log(Object.getOwnPropertyNames(point))


// getter setter
const MyClass = class Me {
  constructor(){

  }

  get prop(){
    return 123
  }

  set propp(val){
    console.log('set' + val)
  }

  getName(){
    return Me.name
  }
}

const a = new MyClass();
console.log(a.prop)
a.prop = 456;

console.log(a.prop)



// generator函数
function* gen() {
  console.log('start');
  const a = 1;
  const b = 2;
  yield a + b;
  const c = yield b - a;
  console.log(c);
}
let g = gen();
console.log(g);
console.log(g.next()); // start
console.log(g.next());
console.log(g.next(5));

function promise() {
  return new Promise((resolve, reject) => {
    console.log('promise start');
    setTimeout(() => {
      resolve('success');
    }, 2000);
  });
}

// 实现async

function* genFunc() {
  yield 1;
  const res = yield promise();
  console.log(res);
  return res;
}

function run(gen) {
  var g = gen(); //由于每次gen()获取到的都是最新的迭代器,因此获取迭代器操作要放在_next()之前,否则会进入死循环
  function _next(val) {
    return new Promise((resolve, reject) => {
      try {
        const res = g.next(val);
        if (res.done) {
          return resolve(res.value);
        }
        Promise.resolve(res.value).then((val) => _next(val));
      } catch (error) {
        return reject(error);
      }
    });
  }
  return _next();
}

const res = run(genFunc);
console.log(res);

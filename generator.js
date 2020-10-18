// function * gen(){
//   let a = 1;
//   console.log('a:'+a)
//   let b = yield a+1;
//   console.log('b:'+b);
//   yield b + 1
//   return 123;
// }

// console.log(gen());
// console.log(gen().toString());

// let g = gen();
// // console.log(g.next());
// // console.log(g.next(2));
// // console.log(g.next());

// function run(){
//   const {value,done} = g.next();
//   console.log(value);
//   if(!done){
//     run();
//   }
// }
// run();

function* gen(num) {
  let r1 = yield compute(num);
  // console.log(r1, "kkk");
  yield compute(r1);
}

function compute(num) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(num * num);
    }, 2000);
  });
}

// const g = gen(2);
// console.log(g);
// g.next().value.then(res => console.log(res));
function run(gen, num) {
  const g = gen(num);
  function _next(val) {
    const { value, done } = g.next(val);
    console.log(123456, value, done);
    !done
      ? value.then(res => {
          console.log(res);
          _next(res);
        })
      : console.log(value);
  }
  _next();
}

run(gen, 2);

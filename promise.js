// promise A+的三种状态: pending, fulfilled, rejected

const PENDING = 'pending';
const FULFILLED = 'fulfilled';
const REJECTED = 'rejected';

class MyPromise {
  constructor(executer) {
    // console.log('执行了')
    this._status = PENDING;
    this._value = undefined;
    this.resolveQueue = [];
    this.rejectQueue = [];

    const _resolve = (val) => {
      const run = () => {
        if (this._status !== PENDING) {
          return;
        }
        this._status = FULFILLED;
        this._value = val;
        while (this.resolveQueue.length) {
          const cb = this.resolveQueue.shift();
          cb(val);
        }
      };
      setTimeout(run);
    };

    const _reject = (val) => {
      const run = () => {
        if (this._status !== PENDING) {
          return;
        }
        this._status = REJECTED;
        this._value = val;
        while (this.rejectQueue.length) {
          const cb = this.rejectQueue.shift();
          cb(val);
        }
      };
      setTimeout(run);
    };

    executer(_resolve, _reject);
  }

  then(resolveFn, rejectFn) {
    return new MyPromise((resolve, reject) => {
      const fulfilledFn = (val) => {
        typeof resolveFn !== 'function' && (resolveFn = (val) => val);
        typeof rejectFn !== 'function' &&
          (rejectFn = (reason) => {
            throw new Error(reason instanceof Error ? reason.message : reason);
          });
        // 实现链式调用
        try {
          const x = resolveFn(val);
          x instanceof MyPromise ? x.then(resolve, reject) : resolve(x);
        } catch (error) {
          reject(error);
        }
      };

      const rejectedFn = (val) => {
        // 实现链式调用
        try {
          const x = rejectFn(val);
          x instanceof MyPromise ? x.then(resolve, reject) : resolve(x);
        } catch (error) {
          reject(error);
        }
      };

      switch (this._status) {
        case PENDING:
          this.resolveQueue.push(fulfilledFn);
          this.rejectQueue.push(rejectedFn);
          break;
        case FULFILLED:
          fulfilledFn(this._value);
        case REJECTED:
          rejectedFn(this._value);
      }
    });
  }

  catch(rejectFn) {
    return this.then(undefined, rejectFn);
  }

  static resolve(val) {
    return val instanceof MyPromise
      ? val
      : new MyPromise((resolve, reject) => resolve(val));
  }

  static reject(reason) {
    return new MyPromise((resolve, reject) => reject(reason));
  }

  finally(callback) {
    return this.then(
      (res) => MyPromise.resolve(callback()).then(() => res),
      (err) =>
        MyPromise.resolve(callback()).then(() => {
          throw err;
        })
    );
  }

  static all(promiseArr) {
    if (!Array.isArray(promiseArr)) {
      throw new Error('不是数组');
    }
    let index = 0;
    let result = [];
    return new MyPromise((resolve, reject) => {
      promiseArr.forEach((p, i) => {
        MyPromise.resolve(p).then(
          (res) => {
            index++;
            result[i] = res;
            if (index === promiseArr.length) {
              resolve(result);
            }
          },
          (err) => {
            reject(err);
          }
        );
      });
    });
  }

  static race(promiseArr) {
    return new MyPromise((resolve, reject) => {
      for (let p in promiseArr) {
        MyPromise.resolve(p).then(
          (res) => {
            resolve(res);
          },
          (err) => {
            reject(err);
          }
        );
      }
    });
  }
}

const p2 = new MyPromise((resolve, reject) => {
  setTimeout(() => {
    resolve('result-p2');
  }, 2000);
  setTimeout(() => {
    reject('erroe-p2');
  }, 1000);
});

p2.finally();

// 全面测试
const p3 = new MyPromise((resolve, reject) => {
  resolve(1); //同步executor测试
});

p3.then((res) => {
  console.log(res);
  return 2; //链式调用测试
})
  .then() //值穿透测试
  .then((res) => {
    console.log(res);
    return new MyPromise((resolve, reject) => {
      setTimeout(() => {
        resolve(3); //返回Promise测试
      }, 1000);
    });
  })
  .then((res) => {
    console.log(res);
    throw new Error('reject测试'); //reject测试
  })
  .then(
    () => {},
    (err) => {
      console.log(err);
    }
  );

  Promise.all()   //所有为fulfilled状态变为fullfilled ， 有一个为rejected状态变为rejected
  Promise.race()  //有一个率先改变状态就变为这个状态
  Promise.allSettled() //所有都执行完毕才改变状态， 状态总是改变为fullfilled
  Promise.any()  //有一个变为fullfilled则状态变为fullfilled，所有都变为rejected则状态变为rejected
  Promise.try()  //
# note
前端学习笔记
# 面试题合集：https://juejin.im/post/6844903971002253320#heading-1
# https://juejin.im/post/6844904199017218055

# HTML系列

# css系列
1. flex布局？有哪些属性？
2. 什么是BFC，如何触发BFC？
3. 创建BFC：
  float
  position: absolute | fixed
  display: inline-block | flex | table-cell
  overflow: hidden | auto | scroll | !visible
4. css盒模型
5. 元素水平垂直居中？
6. 清除浮动的方法有哪些？
7. CSS中 link 和@import 的区别是什么？
8. css动画，transition和animation的区别？
9. css优先级
10. 使元素消失的方法：visibility:hidden、display:none、z-index=-1、opacity：0
11. 网页的层叠等级(z-index)？
    background/border -> z-index为负值 -> 块级元素 -> 浮动元素 -> 行内元素 -> z-index=0/auto/没有设置z-index -> z-index为正值
12. 

# JavaScript系列
1. 异步解决方案，promise原理，promise.all, promise.race
  -----------补充点面试题-----------------
2. async await
  -----------补充点面试题-----------------
3. 把一个伪数组变成真实的数组
  [...obj]
  Array.from(obj)
4. this的理解
5. 原型&原型链的理解
6. 什么是闭包？有什么作用？
7. js eventLoop，宏任务，微任务？
8. 作用域&作用域链的理解
9. call apply bind的作用和区别
10. 常用的数组方法
11. js中的数据类型
12. 判断数据类型的方法，typeof，instanceof的区别
13. ES6中的模块化，import和require相比有什么优点？
14. 继承的概念，实现继承的几种方式
15. 箭头函数和普通函数的区别
16. 判断一个对象是否是数组有哪些方法
17. 创建对象的方法，优缺点
18.  DOM事件流和事件委托
19. new操作符都做了些什么
20. 跨域的解决方案
21. 数组去重的方法


# js手写系列
1. call
2. apply
3. bind
4. new
5. instanceOf
6. 防抖函数 debounce
7. 节流函数 throttle
8. 数组深拷贝 deepClone
9. 数组扁平化 flat
10. promise，promise.all
11. 组合继承，寄生继承
12. 数组冒泡排序、快速排序
13. 创建对象的方法


# http系列
1. 输入一个网址到页面显示发生了什么？
2. http状态码
3. http中的请求方法
4. http的请求头和响应头
    请求头：
      accept-encoding 告诉服务器，我接收的数据支持压缩格式
      if-modified-since 对比缓存  修改时间
      if-none-match 摘要缓存  和Etag配对使用的
      user-agent 不同设备自动带上这个头   判断什么样的设备，重定向到不同项目

    响应头：
      Content-Type  告诉浏览器  我给你的内容的类型
      Content-Encoding  告诉浏览器  我给你的内容的压缩格式
      Cache-Control 强制缓存  告诉浏览器，你多长时间之间，不要来访问我
      Expires  强缓   告诉浏览器，你多长时间之间，不要来访问我
      Last-Modified 对比缓存 和 if-modified-since 配对使用
      Etag   根据摘要做缓存   和 if-none-match 配对使用
      Lotaion  重定向到 某个地方
5. http和https有什么不同？
6. localStorage, sessionStorage, cookie, session有什么区别？
7. 什么是web缓存？
8. 常见的web安全及防护原理？
  sql注入原理：是将sql代码伪装到输入参数中，传递到服务器解析并执行的一种攻击手法。
  XSS（跨站脚本攻击）：往web页面插入恶意的html标签或者js代码。
  CSRF(跨站请求伪装）：通过伪装来自受信任用户的请求


# react系列
1. 虚拟DOM，如何转化为真正的DOM
2. react中key的作用
3. 触发多次setstate，render会执行几次？
4. react生命周期
5. React 中 refs 的作用是什么？
6. 状态提升
7. 受控组件和非受控组件
8. React 中有哪些构建组件的方式？
9. 什么是上下文Context?
10. hooks相关
---------------补充面试题-----------

# react-router



# react-redux
1. redux数据流
2. action里面异步事件？


# react-native系列


# webpack系列
1. webpack是什么
2. webpack有哪些功能
3. 打包原理，构建过程
4. 什么是loader，plugins?
5. 常见的loader
6. loader与plugin的区别？
7. plugin
8. webpack优化


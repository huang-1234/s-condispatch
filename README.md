# use-egg-build-middle

内容分发中台

## QuickStart

<!-- add docs here for user -->

see [egg docs][egg] for more detail.

### Development

```bash
$ npm i
$ npm run dev
$ open http://localhost:7001/
```

### Deploy

```bash
$ npm start
$ npm stop
```

### npm scripts

- Use `npm run lint` to check code style.
- Use `npm test` to run unit test.
- Use `npm run autod` to auto detect dependencies upgrade, see [autod](https://www.npmjs.com/package/autod) for more detail.


[egg]: https://eggjs.org

## 介绍

我们的所有数据的获得和业务逻辑的操作都是通过中台实现的，也就是说中台只提供接口，这里的设计我们采用RESTful的规则，让egg为前端提供Api接口，实现中台主要的功能。

RESTful简介和约束方式
RESTful是目前最流行的网络应用程序设计风格和开发方式，大量使用在移动端App上和前后端分离的接口设计。这种形式更直观并且接口也有了一定的约束性。

> 约束的请求方式和对应的操作。

GET(SELECT) ： 从服务端取出资源，可以同时取出一项或者多项。
POST(CREATE) ：在服务器新建一个资源。
PUT(UPDATE) ：在服务器更新资源（客户端提供改变后的完整资源）。
DELETE(DELETE) ：从服务器删除资源。
还有一些不常用的请求方式，因为不常用,这里就不作过多的介绍了。

> 在egg.js中Api接口的路由配置

首先打开service根目录下的controller文件夹，在这个文件夹中新建两个文件夹admin（管理端使用的所有API接口）和default（客户端使用的所有API接口）文件夹。

目前我们只有客户端（前台）的页面，所以先在default目录下建立一个home.js文件，用于前台首页所需要的api接口。
/service/app/controller/default/home.js
/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1620896559869_5567';

  // add your middleware config here
  config.middleware = [];

  // 配置mysql
  config.mysql = { // database configuration
    client: {
      // host
      host: 'localhost',
      // port
      port: '3306',
      // username
      user: 'root',
      // password
      password: 'huang',
      // database
      database: 'react_blog',
    },
    // load into app, default is open
    app: true,
    // load into agent, default is close
    agent: false,
  };
  // 配置跨域相关的
  config.security = {
    csrf: {
      enable: false,
    },
    domainWhiteList: [ '*' ], // *表示所有都可以跨域，后面可以仔细研究一下
    // domainWhiteList: ['http://127.0.0.1:3000' ],
  };
  config.cors = {
    // origin: '*', // *表示所有的都可以
    origin: 'http://localhost:3000', //
    // origin: 'http://127.0.0.1:3000', //
    credentials: true, // 表是否允许cookie进行跨域,前后台共享session
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH,OPTIONS',
  };
  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  return {
    ...config,
    ...userConfig,
  };
};

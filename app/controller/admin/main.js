'use strict';

const Controller = require('egg').Controller;

class MainController extends Controller {
  async index() {
    const { ctx } = this;
    ctx.body = 'hello admin';
  }
  // login interface
  async checkLogin() {
    // 这个地方接收的username和password可以使用md5加密
    const { ctx, app } = this;
    const username = ctx.request.body.username;
    const password = ctx.request.body.password;
    const sql = "SELECT admin_user.username FROM admin_user WHERE admin_user.username = '" + username + "'AND admin_user.password = '" + password + "'";
    const res = await app.mysql.query(sql);
    console.log('admin/main.js--mysql.query(sql):', res);
    // 判断数据库中是否有该用户
    if (res.length > 0) {
      const loginTips = `login_successfully! username is ${username}, it password is ${password}`;
      console.log(loginTips);
      const openID = new Date().getTime();
      // 应该是这里存储session.openID的时候错了
      ctx.session.openID = { 'openID': openID };
      // 传一个sessionID，方便后续就不用频繁的访问数据库了
      ctx.body = {
        'data': 'login_successfully',
        'openID': openID,
      };
    } else {
      ctx.body = {
        data: 'failed_login',
      };
    }
  }

  // get info of article class
  async getTypeInfo() {
    const { app, ctx } = this;
    const artiType = await app.mysql.select('type');
    console.log('admin/main--artiType:', artiType);
    ctx.body = { data: artiType };
  }
}

module.exports = MainController;

'use strict';

const Controller = require('egg').Controller;
const { LOGIN_SUCCESSFULLY, LOGIN_FAILED } = require("../constant/login")

class User extends Controller {
  async index() {
    const { ctx } = this;
    ctx.body = 'hello user';
  }
  // login interface
  async checkLogin() {
    // 这个地方接收的username和password可以使用md5加密
    const { ctx, app } = this;
    const { username, password } = ctx.request.body;
    const res = await ctx.service.admin.user.findUser(username, password)
    // console.log('admin/main.js--mysql.query(sql):', res);
    // 判断数据库中是否有该用户
    if (res.length > 0) {
      const loginTips = `login_successfully! username is ${username}, it password is ${password}`;
      console.log(loginTips);
      const openID = new Date().getTime();
      // 应该是这里存储session.openID的时候错了
      ctx.session.openID = { 'openID': openID };
      console.log('ctx.session.openID<<', ctx.session.openID);
      // 传一个sessionID，方便后续就不用频繁的访问数据库了
      ctx.body = {
        data: LOGIN_SUCCESSFULLY,
        openID,
      };
    } else {
      ctx.body = {
        data: LOGIN_FAILED,
      };
    }
  }

  async register() {
    const { ctx, app } = this

  }
}

module.exports = User;

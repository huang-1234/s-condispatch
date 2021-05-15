'use strict';

const Controller = require('egg').Controller;

class MainController extends Controller {
  async index() {
    const { ctx } = this;
    ctx.body = 'hello admin';
  }
  async checkLogin() {
    // 这个地方接收的username和password可以使用md5加密
    const { ctx, app } = this;
    const username = ctx.request.body.username;
    const password = ctx.request.body.password;
    const sql = "SELECT admin_user.username FROM admin_user WHERE admin_user.username = '" + username + "'AND admin_user.password = '" + password + "'";
    const res = await app.mysql.query(sql);
    console.log(res);
    if (res.length > 0) {
      const openID = new Date().getTime();
      ctx.session.openID = { openID };
      // 传一个sessionID，方便后续就不用频繁的访问数据库了
      ctx.body = {
        data: 'login_successfully',
        openID,
      };
    } else {
      ctx.body = {
        data: 'failed_login',
      };
    }
  }
}

module.exports = MainController;

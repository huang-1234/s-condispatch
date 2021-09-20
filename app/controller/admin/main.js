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
    // const sql = "SELECT admin_user.username FROM admin_user WHERE admin_user.username = '" + username + "'AND admin_user.password = '" + password + "'";
    const sql = `SELECT admin_user.username FROM admin_user WHERE admin_user.username = ${username} AND admin_user.password = ${password}`;
    const res = await app.mysql.query(sql);
    console.log('admin/main.js--mysql.query(sql):', res);
    // 判断数据库中是否有该用户
    if (res.length > 0) {
      const loginTips = `login_successfully! username is ${username}, it password is ${password}`;
      console.log(loginTips);
      const openID = new Date().getTime();
      // 应该是这里存储session.openID的时候错了
      // eslint-disable-next-line quote-props
      ctx.session.openID = { 'openID': openID };
      console.log('ctx.session.openID<<', ctx.session.openID);
      // 传一个sessionID，方便后续就不用频繁的访问数据库了
      ctx.body = {
        // eslint-disable-next-line quote-props
        data: 'login_successfully',
        // eslint-disable-next-line quote-props
        openID,
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

  // 保存文章，添加文章的接口
  async addArticle() {
    const { ctx, app } = this;
    const tmpArticle = ctx.request.body;
    console.log('service/con/admin/main.js--addtmpArticle:', tmpArticle.articleId, tmpArticle.title);
    const result = await app.mysql.insert('article', tmpArticle);
    const insertSuccess = result.affectedRows === 1;
    const insertId = result.insertId;
    console.log('service/con/admin/main.js--await app.mysql.insert:', result);

    ctx.body = {
      isSuccess: insertSuccess,
      // eslint-disable-next-line object-shorthand
      insertId: insertId,
    };
  }

  // 修改文章
  async updateArticle() {
    const { ctx, app } = this;
    const tmpArticle = ctx.request.body;
    console.log('/admin/main.js--tmpArticle--', tmpArticle);
    const result = await app.mysql.update('article', tmpArticle);
    const updateSuccess = result.affectedRows === 1;
    console.log('service/con/admin/main.js--updatetmpArticle:', tmpArticle.articleId, tmpArticle.title);
    console.log('service/con/admin/main.js--updateSuccess:', updateSuccess, result.affectedRows);
    ctx.body = {
      isScuccess: updateSuccess,
    };
  }

  // 获得文章列表
  async getArticleList() {
    const { ctx, app } = this;
    const sql = 'SELECT article.articleId as id,' +
      'article.title as title,' +
      'article.introduce as introduce,' +
      'article.view_count as view_count,' +
      "FROM_UNIXTIME(article.addTime,'%Y-%m-%d' ) as addTime," +
      'type.typeName as typeName ' +
      'FROM article LEFT JOIN type ON article.type_id = type.Id ' +
      'ORDER BY article.articleId DESC ';

    const resList = await app.mysql.query(sql);
    ctx.body = { list: resList };

  }

  // 删除文章
  async delArticle() {
    const { ctx, app } = this;
    const id = ctx.params.id;
    // eslint-disable-next-line quote-props
    const res = await app.mysql.delete('article', { 'id': id });
    ctx.body = { data: res };
  }

  // 根据文章ID得到文章详情，用于修改文章
  async getArticleById() {
    const { ctx, app } = this;
    const id = ctx.params.id;
    console.log('getArticleById-----:', id);
    const sql = 'SELECT article.articleId as id,' +
      'article.title as title,' +
      'article.introduce as introduce,' +
      'article.article_content as article_content,' +
      "FROM_UNIXTIME(article.addTime,'%Y-%m-%d' ) as addTime," +
      'article.view_count as view_count ,' +
      'type.typeName as typeName ,' +
      'type.id as typeId ' +
      'FROM article LEFT JOIN type ON article.type_id = type.Id ' +
      'WHERE article.articleId=' + id;
    const result = await app.mysql.query(sql);
    console.log('getArticleById/result', result);
    ctx.body = { data: result };
  }
}

module.exports = MainController;

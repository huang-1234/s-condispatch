// app/service/main.js
const Service = require("egg").Service

class ArticleService extends Service{
  async qArticleById(id) {
    const { ctx, app } = this;
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
    return await app.mysql.query(sql);
  }
}
module.exports = ArticleService;
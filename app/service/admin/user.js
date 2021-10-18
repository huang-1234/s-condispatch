// app/service/main.js
const Service = require("egg").Service

class UserService extends Service{
  async findUser(_username, _password) {
    const { ctx, app } = this;
    // const sql = "SELECT admin_user.username FROM admin_user WHERE admin_user.username = '" + username + "'AND admin_user.password = '" + password + "'";
    // const sql = `SELECT admin_user.username FROM admin_user WHERE admin_user.username = ${username} AND admin_user.password = ${password}`;
    // const res = await app.mysql.query(sql);
    const res = await app.mysql.select('admin_user', {
      columns: ['username','password'],
      where: {
        username: _username,
        password: _password
      }
    })
    return res
  }
}
module.exports = UserService;
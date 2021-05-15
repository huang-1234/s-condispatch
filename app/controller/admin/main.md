## mysql查询
关于去mysql查询username和password，用来登录的问题
就是一个字符串转换为一个合法的SQL语句

```js
    const sql = "SELECT admin_user.username FROM admin_user WHERE admin_user.username = '" + username + "'AND admin_user.password = '" + password + "'";
```
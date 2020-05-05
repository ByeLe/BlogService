var mysql = require('mysql');
var connection = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '123456',
    port: '3306',
    database: 'blogdb',
});
const dbHandle = {
    sqlParams: '',
    sqlHandle: function(sql,values) {
        return new Promise((resolve, reject) => {
            connection.getConnection(function(err, connection) {
                if (err) {
                    reject(err)
                } else {
                    connection.query(sql, values, (err, rows) => {

                        if (err) {
                            console.log(err);
                            reject(err)
                        } else {
                            resolve(rows)
                        }
                        // 结束会话
                        connection.release()
                    })
                }
            })
        })
    },
}

module.exports = dbHandle;
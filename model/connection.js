const mysql = require('mysql');

class Connection {
    configToMysql = {
        host: 'localhost',
        user: 'root',
        password: '123456',
        charset: 'utf8_general_ci',
        database: 'management'
    }

    getConnection() {
        return mysql.createConnection(this.configToMysql);

    }
    connected() {
        this.getConnection().connect(err => {
            if (err) {
                console.log(err)
            }else {
                console.log('connection success')
            }
        })
    }
}
module.exports = new Connection();
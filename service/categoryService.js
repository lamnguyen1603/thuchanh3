const connection = require('../model/connection');
connection.connected()
class CategoryServices {
    findAll() {
        let connect = connection.getConnection();
        return new Promise((resolve, reject) => {
            connect.query('select * from category;', (err, categories) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(categories)
                }
            })
        })

    }
}
module.exports = new CategoryServices()
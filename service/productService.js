const connection = require('../model/connection');
connection.connected()

class ProductService {
    findAll() {
        let connect = connection.getConnection();
        return new Promise((resolve, reject) => {
            connect.query('select * from  product p join category c on p.idCategory = c.idCategory;', (err, products) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(products)
                }
            })
        })

    }

    save(product) {
        let connect = connection.getConnection();
        connect.query(`insert into product(name,price,quality,color ,description,idCategory)
                       VALUES ('${product.name}',${product.price},${product.quality}, '${product.color}','${product.description}',${product.idCategory});`, (err) => {
            if (err) {
                console.log(err)
            }
        })

    }

     remove(id) {
        let connect = connection.getConnection();
        let sql = `delete
                   from management.product
                   where id = ${id}`
        return new Promise((resolve, reject) => {
            connect.query(sql, (err) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(id)
                }
            })
        })
    }

    findById(id) {
        let connect = connection.getConnection();
        let sql = `select *
                   from product
                   where id = ${id}`;
        return new Promise((resolve, reject) => {
            connect.query(sql, (err, product) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(product)
                }
            })
        })
    }

    edit(product,id) {
        let connect1 = connection.getConnection();

        return new Promise((resolve, reject) => {
            connect1.query( `update product
                   set name        = '${product.name}',
                       price       = ${product.price},
                       quality = ${product.quality},
                       color = '${product.color}',
                       description = '${product.description}'
                       idCategory = ${product.idCategory}
                   where id = ${id}`, (err,product) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(product)
                }
            })
        })
    }

    searchProduct(product){
        let connect = connection.getConnection();
        let sql = `select * from  product p join category c on p.idCategory = c.idCategory where nameCategory like '%${product}%'`
        return new Promise((resolve, reject) => {
            connect.query(sql, (err, list) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(list)
                }
            })
        })
    }
}


module.exports = new ProductService();
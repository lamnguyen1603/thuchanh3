const fs = require('fs');
const productService = require('../../service/productService');
const categoryService = require('../../service/categoryService');
const qs = require('qs');

class HomeHandleRouter {
    static getHomeHtml(homeHtml, products) {
        let tbody = '';
        console.log(3, products)
        products.map((products, index) => {
            tbody += `
                    <tr>
                     <td>${index + 1}</td>
                     <td>${products.name}</td>
                     <td>${products.price}</td>
                     <td>${products.quality}</td>
                     <td>${products.color}</td>
                     <td>${products.nameCategory}</td>
                     <td>
                       <a href="/delete/${products.id}" <button>xoa</button>
                     </td>
                     <td>
                       <a href="/edit/${products.id}" <button>sua</button>
                     </td>

                   </tr>`
        })
        homeHtml = homeHtml.replace('{products}', tbody);
        return homeHtml


    }

    showHome(req, res) {
        if (req.method === 'GET') {
            fs.readFile('./views/home.html', "utf-8", async (err, homeHtml) => {
                if (err) {
                    console.log(err.message)
                } else {
                    let products = await productService.findAll();
                    homeHtml = HomeHandleRouter.getHomeHtml(homeHtml, products)
                    res.writeHead(200, 'text/html');
                    res.write(homeHtml);
                    res.end();
                }
            })
        } else {
            let data = '';
            req.on('data', chunk => {
                data += chunk;
            })
            req.on('end', async err => {
                if (err) {
                    console.log(err)
                } else {
                    let search = qs.parse(data);
                    fs.readFile('./views/home.html', 'utf-8', async (err, indexHtml) => {
                        if (err) {
                            console.log(err)
                        } else {

                            let product = await productService.searchProduct(search.search)
                            console.log(product)
                            indexHtml = HomeHandleRouter.getHomeHtml(indexHtml, product)
                            res.writeHead(200, 'text/html');
                            res.write(indexHtml);
                            res.end();
                        }
                    })
                }
            })

        }
    }

    createProduct(req, res) {
        if (req.method === 'GET') {
            fs.readFile('./views/create.html', "utf-8", async (err, createHtml) => {
                if (err) {
                    console.log(err.message)
                } else {
                    let categories = await categoryService.findAll()
                    let options = ''
                    console.log(categories)
                    categories.map(category => {
                        options += `
                         <option value=${category.idCategory}>${category.nameCategory}</option>`
                    })
                    createHtml = createHtml.replace('{categories}',options)
                    res.writeHead(200, 'text/html');
                    res.write(createHtml);
                    res.end();
                }
            })
        } else {
            let data = '';
            req.on('data', chunk => {
                data += chunk;
            })
            req.on('end', err => {
                if (err) {
                    console.log(err)
                } else {
                    const product = qs.parse(data);
                    productService.save(product)
                    res.writeHead(301, {'location': '/home'});
                    res.end();
                }
            })
        }

    }


    deleteProduct(req, res, id) {
        if (req.method === 'GET') {
            fs.readFile('./views/delete.html', "utf-8", async (err, deleteHtml) => {
                if (err) {
                    console.log(err.message)
                } else {
                    res.writeHead(200, 'text/html');
                    deleteHtml = deleteHtml.replace('{id}', id);
                    res.write(deleteHtml);
                    res.end();
                }
            })
        } else {
            productService.remove(id).then(() => {
                res.writeHead(301, {'location': '/home'});
                res.end();
            })

        }

    }

    editProduct(req, res, id) {
        if (req.method === 'GET') {

            fs.readFile('./views/edit.html', "utf-8", async (err, editHtml) => {
                if (err) {
                    console.log(err.message)
                } else {

                    let product = await productService.findById(id)
                    let categorys =await categoryService.findAll();
                    let options = '';

                    categorys.map(category => {
                        options += `
                         <option value = ${category.idCategory}>${category.nameCategory}</option>`
                    })
                    editHtml = editHtml.replace('{name}', product[0].name);
                    editHtml = editHtml.replace('{price}', product[0].price);
                    editHtml = editHtml.replace('{quality}', product[0].quality);
                    editHtml = editHtml.replace('{color}', product[0].color);
                    editHtml = editHtml.replace('{description}', product[0].description);
                    editHtml = editHtml.replace('{categories}',options);
                    editHtml = editHtml.replace('{id}', id);
                    res.writeHead(200, 'text/html');
                    res.write(editHtml);
                    res.end();
                }
            })
        } else {
            let data1 = '';
            req.on('data', chunk => {
                data1 += chunk;
            })
            req.on('end', async err => {
                if (err) {
                    console.log(err)

                } else {
                    const product = qs.parse(data1);
                    await productService.edit(product, id)
                    res.writeHead(301, {'location': '/home'});
                    res.end();
                }
            })


        }

    }


}

module.exports = new HomeHandleRouter();
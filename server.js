const http = require('http');
const url = require('url');
const router = require('./controller/router');//duong dan
const notFound = require('./controller/handleRouter/notFound');
const server = http.createServer((req, res) => {
    let pathName = url.parse(req.url, true).pathname;//
    const arrPath = pathName.split('/');//[,'home']
    let trimPath = '';
    let id = '';
    if (arrPath.length < 3 ) {
        trimPath = arrPath[arrPath.length - 1];
    } else {
        trimPath = arrPath[arrPath.length - 2];
        id = arrPath[arrPath.length - 1];
    }
    let chosenHandle;
    if (typeof router[trimPath] === 'undefined') {
        chosenHandle = notFound.handleNotFound;
    } else {
        chosenHandle = router[trimPath];

    }
    chosenHandle(req, res, id);
})
server.listen(8080, () => {
    console.log('server is running')
})
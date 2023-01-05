const homeHandleRouter = require('../../../ktrathuchanh/src/controller/handleRouter/homeHandleRouter');
const router = {
    'home': homeHandleRouter.showHome,
    'create' : homeHandleRouter.createProduct,
    'delete' : homeHandleRouter.deleteProduct,
    'edit' : homeHandleRouter.editProduct,
}
module.exports = router;
const router = require("express").Router();
const productController = require("../controllers/productController");

router.get("/", productController.getAllProducts);

router.get("/cart", productController.getCart);

router.get("/:prodId", productController.getProductById);

router.post("/", productController.createProduct);

router.patch('/:prodId', productController.updateProduct);

router.delete('/:prodId', productController.deleteProduct);

module.exports = router;

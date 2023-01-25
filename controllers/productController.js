const Product = require('../models/product');

exports.createProduct = (req, res, next) => {
    // Product.create({
    //   title: "Title P2",
    //   price:"199.99",
    //   imageUrl:"imageurl.com",
    //   description:"this is the third sequelize product"  
    // })
    req.user.createProduct({ // this method automatically created by sequelize when we define association
        title: req.body.title,
        price: req.body.price,
        imageUrl: req.body.imageUrl,
        description: req.body.description
    })
    .then(result => {
        console.log(result);
        // res.end();
        res.send({'message':'product created', "result":result});
    })
    .catch(error => {
        console.log(error)
        res.status(400).send({'error':'hitting create products'});
    });
}

exports.deleteProduct = (req, res, next) => {
    Product
    .findByPk(req.params.prodId)
    .then(product => {
        // res.send({"message": "product found", "product":product});
        return product.destroy();
    })
    .then(result => {
        res.send('product deleted succesfully');
    })
    .catch(error => {
        console.log(error)
        res.send('product not found, please enter a valid id')
    })
}

exports.updateProduct = (req, res, next) => {
    // Product
    // .findByPk(req.params.prodId)
    req
    .user
    .getProducts({where: {id : req.params.prodId}}) // added by sequelize as per association defined
    .then(products => {
        const product = products[0]
        product.title = req.body.title;
        product.price = req.body.price;
        product.imageUrl = req.body.imageUrl;
        product.description = req.body.description;
        return product.save();
    })
    .then(result => {
        console.log({'message':'Product Update!', 'result':result});
        res.send({'message':'hitting update products', 'result':result});
    })
    .catch(error => {
        console.log(error)
        res.send({"message": "no product forund with provided id", "error": error})
    });
}

exports.getCart = (req, res, next) => {
    req
    .user
    .getCart()
    .then(cart => {
        console.log(cart)
        cart.getProducts()
    })
    .then(result => {
        res.send({'message':'cart api hit', 'cart': result});
    })
    .catch(error => {
        console.log(error)
        res.send({'message':'cart not found', 'error':error})
    })
};

exports.addProductToCart = (req, res, next) => {
    
}

exports.getAllProducts = (req, res, next) => {
    // Product
    // .findAll()
    req
    .user
    .getProducts()
    .then(result => {        
        res.send({'message':'hitting getAllProducts products', 'result': result});
    })
    .catch(error => {
        console.log(error)
        res.status(400).send({'message': error});
    });
}

exports.getProductById = (req, res, next) => {
    // Product
    // .findByPk(req.params.prodId)
    req
    .user
    .getProducts({where: {id: req.params.prodId}})
    .then(products => {        
        res.send({'message':'hitting getProductById products', 'result': products});
    })
    .catch(error => {
        console.log(error)
        res.status(400).send({'message': error});
    });

    // Product
    // .findAll({where: {id: req.params.prodId}})
    // .then(result => {        
    //     res.send({'message':'hitting getProductById products', 'result': result});
    // })
    // .catch(error => {
    //     console.log(error)
    //     res.status(400).send({'message': error});
    // });
}
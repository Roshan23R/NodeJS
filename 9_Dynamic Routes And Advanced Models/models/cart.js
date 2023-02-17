const fs = require('fs');
const path = require('path');

const p = path.join( 
    path.dirname(
    process.mainModule.filename),
    'data',
        'cart.json');

module.exports = class Cart{
    static addProductToCart(id, productPrice) {
    //fetch the previous cart
        fs.readFile(p, (err, fileContent) => {
            let cart = { products: [], totalPrice: 0 };
            if (!err) {
                cart = JSON.parse(fileContent);
            }
            // analyze the cart => find existing product

            const existingProductIndex = cart.products.findIndex(prod => prod.id === id);
            const existingProduct = cart.products[existingProductIndex];
            let updatedProduct;
            //add the product to the cart
            if (existingProduct) {
                updatedProduct = { ...existingProduct };
                updatedProduct.quantity = updatedProduct.quantity + 1;
                cart.products = [...cart.products];
                cart.products[existingProductIndex] = updatedProduct;
            }
            else {
                updatedProduct = { id: id, quantity: 1 };
                cart.products = [...cart.products, updatedProduct];
            }
        
            cart.totalPrice = cart.totalPrice + parseInt(productPrice) ;
            fs.writeFile(p, JSON.stringify(cart), (err) => {
                console.log(err);
            }); 
        });
    }
}
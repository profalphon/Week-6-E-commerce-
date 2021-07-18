//Base router for to import or displays all the products in the app
const products = require('../model/products.js')

//Create another router to get all products.

const getProduct = (req, res) => {
    return res.json(products);
}

//Create route to get a specific product

const getSpecificProduct = (req, res) => {
    let productId = Number(req.params.id);
    let findProduct = products.find((product) => product.id === productId);

    //stage for sending an error message, if the product id is not found
    if (!findProduct) {
        return res.status(404).send(`Product ${productId} not available!`);
    } else {
        return res.json(findProduct);
    }

}

//Create a post request 
const createProduct = (req, res) => {

    if (!req.body.name || !req.body.description || !req.body.image || !req.body.price) {
        return res.status(400).send('All fields marked with * are required.')
    } else {

        //Creating a new product
        let newProduct = {
            id: products.length + 1,
            name: req.body.name,
            description: req.body.description,
            image: req.body.image,
            price: req.body.price
        }
        //adding product to the products array and display list of products
        products.push(newProduct);
        return res.json(products)

    }

}

//Updating a product
const updateProduct = (req, res) => {
    let productId = Number(req.params.id);
    let body = req.body;

    //finding specific product by id
    let product = products.find((product) => product.id === productId);

    //get the position of the the product in the product array
    let indexOfProduct = products.indexOf(product);
    if (!product) {
        res.status(404).send(`Product ${productId} not found`)
    } else {
        //update old product with the new changes
        let updateProduct = { ...product, ...body };
        products[indexOfProduct] = updateProduct;
        return res.json(updateProduct)
    }
}

//Delete a product
const deleteProduct = (req, res) => {
    let productId = Number(req.params.id);
    let deleteProduct = products.filter((product) => product.id !== productId);
    if (!deleteProduct) {
        return res.status(404).send(`Product ${productId} not found`);
    } else {
        //return only the remaining products
        products = deleteProduct;
        return res.json(products);
    }
}
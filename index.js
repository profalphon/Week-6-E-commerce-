const express = require('express');
const app = express();

//IThis would import products.
let products = require('./model/Product.js')

const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(express.urlencoded({extended: true}));

//Base router for to displays all the products in the app
app.get('/', (req, res) =>{
    res.json(products)
})

//Create another router to get all products.

app.get('/products', (req, res) =>{
    res.json(products)
})

//Create route to get a specific product

app.get('/products/:id', (req, res) =>{
    let productId = Number(req.params.id);
    let getProduct = products.find((product) => product.id === productId);
//stage for sending an error message, if the product id is not found
    if(!getProduct){
        res.status(404).send(`Cannot find product with id of ${productId}`);
    }else {
        res.json(getProduct);
    }
});

//Create a post request 
app.post('/products', (req, res) =>{
    if(!req.body.name || !req.body.description || !req.body.image || !req.body.price){
        res.status(400).send('Please, fill all the required fields.')
    }else{

//Create a new product
let newProduct = {
    id: products.length + 1,
    name: req.body.name,
    description: req.body.description,
    image: req.body.image,
    price: req.body.price
}
    //adding product to the product array and display products
    products.push(newProduct);
    res.json(products)

    }

})

//Updating a product using 'put' method
app.put('/products/:id', (req, res) =>{
    let productId = Number(req.params.id);
    let body = req.body;
    
    //finding specific product by id
    let product = products.find((product) => product.id === productId);
    //get the position of the the product in the product array
    let indexOfProduct = products.indexOf(product);
    if(!product){
        res.status(404).send(`Product with id of ${productId} not found`)
    }else{
        //update old product with the new changes
        let updateProduct = {...product, ...body};
        products[indexOfProduct] = updateProduct;
        res.json(updateProduct)
    }
})

//Delete a product
app.delete('/products/:id',(req,res) =>{
    let productId = Number(req.params.id);
    let deleteProduct = products.filter((product) => product.id !== productId);
    if(!deleteProduct){
        res.status(404).send(`Product with id of ${productId} not found`);
    }else{
         //return only the remaining products
        products = deleteProduct;
        res.json(products);
    }
})
app.listen(PORT, ()=>{
    console.log(`Server running on http://127.0.0.1:${PORT}`)
})

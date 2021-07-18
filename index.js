const express = require('express');
const app = express();

//This would import products.
const productRoutes = require('./routes/productsRoute.js')
const userRoutes = require('./routes/usersRoute.js')

const PORT = process.env.PORT || 8080;

//parse json
app.use(express.json());
app.use(express.urlencoded({extended: true}));

//Create a product route
app.use('/products', productRoutes);

// User route
app.use('/users', userRoutes);

app.listen(PORT, ()=>{
    console.log(`Server running on http://127.0.0.1:${PORT}`)
})
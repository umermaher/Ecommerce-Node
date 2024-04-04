const Product = require('../model/product.model.js');
const apiResponse = require('../utils/api_response.js')

const createProduct = async (req, res) => {

    try {
        const product = await Product.create(req.body);
        const response = apiResponse(200, 'Product created successfully', product);
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json(
            apiResponse(500, error.message)
        );
    }

}

const getProducts = async (req, res) => {
    
    try {
        const products = await Product.find({});
        const response = apiResponse(200, 'Products fetched successfully', products);
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json(
            apiResponse(500, error.message)
        );
    }

}

const getProduct = async (req, res) => {
    
    try {
       const { id } = req.params;
       const product = await Product.findById(id);
       if(!product) {
           return res.status(404).json(
               apiResponse(404, 'Product not found!')
           );
       }
       const response = apiResponse(200, 'Product Fetched successfully!', product);
       res.status(200).json(response);
    } catch (error) {
       res.status(500).json(
        apiResponse(500, error.message)
       );
    }

}

const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findByIdAndUpdate(id, req.body);

        if(!product) {
            return res.status(404).json(
                apiResponse(404, 'Product not found!')
            );
        }

        const updateProduct = await Product.findById(id);
        const response = apiResponse(200, 'Product Updated successfully!', updateProduct);
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json(
            apiResponse(500, error.message)
        );
    }
}

const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findByIdAndDelete(id)

        if(!product) {
            return res.status(404).json(
                apiResponse(404, 'Product not found!')
            );
        }

        const response = apiResponse(200, 'Product Deleted successfully!');
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json(
            apiResponse(500, error.message)
        );
    }
}

module.exports = {
    createProduct,
    getProducts,
    getProduct,
    updateProduct,
    deleteProduct
}

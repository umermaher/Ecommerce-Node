const Product = require('../model/product.model.js');
const apiResponse = require('../utils/api_response.js');
const StatusCode  = require('../utils/status_code.js');
const User = require('../model/user.model.js');

const createProduct = async (req, res) => {

    try {
    
        req.body.createdBy = req.userId;
        const product = await Product.create(req.body);

        apiResponse(
            res, StatusCode.OK, 'Product created successfully', product
        );
    } catch (error) {
        apiResponse(
            res, StatusCode.INTERNAL_SERVER_ERROR, error.message
        );
    }

}

const getProducts = async (req, res) => {
    
    try {
        
        const products = await Product.find({}).populate(
            'createdBy',
            '-password -__v'
        );
        apiResponse(
            res, StatusCode.OK, 'Products fetched successfully', products
        );
    } catch (error) {
        apiResponse(
            res, StatusCode.INTERNAL_SERVER_ERROR, error.message
        );
    }

}

const getProduct = async (req, res) => {
    
    try {
       const { id } = req.params;
       const product = await Product.findById(id).populate('createdBy','-password -__v');
       
       if(!product) {
            return apiResponse(
                res, StatusCode.NOT_FOUND, 'Product not found!'
            );
       }
       
       apiResponse(
           res, StatusCode.OK, 'Product Fetched successfully!', product
       );
    } catch (error) {
       apiResponse(
         res, StatusCode.INTERNAL_SERVER_ERROR, error.message
       );       
    }

}

const updateProduct = async (req, res) => {
    try {
    
        const { id } = req.params;
        const product = await Product.findByIdAndUpdate(id, req.body);

        if(!product) {
            return apiResponse(
                res, StatusCode.NOT_FOUND, 'Product not found!'
            );
        }

        const updateProduct = await Product.findById(id);
        apiResponse(
            res, StatusCode.OK, 'Product Updated successfully!', updateProduct
        );
    } catch (error) {
        apiResponse(
            res, StatusCode.INTERNAL_SERVER_ERROR, error.message
        );
    }
}

const deleteProduct = async (req, res) => {
    
    try {
    
        const { id } = req.params;
        const product = await Product.findByIdAndDelete(id)

        if(!product) {
            return apiResponse(
                res, StatusCode.NOT_FOUND, 'Product not found!'
            );
        }

        apiResponse(
            res, StatusCode.OK, 'Product Deleted successfully!'
        );
    } catch (error) {
        apiResponse(
            res, StatusCode.INTERNAL_SERVER_ERROR, error.message
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

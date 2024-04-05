const Product = require('../model/product.model.js');
const apiResponse = require('../utils/api_response.js');
const StatusCode  = require('../utils/status_code.js');

const createProduct = async (req, res) => {

    try {
        
        const product = await Product.create(req.body);
        const response = apiResponse(
            StatusCode.OK, 'Product created successfully', product
        );
        res.status(StatusCode.OK).json(response);

    } catch (error) {
        res.status(StatusCode.INTERNAL_SERVER_ERROR).json(
            apiResponse(StatusCode.INTERNAL_SERVER_ERROR, error.message)
        );
    }

}

const getProducts = async (req, res) => {
    
    try {
        
        const products = await Product.find({});
        const response = apiResponse(StatusCode.OK, 'Products fetched successfully', products);
        res.status(StatusCode.OK).json(response);
    
    } catch (error) {
        res.status(StatusCode.INTERNAL_SERVER_ERROR).json(
            apiResponse(StatusCode.INTERNAL_SERVER_ERROR, error.message)
        );
    }

}

const getProduct = async (req, res) => {
    
    try {
       
       const { id } = req.params;
       const product = await Product.findById(id);
       
       if(!product) {
           return res.status(StatusCode.NOT_FOUND).json(
               apiResponse(StatusCode.NOT_FOUND, 'Product not found!')
           );
       }
      
       const response = apiResponse(StatusCode.OK, 'Product Fetched successfully!', product);
       res.status(StatusCode.OK).json(response);
    
    } catch (error) {
       res.status(StatusCode.INTERNAL_SERVER_ERROR).json(
        apiResponse(StatusCode.INTERNAL_SERVER_ERROR, error.message)
       );
    }

}

const updateProduct = async (req, res) => {
    try {
    
        const { id } = req.params;
        const product = await Product.findByIdAndUpdate(id, req.body);

        if(!product) {
            return res.status(StatusCode.NOT_FOUND).json(
                apiResponse(StatusCode.NOT_FOUND, 'Product not found!')
            );
        }

        const updateProduct = await Product.findById(id);
        const response = apiResponse(StatusCode.OK, 'Product Updated successfully!', updateProduct);
        res.status(StatusCode.OK).json(response);
    
    } catch (error) {
        res.status(StatusCode.INTERNAL_SERVER_ERROR).json(
            apiResponse(StatusCode.INTERNAL_SERVER_ERROR, error.message)
        );
    }
}

const deleteProduct = async (req, res) => {
    
    try {
    
        const { id } = req.params;
        const product = await Product.findByIdAndDelete(id)

        if(!product) {
            return res.status(StatusCode.NOT_FOUND).json(
                apiResponse(StatusCode.NOT_FOUND, 'Product not found!')
            );
        }

        const response = apiResponse(StatusCode.OK, 'Product Deleted successfully!');
        res.status(StatusCode.OK).json(response);
    
    } catch (error) {
        res.status(StatusCode.INTERNAL_SERVER_ERROR).json(
            apiResponse(StatusCode.INTERNAL_SERVER_ERROR, error.message)
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

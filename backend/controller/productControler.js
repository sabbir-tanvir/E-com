
import Product from '../models/productModel.js';
import HandelError from "../utils/handelError.js";
import handelAsyncError from '../middleware/handelAsyncError.js';
import APIFunctionality from '../utils/apiFunctionality.js';



// Create the Product

export const createProduct = handelAsyncError(async (req, res, next) => {
    req.body.user = req.user.id;
    const product = await Product.create(req.body)

    res.status(201).json({
        success: true,
        product
    })
})



//Get the Product
export const getAllProducts = handelAsyncError(async (req, res, next) => {
    const resultPerPage = 3;
    const apiFetures = new APIFunctionality(Product.find(), req.query).search().filter();


    // filter before pagination 
    const filterredQuery = apiFetures.query.clone();
    const productCount = await filterredQuery.countDocuments();

    // total Page
    const totalPage = Math.ceil(productCount / resultPerPage);
    const page = Number(req.query.page) || 1;

    if (page > totalPage && productCount > 0) {
        return next(new HandelError("This Page dose not exist", 404))
    }

    // Apply Pagination 

    apiFetures.pagination(resultPerPage);
    const products = await apiFetures.query;


    if (!products || products.length === 0) {
        return next(new HandelError("No Product is Found", 404))

    }
    res.status(200).json({
        success: true,
        products,
        productCount,
        totalPage,
        resultPerPage,
        currentPage: page
    })
})


//Update the Product 
export const updateProduct = handelAsyncError(async (req, res, next) => {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    })
    if (!product) {
        return next(new HandelError("product not Found", 404))
    }
    res.status(200).json({
        success: true,
        product
    })

})


//Delete the Product

export const deletProduct = handelAsyncError(async (req, res, next) => {
    const product = await Product.findById(req.params.id);
    if (!product) {
        return next(new HandelError("product not Found", 404))

    }
    product = await Product.findByIdAndDelete(req.params.id)
    res.status(200).json({
        success: true,
        message: "Product deleted successfully"
    })
})


// accessing single aProduct

export const getSingleProduct = handelAsyncError(async (req, res, next) => {
    const product = await Product.findById(req.params.id);
    if (!product) {
        return next(new HandelError("product not Found", 404))
    }
    res.status(200).json({
        success: true,
        product
    })
})



// admin getting all products

export const getAdminProducts = handelAsyncError(async (req, res, next) => {
    const products = await Product.find();
    if (!products || products.length === 0) {
        return next(new HandelError("No Product is Found", 404))
    }
    res.status(200).json({
        success: true,
        products
    })
})
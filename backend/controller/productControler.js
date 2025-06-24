
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
    const resultPerPage = 2;
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


// creating and updating the product

export const createReviewForProduct = handelAsyncError(async (req, res, next) => {
    const { rating, comment, productId } = req.body;
    const review = {
        user: req.user._id,
        name: req.user.name,
        rating: Number(rating),
        comment

    }
    const product = await Product.findById(productId);
    const reviewExists = product.reviews.find(
        review => review.user.toString() === req.user.id.toString());

    if (reviewExists) {
        product.reviews.forEach(review => {
            if (review.user.toString() === req.user.id.toString()) {
                review.rating = rating,
                review.comment = comment
            }
        })

    } else {
        product.reviews.push(review)
    }

    product.numOfReviews = product.reviews.length

    let avg = 0;
    product.reviews.forEach(review => {
        avg += review.rating
    })
    product.ratings = product.reviews.length > 0 ? avg / product.reviews.length : 0
    await product.save({ validateBeforeSave: false });

    res.status(200).json({
        success: true,
        product
    })
})


// getting reviews 

export const getProductReview = handelAsyncError(async (req, res, next) => {
    const product = await Product.findById(req.query.id);
    if(!product) {
        return next( new HandelError(`Product not Found`, 400))
    }    
    res.status(200).json({
        success: true,
        reviews: product.reviews
        
    })
})


// deleting reviews 

export const deletReview = handelAsyncError(async (req, res, next) => {
    const product = await Product.findById(req.query.productId);
    if(!product) {
        return next( new HandelError(`Product not Found`, 400))
    }    
    const reviews = product.reviews.filter(review =>
        review._id.toString()!== req.query.id.toString())


        let avg = 0;
    reviews.forEach(review => {
        avg += review.rating
    })
    const ratings = reviews.length > 0 ? avg / reviews.length : 0
    const numOfReviews = reviews.length;

    await Product.findByIdAndUpdate(req.query.productId, {
        reviews,
        ratings,
        numOfReviews
    },{
        new: true,
        runValidators: true
    })

    res.status(200).json({
        success: true,
        message: "Review delet succesfully "
        
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
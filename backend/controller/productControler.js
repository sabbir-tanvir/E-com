
import Product from '../models/productModel.js';
import HandelError from "../utils/handelError.js";
import handelAsyncError from '../middleware/handelAsyncError.js';

export const createProduct = handelAsyncError(async(req,res,next) =>{
   const product = await Product.create(req.body)

    res.status(201).json({
        success:true,
        product
    })
})



//Get the Product
export const getAllProducts=handelAsyncError(async (req,res,next) => { 
    const products = await Product.find();
    res.status(200).json({
        success:true,
        products
    })
})


//Update the Product 
export const updateProduct=handelAsyncError(async(req,res,next) =>{
    const product= await Product.findByIdAndUpdate(req.params.id, req.body,{
        new: true ,
        runValidators:true
    } )
    if(!product) {
        return next(new HandelError("product not Found", 404))
    }
    res.status(200).json({
        success:true,
        product
    })
    
})


//Delete the Product

export const deletProduct = handelAsyncError(async (req,res,next) => {
    const product = await Product.findById(req.params.id);
    if(!product){
        return next(new HandelError("product not Found", 404))

    }
    product= await Product.findByIdAndDelete(req.params.id)
    res.status(200).json({
        success:true,
        message:"Product deleted successfully"
    })
})


// accessing single aProduct

export const getSingleProduct = handelAsyncError(async(req,res,next)=> {
    const product = await Product.findById(req.params.id);
        if(!product){
        return next(new HandelError("product not Found", 404))
    }
    res.status(200).json({
        success:true,
        product
    })
})


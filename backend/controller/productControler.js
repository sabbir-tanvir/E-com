

import Product from '../models/productModel.js';


export const createProduct = async(req,res) =>{
   const product = await Product.create(req.body)

    res.status(201).json({
        success:true,
        product
    })
}



//Get the Product
export const getAllProducts=async (req,res) => {
    const products = await Product.find();
    res.status(200).json({
        success:true,
        products
    })
}


//Update the Product 
export const updateProduct=async(req,res) =>{
    let product = await Product.findById(req.params.id);
    if(!product){
        return res.status(500).json({

            success:false,
            message:"Product is not Found"
        })
    }
    product= await Product.findByIdAndUpdate(req.params.id, req.body,{
        new: true ,
        runValidators:true
    } )

    res.status(200).json({
        success:true,
        product
    })
    
}


//Delete the Product

export const deletProduct = async (req,res) => {
    let product = await Product.findById(req.params.id);
        if(!product){
        return res.status(500).json({

            success:false,
            message:"Product is not Found"
        })
    }
    product= await Product.findByIdAndDelete(req.params.id)
    res.status(200).json({
        success:true,
        message:"Product deleted successfully"
    })
}


// accessing single aProduct

export const getSingleProduct = async(req,res)=> {
    const product = await Product.findById(req.params.id);
        if(!product){
        return res.status(500).json({

            success:false,
            message:"Product is not Found"
        })
    }
    res.status(200).json({
        success:true,
        product
    })
}
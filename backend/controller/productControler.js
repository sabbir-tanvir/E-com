

import Product from '../models/productModel.js';


export const createProduct = async(req,res) =>{
   const product = await Product.create(req.body)

    res.status(201).json({
        success:true,
        product
    })
}

export const getAllProducts=async (req,res) => {
    const products = await Product.find();
    res.status(200).json({
        success:true,
        products
    })
}



export const updateProduct=async(req.res) => {
    
}
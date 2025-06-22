import React, { useState } from 'react';
import '../componentStyles/Product.css';
import { Link } from 'react-router-dom';
import Rating from './Rating';


function Product({ product }) {
    const [rating, setRating] = useState(0);
    const handleRatingChange = (newRating) => {
        setRating(rating)

    }

    return (
        <Link to={`/product/${product._id}`} className='product_id'>
            <div>
                <div className="product-card">
                    <img src={product.images[0].url} alt={product.name}  className='product-image-card'/>
                    <div className="product-details">
                        <h3 className="product-title">
                            {product.name}
                        </h3>
                        <p className="product-price"><strong>Price</strong>{product.price}/-</p>

                        <div className="rating_container">
                            <Rating
                                value={product.ratings}
                                onRatingChnage={handleRatingChange}
                                disabled={true}
                            />
                        </div>

                        <span className="productCardSpan">
                            (    {product.numOfReviews} {product.numOfReviews === 1 ? "Review" : "Reviews"})
                        </span>

                        <button className="add-to-cart">
                            view details
                        </button>
                    </div>
                </div>

            </div>
        </Link>
    );
};

export default Product;


// 10: 45 minutes

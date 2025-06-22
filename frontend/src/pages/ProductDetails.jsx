import React, { useEffect, useState } from 'react';
import '../pageStyles/ProductDetails.css';
import PageTitle from '../components/PageTitle';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Rating from '../components/Rating';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getProductDetails, removeError } from '../features/products/productSlice';
import { toast } from 'react-toastify';
import Loader from '../components/Loader';

function ProductDetails() {
    const [userRating, setUserRating] = useState(0);
    const handleRatingChange = (newRating) => {
        setUserRating(newRating)
    }

    const { loading, error, product } = useSelector((state) => state.products);
    const dispatch = useDispatch();
    const { id } = useParams();

    useEffect(() => {
        if (id) {
            dispatch(getProductDetails(id));

        }
        return () => {
            dispatch(removeError())
        }

    }, [dispatch, id]);

    useEffect(() => {
        if (error) {
            toast.error(error.message, {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            dispatch(removeError());
        }
    }, [dispatch, error]);

    if (loading) {
        return (
            <>
                <Navbar />
                <Loader />
                <Footer />


            </>
        )
    }

    if (error || !product) {
        return (
            <>
                <PageTitle title="Product Details" />

                <Navbar />
                <Footer />


            </>
        )
    }


    return (
        <>
            <PageTitle title={product ? `${product.name}` : "Product Details"} />
            <Navbar />

            <div className="product-details-container">
                <div className="product-detail-container">
                    <div className="product-image-container">
                        <img src={product?.images?.[0]?.url.replace('./', '/') || ""}
                            alt={product?.name || "product title"}
                            className='product-detail-image'
                        />
                    </div>
                    <div className="product-info">
                        <h2>{product?.name || "Product Name"}</h2>
                        <p className="product-description">
                            {product?.description || "Description"}

                        </p>
                        <p className="product-proce">
                            Price: ${product?.price || 0}
                        </p>
                        <div className="product-rating">
                            <Rating
                                value={2}
                                disabled={true}
                            />
                            <span className="productCardSpan">({product?.numOfReviews || 0} {product?.numOfReviews === 1 ? "Review" : "Reviews"})</span>
                        </div>
                        <div className="stock-status">
                            <span className={product.stock > 0 ? `in-stock` : `out-of-stock`}>
                                {product?.stock > 0 ? `In Stock (${product.stock} items available)` : "Out of Stock"}
                            </span>
                        </div>

                        {product.stock >0 && (   <>    <div className="quantity-controls">
                            <span className="quantity-label">
                                Quantity:
                            </span>
                            <button className="quantity-button">-</button>
                            <input type="text" value={1} className='quantity-value' readOnly />
                            <button className="quantity-button">+</button>
                        </div>

                            <button className="add-to-cart-btn"> Add to Cart</button>
                        </>)}
                        <form action="" className="review-form">
                            <h3>Write a Review</h3>
                            <Rating
                                value={0}
                                disabled={false}
                                onRatingChange={handleRatingChange}
                            />
                            <textarea placeholder='Write the review' className="review-input"></textarea>
                            <button className="submit-review-btn">Submit Review</button>
                        </form>
                    </div>

                </div>

                <div className="reviews-container">
                    <h3>Customer Reviews</h3>
                    {product.reviews && product.reviews.length === 0 ? (
                        <p className="no-reviews">No Reviews Yet</p>
                    ) : (
                        <div className="reviews-list">
                            {product.reviews.map((review, index) => (
                                <div className="review-item" key={index}>
                                    <div className="review-header">
                                        <Rating
                                            value={review.rating}
                                            disabled={true}
                                        />
                                    </div>
                                    <p className="review-comment">{review.comment}</p>
                                    <p className="review-name">
                                        <strong>By:</strong> {review.name}
                                    </p>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

            </div>
            <Footer />
        </>
    );
};

export default ProductDetails;
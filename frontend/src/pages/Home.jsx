import React from 'react';
import '../pageStyles/Home.css';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import ImageSlider from '../components/ImageSlider';
import Product from '../components/Product';


const products = [
        {
            "_id": "68403a42b835f9e75db6d6f4",
            "name": "Wireless Headphones",
            "description": "High-quality wireless headphones with noise cancellation.",
            "price": 199.99,
            "ratings": 3,
            "images": [
                {
                    "public_id": "headphones123",
                    "url": "https://example.com/images/headphones.jpg",
                    "_id": "68403a42b835f9e75db6d6f5"
                }
            ],
            "category": "Electronics",
            "stock": 50,
            "numOfReviews": 1,
            "reviews": [
                {
                    "user": "60f7b3c8fcd3b3412c2d45a9",
                    "name": "John Doe",
                    "rating": 5,
                    "comment": "Amazing sound quality and very comfortable!",
                    "_id": "68403a42b835f9e75db6d6f6"
                }
            ],
            "createdAt": "2025-06-04T12:21:22.739Z",
            "__v": 0
        },
        {
            "_id": "6847fd064374795c0a8e8a43",
            "name": "Wirelesssss Phone",
            "description": "High-quality wireless headphones with noise cancellation.",
            "price": 199.99,
            "ratings": 4.5,
            "images": [
                {
                    "public_id": "headphones123",
                    "url": "https://example.com/images/headphones.jpg",
                    "_id": "6847fd064374795c0a8e8a44"
                }
            ],
            "category": "Electronics",
            "stock": 50,
            "numOfReviews": 1,
            "reviews": [],
            "createdAt": "2025-06-10T09:38:14.617Z",
            "__v": 0
        },
        {
            "_id": "684cf1ea9011a0ce9795c280",
            "name": "product20",
            "description": "High-quality wireless headphones with noise cancellation.",
            "price": 1200,
            "ratings": 4.5,
            "images": [
                {
                    "public_id": "headphon",
                    "url": "https://example.com/images/headphones.jpg",
                    "_id": "684cf1ea9011a0ce9795c281"
                }
            ],
            "category": "Electronics",
            "stock": 44,
            "numOfReviews": 1,
            "reviews": [],
            "createdAt": "2025-06-14T03:52:10.185Z",
            "__v": 0
        }
    ]
function Home() {
    return (
        <>
            <Navbar />
            <ImageSlider />
            <div className="home-container">
                <h2 className="home-heading">Trending Now</h2>

                <div className="home-product-container">
                    {products.map((product, index) => (
                        <Product product={product} key={index}/>
                    ))}
                </div>

            </div>
            <Footer />
        </>
    );
};

export default Home;



// 10: 17 minutes
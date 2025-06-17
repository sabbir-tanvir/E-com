import React from 'react';
import '../pageStyles/Home.css';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import ImageSlider from '../components/ImageSlider';
import Product from '../components/Product';
import PageTitle from '../components/PageTitle';
import { useDispatch, useSelector } from 'react-redux';
import { getProduct, removeError } from '../features/products/productSlice';
import { useEffect } from 'react';
import Loader from '../components/Loader';
import { toast } from 'react-toastify';



function Home() {

    const { loading, error, products, productCount } = useSelector((state) => state.products);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getProduct());

    }, [dispatch]);

    useEffect(() => {
        if(error) {
            toast.error(error.message,{ position: "top-center",
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


    return (

        <>
            {loading ? (<Loader />) : (
                <>
                    <PageTitle title="Home" />
                    <Navbar />
                    <ImageSlider />
                    <div className="home-container">
                        <h2 className="home-heading">Trending Now</h2>

                        <div className="home-product-container">
                            {products.map((product, index) => (
                                <Product product={product} key={index} />
                            ))}
                        </div>

                    </div>
                    <Loader />
                    <Footer />
                </>)}
        </>
    );
};

export default Home;



// 10: 17 minutes
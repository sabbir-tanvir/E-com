import React from 'react';
import '../pageStyles/Products.css';
import Navbar from '../components/Navbar';
import PageTitle from '../components/PageTitle';
import Footer from '../components/Footer';
import { useDispatch, useSelector } from 'react-redux';
import Product from '../components/Product';
import { useEffect } from 'react';
import { getProduct, removeError } from '../features/products/productSlice';
import { toast } from 'react-toastify';
import Loader from '../components/Loader';
import { useLocation } from 'react-router-dom';
import NoProduct from '../components/NoProduct';

function Products() {
  const { loading, error, products } = useSelector((state) => state.products);
  const dispatch = useDispatch();
  const location = useLocation();
  const searchParams =  new URLSearchParams(location.search);
  const keyword = searchParams.get("keyword");
  
console.log(keyword);


  useEffect(() => {
    dispatch(getProduct({keyword}))
  }, [dispatch, keyword]);


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


  return (
    <>
      {loading ? (<Loader />) : (<>
        <PageTitle title="All Products" />
        <Navbar />
        <div className="products-layout">
          <div className="filter-section">
            <h3 className="filter-heading">
              CATEGORIES
            </h3>

          </div>
          <div className="products-section">
          {products.length > 0? ( <div className="products-product-container">
              {
                products.map((product) => (
                  <Product key={product._id} product={product} />
                ))
              }

            </div>): (
              <NoProduct keyword={keyword} />
            )}
          </div>
        </div>
        <Footer />
      </>)}
    </>
  );
};

export default Products;

//12: 29 minutes
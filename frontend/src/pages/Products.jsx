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

function Products() {
  const { loading, error, products } = useSelector((state) => state.products);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProduct());
  }, [dispatch]);


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
    {loading? (<Loader />) :(<>
      <PageTitle title="All Products" />
      <Navbar />
      <div className="products-layout">
        <div className="filter-section">
          <h3 className="filter-heading">
            CATEGORIES
          </h3>

        </div>
        <div className="products-section">
          <div className="products-product-container">
            {
              products.map((product) => (
                <Product key={product._id} product={product} />
              ))
            }

          </div>
        </div>
      </div>
      <Footer />
    </>)}
    </>
  );
};

export default Products;

//12: 29 minutes
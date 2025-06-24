import React, { useState } from 'react';
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
import { useLocation, useNavigate } from 'react-router-dom';
import NoProduct from '../components/NoProduct';
import Pagination from '../components/Pagination';

function Products() {
  const { loading, error, products , resultPerPage, productCount} = useSelector((state) => state.products);
  const dispatch = useDispatch();
  const location = useLocation();
  const searchParams =  new URLSearchParams(location.search);
  const keyword = searchParams.get("keyword");
  const catagory = searchParams.get("category");
  const page = parseInt(searchParams.get("page") || 1, 10);

  const [ currentPage, setCurrentPage ] = useState(page);
  const navigate = useNavigate();
  
  const categories = ["Electronics", "Fashion", "Books", "Home & Garden", "Sports", "Toys"];

  useEffect(() => {
    dispatch(getProduct({keyword, page: currentPage, catagory}));
  }, [dispatch, keyword, currentPage, catagory]);


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

  const handlePageChange = (page) => {
      if(page !== currentPage) {
        setCurrentPage(page);
        const newSearchParams = new URLSearchParams(location.search);
        if(page===1) {
          newSearchParams.delete("page");
        } else {
          newSearchParams.set("page", page);
        }
        navigate(`?${newSearchParams.toString()}`);

      }
  }
    const handleCategoryClick = (category) => {
        const SearchParams = new URLSearchParams(location.search);
        SearchParams.set("category", category);
        SearchParams.delete("page"); // Reset to first page when changing category
        navigate(`?${SearchParams.toString()}`);

    }


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
            <ul>
              {categories.map((category) => (
                <li key={category} className={`filter-item ${catagory === category ? 'active' : ''}`} 
                onClick={() => handleCategoryClick(category)}
                >
                  {category}
                </li>
              ))}
            </ul>

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

            <Pagination 
            currentPage={currentPage}
            onPageChange={handlePageChange}
            />
          </div>
        </div>
        <Footer />
      </>)}
    </>
  );
};

export default Products;

//12: 29 minutes
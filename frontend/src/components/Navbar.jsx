import React, { useState } from 'react';
import '../componentStyles/Navbar.css';
import { Link, useNavigate } from 'react-router-dom';
import { CloseOutlined, Menu, PersonAddRounded, Search, ShoppingCart } from '@mui/icons-material';
import '../pageStyles/Search.css';


function Navbar() {

    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const toggleSearch = () => setIsSearchOpen(!isSearchOpen);
    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
    const isAuthenticated = false;

    const navigate = useNavigate();
    const handleSearchChange = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            navigate(`/products?keyword=${encodeURIComponent(searchQuery.trim())}`);
        } else {
            navigate('/products');
        }
        setSearchQuery('');

    }

    return (
        <nav className="navbar">
            <div className="navbar-container">
                <div className="navbar-logo">
                    <Link to="/" onClick={() => setIsMenuOpen(false)}>Shop</Link>
                </div>

                <div className={`navbar-links  ${isMenuOpen ? 'active' : ""}`}>
                    <ul>
                        <li onClick={() => setIsMenuOpen(false)}><Link to="/">Home</Link></li>
                        <li><Link to="/products">Products</Link></li>
                        <li><Link to="/about">About</Link></li>
                        <li><Link to="/contact">Contact</Link></li>
                    </ul>
                </div>


                <div className="navbar-icons">
                    <div className="search-container">
                    <form  className={`search-form ${isSearchOpen ? 'active' : ''}`} onSubmit={handleSearchChange}>
                        <input type="text"
                         placeholder="Search products..."   
                         className='search-input'
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}

                         />
                         <button className="search-icon" onClick={toggleSearch} type="button">
                              <Search focusable="false"/>
                         </button>
                    </form>
                </div>

                    <div className="cart-container">
                        <Link to="/cart">
                            <ShoppingCart className='icon' />
                            <span className="cart-badge">6</span>
                        </Link>
                    </div>


                    {!isAuthenticated && <Link to="/register" className='register-link'>
                        <PersonAddRounded className='icon' />
                    </Link>}

                    <div className="navbar-hamburger" onClick={toggleMenu}>
                        {isMenuOpen ? <CloseOutlined className='icon' /> : <Menu className='icon' />}
                    </div>


                </div>
            </div>
        </nav>
    );
};

export default Navbar;


//9 : 56 minutes
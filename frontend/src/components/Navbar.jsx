import React, { useState } from 'react';
import '../componentStyles/Navbar.css';
import { Link } from 'react-router-dom';
import { CloseOutlined, Menu, PersonAddRounded, Search, ShoppingCart } from '@mui/icons-material';


function Navbar() {

    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
    const isAuthenticated = false;

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
                    {/* <div className="search-container">
                    <form  className="search-form">
                        <input type="text"
                         placeholder="Search products..."   
                         className='search-input'
                         />
                         <button className="search-icon">
                              <Search focusable="false"/>
                         </button>
                    </form>
                </div> */}

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
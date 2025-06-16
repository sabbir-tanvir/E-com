import React from 'react';
import '../componentStyles/Footer.css'
import { Facebook, Instagram, LinkedIn, Mail, Phone, Twitter } from '@mui/icons-material';


function Footer() {
  return (
    <footer className="footer">
        <div className="footer-container">
            {/* Section 1 */}
            <div className="footer-section contact">
                <h3>Contact Us</h3>
                <p><Mail/> Email: support@ecommerce.com</p>
                <p><Phone/> Phone: 123-456-7890</p>
            </div>
            {/* Section 2 */}
            <div className="footer-section social">
                <h3>Follow Us</h3>
                <div className="social-links">
                    <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer"><Facebook/></a>
                    <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer"><Twitter/></a>
                    <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer"><Instagram/></a>
                    <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer"><LinkedIn/></a>
                </div>
                </div>

            {/* Section 3 */}
            <div className="footer-section about">
                <h3>About Us</h3>
                <p>We are a leading e-commerce platform providing a wide range of products at competitive prices.</p>
                <p>Our mission is to deliver quality products and exceptional service to our customers.</p>
            </div>
            
        </div>


        <div className="footer-bottom">
            <p>&copy; {new Date().getFullYear()} E-Commerce. All rights reserved.</p>
            <p>Designed by Sabbir</p>
        </div>
    </footer>
  );
};

export default Footer;

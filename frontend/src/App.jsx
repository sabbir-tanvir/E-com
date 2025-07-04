import React from 'react';
import Home from './pages/Home';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProductDetails from './pages/ProductDetails';
import Products from './pages/Products';
import Register from './User/Register';
import Login from './User/Login';
import { useDispatch, useSelector } from 'react-redux';
import { loadUser } from './features/user/userSlice';
import UserDashboard from './User/UserDashbord';

function App() {
  const { isAuthenticated, user, loading } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  React.useEffect(() => {
    // Try to load user on app start (check if there's a valid session)
    dispatch(loadUser());
  }, [dispatch]);

  console.log('App state:', { isAuthenticated, user: !!user, loading });
  

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:keyword" element={<Products />} />
         <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
       

        {/* Add more routes as needed */}

      </Routes>

      {isAuthenticated && user && <UserDashboard user={user} />}
      {isAuthenticated && !user && !loading && (
        <div style={{ textAlign: 'center', padding: '2rem' }}>
          <p>Loading user data...</p>
        </div>
      )}
    </Router>
  );
}

export default App;
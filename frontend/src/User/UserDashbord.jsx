import React, { useState } from 'react';
import '../UserStyles/UserDashboard.css';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { logout, removeSuccess } from '../features/user/userSlice';



function UserDashboard({ user }) {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [menuVisible, setMenuVisible] = useState(false);

    function toggleMenu() {
        setMenuVisible(!menuVisible);
    };


    const option = [
        {name: 'orders', funcName:orders},
        {name: 'Account', funcName:profile},
        {name: 'logout', funcName:logoutuser}
    ]

    if (user.role === 'admin') {
        option.unshift({name: 'Admin', funcName: () => navigate('/admin/dashboard')});
    }

    function orders() {
        navigate('/orders/user');
    }
    function profile() {
        navigate('/profile');
    }
    function logoutuser() {
        dispatch(logout())
        .unwrap()
        .then(() => {
            toast.success("Logout successful", {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            dispatch(removeSuccess());
            navigate('/');
        })
        .catch((error) => {
            toast.error(error.message || "Logout failed", {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        });
    }

       

  
  return (
    <>
    <div className="dashbord-container">
        <div className="profile-header " onClick={toggleMenu}>
            <img src={user.avatar.url ? user.avatar.url : './images/profile.png'} alt="User Avatar" className="profile-avatar" />
            <h1 className="profile-name">{user.name}</h1>
        </div>
        {menuVisible && (
            <div className="menu-options">
                {option.map((item) => (
                    <button key={item.name} className="menu-option-btn" onClick={item.funcName}>
                        {item.name}
                    </button>
                ))}
            </div>
        )}
        </div>
        </>

  );
}

export default UserDashboard;



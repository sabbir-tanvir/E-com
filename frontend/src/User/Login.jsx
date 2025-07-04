import React, { useEffect, useState } from 'react';
import '../UserStyles/Form.css';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { login, removeError, removeSuccess } from '../features/user/userSlice';
import { toast } from 'react-toastify';

function Login() {
    const [loginEmail, setLoginEmail] = useState("");
    const [loginPassword, setLoginPassword] = useState("");
    const { error, loading, success, isAuthenticated } = useSelector((state) => state.user);

    const dispatch = useDispatch();
    const navigate = useNavigate();


    const loginSubmit = (e) => {
        e.preventDefault();
        // Add your login logic here
        console.log('Hello');
        dispatch(login({ email: loginEmail, password: loginPassword }));

    }

    useEffect(() => {
        if (error) {
            toast.error(error, {
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

    useEffect(() => {
        if (isAuthenticated) {
            navigate("/");
        }
    }, [isAuthenticated, navigate]);

    useEffect(() => {
        if (success) {
            toast.success("Login successful", {
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
        }
    }, [dispatch, success, navigate]);

    return (
        <div className="form-container container">
            <div className="form-content">
                <form className="form" onSubmit={loginSubmit}>
                    <h2>LOgin</h2>
                    <div className="input-group">
                        <input type="email" placeholder='Email' value={loginEmail} onChange={(e) => setLoginEmail(e.target.value)} />
                    </div>
                    <div className="input-group">
                        <input type="password" placeholder='Password' value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)} />
                    </div>

                    <button className="authBtn">Sign IN</button>
                    <p className="form-links">Forget your Password ? <Link to="/password/forgot">Reset Here </Link></p>
                    <p className="form-links">Dont have an accunt ? <Link to="/register">Sign up here</Link></p>
                </form>
            </div>
        </div>
    );
};

export default Login;
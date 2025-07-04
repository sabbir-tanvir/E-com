import React, { useEffect, useState } from 'react';
import '../UserStyles/Form.css'
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { register, removeError, removeSuccess } from '../features/user/userSlice';

function Register() {
    const [user, setUser] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: ""
    })
    const [avatar, setAvatar] = useState("");
    const [avatarPreview, setAvatarPreview] = useState("./images/profile.png");
    const { name, email, password, confirmPassword } = user

    const { success, error, loading, isAuthenticated } = useSelector((state) => state.user);
    const dispatch = useDispatch();

    const navigate = useNavigate();

    const registerDataChange = (e) => {
        if (e.target.name === "avatar") {
            const file = e.target.files[0];
            
            // Validate file size (max 5MB)
            if (file.size > 5 * 1024 * 1024) {
                toast.error("File size should be less than 5MB", { position: "top-center" });
                return;
            }
            
            // Validate file type
            if (!file.type.startsWith('image/')) {
                toast.error("Please select a valid image file", { position: "top-center" });
                return;
            }

            const reader = new FileReader();
            reader.onload = () => {
                if (reader.readyState === 2) {
                    setAvatarPreview(reader.result);
                    setAvatar(reader.result);
                }
            };
            reader.readAsDataURL(file);
        } else {
            setUser({ ...user, [e.target.name]: e.target.value });
        }

    }

    const registerSubmit = (e) => {
        e.preventDefault();
        // Add your registration logic here
        if (!name || !email || !password || !confirmPassword) {
            toast.error("Please fill all fields", { position: "top-center" });
            return;
        }
        if (password !== confirmPassword) {
            toast.error("Passwords do not match", { position: "top-center" });
            return;
        }
        if (password.length < 6) {
            toast.error("Password must be at least 6 characters long", { position: "top-center" });
            return;
        }

        // Create user data object instead of FormData for better handling
        const userData = {
            name,
            email,
            password,
            avatar: avatar || null
        };

        console.log('Sending registration data:', { 
            name, 
            email, 
            hasAvatar: !!avatar,
            avatarLength: avatar?.length 
        });
        
        dispatch(register(userData));
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
        if (success && isAuthenticated) {
            toast.success("Registration successful! Welcome!", {
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
            navigate("/"); // Navigate to home instead of login
        }
    }, [dispatch, success, navigate, isAuthenticated]);


    return (
        <div className="form-container container">
            <div className="form-content">
                <form className="form" onSubmit={registerSubmit} encType='multipart/form-data'>
                    <h2>Sign Up</h2>
                    <div className="input-group">
                        <input type="text" placeholder='username' name="name" value={name} onChange={registerDataChange} />
                    </div>
                    <div className="input-group">
                        <input type="email" placeholder='email' name="email" value={email} onChange={registerDataChange} />
                    </div>
                    <div className="input-group">
                        <input type="password" placeholder='password' name="password" value={password} onChange={registerDataChange} />
                    </div>
                    <div className="input-group">
                        <input type="password" placeholder='confirm password' name="confirmPassword" value={confirmPassword} onChange={registerDataChange} />
                    </div>
                    <div className="input-group avatar-group">
                        <label htmlFor="avatar">Avatar (Optional):</label>
                        <input type="file" name="avatar" id="avatar" className='file-input' accept='image/*' onChange={registerDataChange} />
                        <img src={avatarPreview} alt="Preview" className='avatar' />
                    </div>
                    <button className="authBtn">Sign Up</button>
                    <p className="form-links">
                        Already have an account? <Link to="/login" >Login</Link>
                    </p>




                </form>
            </div>
        </div>
    );
};

export default Register;


// 15: 42 
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';


// register APi 
export const register = createAsyncThunk('user/register', async (userData, { rejectWithValue }) => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            },
            withCredentials: true
        };
        console.log('Making registration request...');
        const response = await axios.post('/api/v1/register', userData, config);
        console.log('Registration successful:', response.data);
        return response.data;
    } catch (error) {
        console.error('Registration error:', error.response?.data || error.message);
        return rejectWithValue(error.response?.data || { message: 'Something went wrong' });
    }
})

// login 
export const login = createAsyncThunk('user/login', async ({ email, password }, { rejectWithValue }) => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            },
            withCredentials: true
        };
        const response = await axios.post('/api/v1/login', { email, password }, config);
        console.log('Login response:', response.data);
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response?.data || 'Something went wrong');
    }
})



// logout the user
export const logout = createAsyncThunk('user/logout', async (_, { rejectWithValue }) => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            },
            withCredentials: true
        };
        const response = await axios.post('/api/v1/logout', {}, config);
        console.log('Logout response:', response.data);
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response?.data || 'Something went wrong');
    }
});



export const loadUser = createAsyncThunk('user/loadUser', async (_, { rejectWithValue }) => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            },
            withCredentials: true // Include cookies for authentication
        };
        const response = await axios.get('/api/v1/profile', config);
        console.log('User loaded:', response.data);
        return response.data;
    } catch (error) {
        console.error('Load user error:', error.response?.data || error.message);
        return rejectWithValue(error.response?.data || { message: 'Failed to load user' });
    }
})


const userSlice = createSlice({
    name: 'user',
    initialState: {
        user: null,
        isAuthenticated: false,
        loading: false,
        error: null,
        success: false,
    },
    reducers: {
        removeError: (state) => {
            state.error = null;
        },
        removeSuccess: (state) => {
            state.success = null;
        }
    },
    extraReducers: (builder) => {

        // Handle register actions
        builder
            .addCase(register.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.success = false;
            })
            .addCase(register.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                state.success = action.payload.success;
                state.user = action.payload?.user || null;
                state.isAuthenticated = true;
                state.success = true;
                console.log('Registration successful, user set:', action.payload?.user);
            })
            .addCase(register.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.message || 'Registration failed';
                state.isAuthenticated = false;
                state.user = null;
                state.success = false;
            });


        // Handle login actions
        builder
            .addCase(login.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.success = false;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                state.success = action.payload.success;
                state.user = action.payload?.user || null;
                state.isAuthenticated = true;
                console.log(state.user);

            })
            .addCase(login.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.message || 'Login failed';
                state.isAuthenticated = false;
                state.user = null;
                state.success = false;
            });


        builder
            .addCase(loadUser.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.success = false;
            })
            .addCase(loadUser.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                state.user = action.payload?.user || null;
                state.isAuthenticated = Boolean(action.payload?.user)
            })
            .addCase(loadUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.message || 'Failed to load user';
                state.isAuthenticated = false;
                state.user = null;

            });

        // Handle logout actions
        builder
            .addCase(logout.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(logout.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                state.isAuthenticated = false;
                state.user = null;
                console.log('Logout successful:', action.payload);
            })
            .addCase(logout.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.message || 'Logout failed';
            });

    }
})

export const { removeError, removeSuccess } = userSlice.actions;

export default userSlice.reducer;


// 14 : 33 minutes

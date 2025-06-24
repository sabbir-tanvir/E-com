import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getProduct = createAsyncThunk('product/getProduct', async ({keyword, page=1, catagory},
    { rejectWithValue }) => {
    try {

        let link = '/api/v1/products?page=' + page;
        if( catagory ) {
            link += `&category=${encodeURIComponent(catagory)}`;
        }
        if( keyword ) {
            link += `&keyword=${encodeURIComponent(keyword)}`;
        }
        // const link = keyword ? `/api/v1/products?keyword=${encodeURIComponent(keyword)}&page=${page}` : `/api/v1/products?page=${page}`;

        // const link = '/api/v1/products';
        const {data, status} = await axios.get(link)
        console.log('Response', data);
        if (status !== 200) {
            throw new Error('Failed to fetch product');
        }
        return data;
    } catch (error) {
        return rejectWithValue(error.response?.data || 'An Error happen');
    }
});


// Product Details Slice

export const getProductDetails = createAsyncThunk('product/getProductDetails', async (id,
    { rejectWithValue }) => {
        try{
            const link = `/api/v1/product/${id}`;
            const  { data } = await axios.get(link);
            return data;

        } catch (error) {
            return rejectWithValue(error.response?.data || 'An Error happen');
        }

});


const productSlice = createSlice({
    name: 'product',
    initialState: {
        products: [],
        productCount: 0,
        loading: false,
        error: null,
        product: null,
        resultPerPage: 4,
        totalPages: 0,
    },
    reducers: {
        removeError: (state) => {
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getProduct.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getProduct.fulfilled, (state, action) => {
                console.log('action payload', action.payload);

                state.loading = false;
                state.error = null;
                state.products = action.payload.products;
                state.productCount = action.payload.productCount;
                state.resultPerPage = action.payload.resultPerPage;
                state.totalPages = action.payload.totalPage;
            })
            .addCase(getProduct.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || 'Something went wrong'
                state.products = [];
            });

        builder
            .addCase(getProductDetails.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getProductDetails.fulfilled, (state, action) => {
                console.log('action payload', action.payload);
                
                state.loading = false;
                state.error = null;
                state.product = action.payload.product;

            })
            .addCase(getProductDetails.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || 'Something went wrong';
            });
    }
})

export const { removeError } = productSlice.actions;
export default productSlice.reducer;


// 11: 14 minutes
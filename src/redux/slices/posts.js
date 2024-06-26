import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from '../../axios.js'

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
    const {data} = await axios.get('/posts')
    return data;
})

export const fetchTags = createAsyncThunk('posts/fetchTags', async () => {
    const {data} = await axios.get('/tags')
    return data;
})

export const fetchRemovePost = createAsyncThunk(
    "posts/fetchRemovePost",
    async (id) => axios.delete(`/posts/${id}`)
  );

const initialState = {
    posts: {
        items: [],
        status: 'loading',
    },
    tags: {
        items: [],
        status: 'loading',
    },
};

const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {},
    extraReducers: {
        //Полученик статьи
        [fetchPosts.pending]: (state) => {
            state.posts.items = []
            state.posts.status = 'loanding'
        },
        [fetchPosts.fulfilled]: (state, action) => {
            state.posts.items = action.payload
            state.posts.status = 'loaded'
        },
        [fetchPosts.rejected]: (state) => {
            state.posts.items = []
            state.posts.status = 'error'
        },
        //Полученик тегов
        [fetchTags.pending]: (state) => {
            state.tags.items = []
            state.tags.status = 'loanding'
        },
        [fetchTags.fulfilled]: (state, action) => {
            state.tags.items = action.payload
            state.tags.status = 'loaded'
        },
        [fetchTags.rejected]: (state) => {
            state.tags.items = []
            state.tags.status = 'error'
        },
        //Удаление статьи
        [fetchRemovePost.pending]: (state, action) => {
            state.posts.items = state.posts.items.filter(obj => obj._id !== action.meta.arg)
        }
    }
}
)

export const postsReucer = postsSlice.reducer;
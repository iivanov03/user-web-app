import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

import { Post } from "../../types/post/Post";
import { request } from "../api/service.api";

export const getPostList = createAsyncThunk(
  "posts/getPostList",
  async (userId?: number) => {
    const response = await request.get("/posts", {
      params: {
        userId
      }
    });
    return response.data;
  }
);

export const getPostDetail = createAsyncThunk(
  "posts/getPost",
  async (id: number) => {
    const response = await request.get(`/posts/${id}`);
    return response.data;
  }
);

export const editPost = createAsyncThunk(
  "posts/editPost",
  async (data: any) => {
    const response = await request.put(`/posts/${data.id}`, data);
    return response.data;
  }
);

export const deletePost = createAsyncThunk(
  "posts/deletePost",
  async (id: number) => {
    const response = await request.delete(`/posts/${id}`);
    return response.data;
  }
);

interface InitialStateType {
  postList: Post[];
  postDetail: Post;
  loadingPosts: boolean;
}

const initialState: InitialStateType = {
  postList: [],
  postDetail: {
    userId: 0,
    id: 0,
    title: "",
    body: ""
  },
  loadingPosts: true
};

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
  extraReducers: {
    [getPostList.pending.toString()]: (state) => {
      state.loadingPosts = true;
    },
    [getPostList.fulfilled.toString()]: (
      state,
      action: PayloadAction<Post[]>
    ) => {
      state.loadingPosts = false;
      state.postList = [...action.payload];
    },
    [getPostList.rejected.toString()]: (state) => {
      state.loadingPosts = false;
    },

    [getPostDetail.pending.toString()]: (state) => {
      state.loadingPosts = true;
    },
    [getPostDetail.fulfilled.toString()]: (
      state,
      action: PayloadAction<Post>
    ) => {
      state.loadingPosts = false;
      state.postDetail = { ...action.payload };
    },
    [getPostDetail.rejected.toString()]: (state) => {
      state.loadingPosts = true;
    },

    [editPost.pending.toString()]: (state) => {
      state.loadingPosts = true;
    },
    [editPost.fulfilled.toString()]: (
      state,
      action: PayloadAction<Post>
    ) => {
      state.loadingPosts = false;
      state.postDetail = { ...action.payload };
    },
    [editPost.rejected.toString()]: (state) => {
      state.loadingPosts = true;
    },

    [deletePost.pending.toString()]: (state) => {
      state.loadingPosts = true;
    },
    [deletePost.fulfilled.toString()]: (
      state,
      action: PayloadAction<Post>
    ) => {
      state.loadingPosts = false;
      state.postDetail = { ...action.payload };
    },
    [deletePost.rejected.toString()]: (state) => {
      state.loadingPosts = true;
    }
  }
});

export default postsSlice.reducer;
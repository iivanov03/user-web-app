import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

import { User } from "../../types/user/User";
import { request } from "../api/service.api";

export const getUserList = createAsyncThunk("users/getUserList", async () => {
    const response = await request.get("/users");
    return response.data;
});

export const getUserDetail = createAsyncThunk(
    "users/getUserDetail",
    async (id: number) => {
        const response = await request.get(`/users/${id}`);
        return response.data;
    }
);

export const editUser = createAsyncThunk(
    "users/editUser",
    async (user: any) => {
        const response = await request.put(`/users/${user.id}`, user);
        return response.data;
    }
);

interface InitialStateType {
    userList: User[];
    userDetail: User;
    updatedUser: any;
    loadingUsers: boolean;
}

const initialState: InitialStateType = {
    userList: [],
    userDetail: {
        id: 0,
        name: "",
        username: "",
        email: "",
        address: {
            street: "",
            suite: "",
            city: "",
            zipcode: "",
            geo: {
                lat: "",
                lng: ""
            }
        },
        phone: "",
        website: "",
        company: {
            name: "",
            catchPhrase: "",
            bs: ""
        }
    },
    updatedUser: {
        username: "",
        email: "",
        "address.street": "",
        "address.suite": "",
        "address.city": "",
        id: 0
    },
    loadingUsers: true
};

const usersSlice = createSlice({
    name: "users",
    initialState,
    reducers: {},
    extraReducers: {
        [getUserList.pending.toString()]: (state) => {
            state.loadingUsers = true;
        },
        [getUserList.fulfilled.toString()]: (
            state,
            action: PayloadAction<User[]>
        ) => {
            if (!action.payload) return;
            state.userList = [...action.payload];
            state.loadingUsers = false;
        },
        [getUserList.rejected.toString()]: (state) => {
            state.loadingUsers = false;
        },

        [getUserDetail.pending.toString()]: (state) => {
            state.loadingUsers = true;
        },
        [getUserDetail.fulfilled.toString()]: (
            state,
            action: PayloadAction<User>
        ) => {
            state.loadingUsers = false;
            state.userDetail = { ...action.payload };
        },
        [getUserDetail.rejected.toString()]: (state) => {
            state.loadingUsers = true;
        },

        [editUser.pending.toString()]: (state) => {
            state.loadingUsers = true;
        },
        [editUser.fulfilled.toString()]: (
            state,
            action: PayloadAction<User>
        ) => {
            state.loadingUsers = false;
            state.updatedUser = { ...action.payload };
        },
        [editUser.rejected.toString()]: (state) => {
            state.loadingUsers = true;
        }
    }
});

export default usersSlice.reducer;
// api.js
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import axios from "axios";

// Define your base query function with the API base URL

const getToken = () => {
    const token = localStorage.getItem("accessToken");
    if (token) {
        return JSON.parse(token);
    }
    return null;
};

export const axiosInstance = axios.create({
    baseURL: `http://localhost/api/v1`,
});

// Add an interceptor to handle 401 errors

axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && error.response.status === 401) {
            const ottToken = error.response.headers["ott"];
            if (ottToken) {
                // Dispatch an action or perform some action with the token
                localStorage.setItem("resetToken", JSON.stringify(ottToken));
            }
        }

        return Promise.reject(error);
    }
);

const baseQuery = fetchBaseQuery({
    baseUrl:  `http://localhost/api/v1`,
    prepareHeaders: (headers, { getState }) => {
        const token = getToken();
        if (token) {
            headers.set("at", token);
            headers.set("Content-Type", "application/json");
        }
        return headers;
    },
});

const baseQueryWithReauth = async (args, api, extraOptions) => {
    let result = await baseQuery(args, api, extraOptions);
    if (result.error && result.error.status === 401) {
        // try to get a new token
        const refreshResult = JSON.parse(localStorage.getItem("refreshToken"));
        if (refreshResult) {
            // store the new token
            localStorage.setItem("accessToken", JSON.stringify(refreshResult));
            // retry the initial query
            result = await baseQuery(args, api, extraOptions);
        } else {
            // api.dispatch(loggedOut())
        }
    }
    return result;
};

export const api = createApi({
    baseQuery: baseQueryWithReauth,
    tagTypes: ["User", "Register", "Movie"],
    endpoints: (builder) => ({
        registration: builder.mutation({
            query: (data) => ({
                url: "auth/user/register",
                method: "POST",
                body: data,
            }),
            invalidatesTags: ["Register"],
        }),
        login: builder.mutation({
            query: ({ data }) => ({
                url: "auth/user/login",
                method: "POST",
                body: data,
            }),
        }),
        favourite: builder.mutation({
            query: (data ) => ({
                url: "movie/favourite",
                method: "POST",
                body: data,
            }),
            invalidatesTags:['Movie']
        }),
        like: builder.mutation({
            query: (data ) => ({
                url: "movie/like",
                method: "POST",
                body: data,
            }),
            invalidatesTags:['Movie']
        }),
        movie: builder.query({
            query: ({limit, offset, userId}) => ({
                url: `/movie?limit=${limit}&offset=${offset}&userId=${userId}`,
                method: "GET",
            }),
            providesTags:['Movie']
        }),
        getFavourite: builder.query({
            query: ({limit, offset, userId}) => ({
                url: `/favourite?limit=${limit}&offset=${offset}&userId=${userId}`,
                method: "GET",
            }),
            providesTags:['Movie']
        }),
        resetPassword: builder.mutation({
            query: ({ data }) => ({
                url: "auth/reset",
                method: "POST",
                body: data,
            }),
        }),
    }),
});

// Export actions, hooks, and selectors
export const {
    useRegistrationMutation,
    useFavouriteMutation,
    useGetFavouriteQuery,
    useLikeMutation,
    useLoginMutation,
    useMovieQuery,
    useResetPasswordMutation,
} = api;

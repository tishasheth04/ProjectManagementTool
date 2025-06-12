import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

const API_URI = "http://localhost:5000/api";


const baseQuery = fetchBaseQuery({ baseUrl: "" });


export const apiSlice = createApi ({
    baseQuery,
    tagTypes: [],
    endpoints: (builder)=> ({}),
});
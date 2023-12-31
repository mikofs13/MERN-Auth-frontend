import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react"

const baseQuery = fetchBaseQuery({
    baseUrl: "https://mern-first-mike-project-api.onrender.com"
});

export const apiSlice = createApi({
    baseQuery,
    tagTypes: ["User"],
    endpoints: (builder) => ({})
})
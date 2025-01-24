import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "listUsersApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5173/api",
    prepareHeaders: (headers) => {
      headers.append("content-type", "application/json");
      headers.append("Access-Control-Allow-Origin", "*");
    },
  }),
  tagTypes: ["users"],
  endpoints: () => ({}),
});

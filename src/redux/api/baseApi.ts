import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { TUserInfo } from "../../types/baseApi.types";

const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:9000/api/v1" }),
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (userInfo: TUserInfo) => ({
        url: "/auth/login",
        method: "POST",
        body: userInfo,
      }),
    }),
  }),
});

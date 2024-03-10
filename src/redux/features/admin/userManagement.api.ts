import { baseApi } from "../../api/baseApi";

export const academicSemesterApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createStudent: builder.mutation({
      query: (data) => {
        return {
          url: "users/create-student",
          method: "POST",
          body: data,
        };
      },
    }),
  }),
});

export const { useCreateStudentMutation } = academicSemesterApi;

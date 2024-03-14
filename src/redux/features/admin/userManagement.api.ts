import { TQueryParam } from "../../../pages/admin/userManagement/Students";
import { TResponseRedux } from "../../../types";
import {
  TAdmin,
  TFaculty,
  TStudent,
} from "../../../types/userManagement.types";
import { baseApi } from "../../api/baseApi";

export const userManagementApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllStudents: builder.query({
      query: (args) => {
        const params = new URLSearchParams();
        if (args) {
          args.forEach((item: TQueryParam) =>
            params.append(item.name, item.value as string)
          );
        }
        return {
          url: "students",
          method: "GET",
          params,
        };
      },
      transformResponse: (response: TResponseRedux<TStudent[]>) => {
        return {
          data: response.data,
          meta: response.meta,
        };
      },
      providesTags: ["Students"],
    }),
    createStudent: builder.mutation({
      query: (data) => {
        return {
          url: "users/create-student",
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["Students"],
    }),
    getSingleStudent: builder.query({
      query: (studentId: string | undefined) => ({
        url: `students/${studentId}`,
        method: "GET",
      }),
    }),
    getAllFaculties: builder.query({
      query: (args) => {
        const params = new URLSearchParams();
        if (args) {
          args.forEach((item: TQueryParam) =>
            params.append(item.name, item.value as string)
          );
        }

        return {
          url: "faculties",
          method: "GET",
          params,
        };
      },
      transformResponse: (response: TResponseRedux<TFaculty[]>) => {
        return {
          data: response.data,
          meta: response.meta,
        };
      },
      providesTags: ["Faculties"],
    }),
    createFaculty: builder.mutation({
      query: (data) => ({
        url: "users/create-faculty",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Faculties"],
    }),
    getAllAdmins: builder.query({
      query: (args) => {
        const params = new URLSearchParams();
        if (args) {
          args.forEach((item: TQueryParam) =>
            params.append(item.name, item.value as string)
          );
        }

        return {
          url: "admins",
          method: "GET",
          params,
        };
      },
      transformResponse: (response: TResponseRedux<TAdmin[]>) => {
        return {
          data: response.data,
          meta: response.meta,
        };
      },
      providesTags: ["Admins"],
    }),
    createAdmin: builder.mutation({
      query: (data) => ({
        url: "users/create-admin",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Admins"],
    }),
  }),
});

export const {
  useCreateStudentMutation,
  useGetAllStudentsQuery,
  useGetSingleStudentQuery,
  useCreateFacultyMutation,
  useGetAllFacultiesQuery,
  useCreateAdminMutation,
  useGetAllAdminsQuery,
} = userManagementApi;

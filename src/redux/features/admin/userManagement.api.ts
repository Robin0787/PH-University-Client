import { TQueryParam } from "../../../pages/admin/userManagement/Students";
import { TResponseRedux } from "../../../types";
import { TStudent } from "../../../types/userManagement.types";
import { baseApi } from "../../api/baseApi";

export const academicSemesterApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllStudents: builder.query({
      query: (args) => {
        const params = new URLSearchParams();
        if (args) {
          args.forEach((item: TQueryParam) =>
            params.append(item.name, item.value as string)
          );
        }

        console.log(args);

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
    }),
    createStudent: builder.mutation({
      query: (data) => {
        return {
          url: "users/create-student",
          method: "POST",
          body: data,
        };
      },
    }),
    getSingleStudent: builder.query({
      query: (studentId: string | undefined) => ({
        url: `students/${studentId}`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useCreateStudentMutation,
  useGetAllStudentsQuery,
  useGetSingleStudentQuery,
} = academicSemesterApi;

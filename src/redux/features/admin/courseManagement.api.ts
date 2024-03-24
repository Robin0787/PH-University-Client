import { TQueryParam } from "../../../pages/admin/userManagement/Students";
import { TResponseRedux } from "../../../types";
import {
  TCourse,
  TSemesterRegistration,
} from "../../../types/courseManagement.types";
import { baseApi } from "../../api/baseApi";

export const courseManagementApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllRegisteredSemester: builder.query({
      query: (args) => {
        const params = new URLSearchParams();
        if (args) {
          args.forEach((item: TQueryParam) =>
            params.append(item.name, item.value as string)
          );
        }
        return {
          url: "/semester-registrations",
          method: "GET",
          params,
        };
      },
      transformResponse: (
        response: TResponseRedux<TSemesterRegistration[]>
      ) => {
        return {
          data: response.data,
          meta: response.meta,
        };
      },
      providesTags: ["SemesterRegistration"],
    }),
    createSemesterRegistration: builder.mutation({
      query: (data) => ({
        url: "/semester-registrations/create-semester-registration",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["SemesterRegistration"],
    }),
    updateRegisteredSemesterStatus: builder.mutation({
      query: (args: { data: { status: string }; _id: string }) => ({
        url: `/semester-registrations/${args._id}`,
        method: "PATCH",
        body: args.data,
      }),
      invalidatesTags: ["SemesterRegistration"],
    }),
    getAllCourses: builder.query({
      query: (args) => {
        const params = new URLSearchParams();
        if (args) {
          args.forEach((item: TQueryParam) =>
            params.append(item.name, item.value as string)
          );
        }
        return {
          url: "/courses",
          method: "GET",
          params,
        };
      },
      transformResponse: (response: TResponseRedux<TCourse[]>) => {
        return {
          data: response.data,
          meta: response.meta,
        };
      },
      providesTags: ["Courses"],
    }),
    createCourse: builder.mutation({
      query: (data) => ({
        url: "/courses",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Courses"],
    }),
    assignFacultiesToCourse: builder.mutation({
      query: (args) => ({
        url: `/courses/${args.courseId}/assign-faculties`,
        method: "PUT",
        body: args.data,
      }),
      invalidatesTags: ["Courses"],
    }),
  }),
});

export const {
  useGetAllRegisteredSemesterQuery,
  useCreateSemesterRegistrationMutation,
  useUpdateRegisteredSemesterStatusMutation,
  useGetAllCoursesQuery,
  useCreateCourseMutation,
  useAssignFacultiesToCourseMutation,
} = courseManagementApi;

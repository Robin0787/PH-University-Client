import { TQueryParam } from "../../../pages/admin/userManagement/Students";
import { TResponseRedux } from "../../../types";
import { TOfferedCourse } from "../../../types/courseManagement.types";
import { baseApi } from "../../api/baseApi";

export const courseManagementApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getMyOfferedCourses: builder.query({
      query: (args) => {
        const params = new URLSearchParams();
        if (args) {
          args.forEach((item: TQueryParam) =>
            params.append(item.name, item.value as string)
          );
        }
        return {
          url: "/offered-courses/my-offered-courses",
          method: "GET",
          params,
        };
      },
      transformResponse: (response: TResponseRedux<TOfferedCourse[]>) => {
        return {
          data: response.data,
          meta: response.meta,
        };
      },
      providesTags: ["OfferedCourses"],
    }),
    enrollToCourse: builder.mutation({
      query: (data) => ({
        url: "/enrolled-courses/create-enrolled-course",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["OfferedCourses", "EnrolledCourses"],
    }),
    getMyEnrolledCourses: builder.query({
      query: (args) => {
        const params = new URLSearchParams();
        if (args) {
          args.forEach((item: TQueryParam) =>
            params.append(item.name, item.value as string)
          );
        }
        return {
          url: "/enrolled-courses/my-enrolled-courses",
          method: "GET",
          params,
        };
      },
      transformResponse: (response: TResponseRedux<TOfferedCourse[]>) => {
        return {
          data: response.data,
          meta: response.meta,
        };
      },
      providesTags: ["EnrolledCourses"],
    }),
  }),
});

export const {
  useGetMyOfferedCoursesQuery,
  useEnrollToCourseMutation,
  useGetMyEnrolledCoursesQuery,
} = courseManagementApi;

import { TResponseRedux } from "../../../types";
import { TOfferedCourse } from "../../../types/courseManagement.types";
import { baseApi } from "../../api/baseApi";

export const courseManagementApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getMyOfferedCourses: builder.query({
      query: () => {
        return {
          url: "/offered-courses/my-offered-courses",
          method: "GET",
        };
      },
      transformResponse: (response: TResponseRedux<TOfferedCourse[]>) => {
        return {
          data: response.data,
          meta: response.meta,
        };
      },
      providesTags: ["SemesterRegistration"],
    }),
  }),
});

export const { useGetMyOfferedCoursesQuery } = courseManagementApi;

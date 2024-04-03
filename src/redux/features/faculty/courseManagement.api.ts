import { TQueryParam } from "../../../pages/admin/userManagement/Students";
import { TResponseRedux } from "../../../types";
import { MyEnrolledCourse } from "../../../types/facultyCourses.types";
import { baseApi } from "../../api/baseApi";

export const courseManagementApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getFacultyCourses: builder.query({
      query: (args) => {
        const params = new URLSearchParams();
        if (args) {
          args.forEach((item: TQueryParam) => {
            if (item.value) {
              params.append(item.name, item.value as string);
            }
          });
        }
        return {
          url: "/enrolled-courses",
          method: "GET",
          params,
        };
      },
      transformResponse: (response: TResponseRedux<MyEnrolledCourse[]>) => {
        return {
          data: response.data,
          meta: response.meta,
        };
      },
      providesTags: ["EnrolledCourses"],
    }),
  }),
});

export const { useGetFacultyCoursesQuery } = courseManagementApi;

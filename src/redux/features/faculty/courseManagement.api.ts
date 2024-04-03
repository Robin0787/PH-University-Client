import { TQueryParam } from "../../../pages/admin/userManagement/Students";
import { TResponseRedux } from "../../../types";
import { MyEnrolledCourse } from "../../../types/facultyCourses.types";
import { TStudent } from "../../../types/userManagement.types";
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
    getFacultyStudents: builder.query({
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
          url: "/enrolled-courses/my-students",
          method: "GET",
          params,
        };
      },
      transformResponse: (
        response: TResponseRedux<{ _id: string; student: TStudent }[]>
      ) => {
        return {
          data: response.data,
          meta: response.meta,
        };
      },
      providesTags: ["EnrolledCourses"],
    }),
    updatedStudentMarks: builder.mutation({
      query: (data) => ({
        url: "/enrolled-courses/updated-enrolled-course-marks",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {
  useGetFacultyCoursesQuery,
  useGetFacultyStudentsQuery,
  useUpdatedStudentMarksMutation,
} = courseManagementApi;

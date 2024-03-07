import { TQueryParam } from "../../../pages/admin/academicManagement/academicSemester/AcademicSemester";
import { TResponseRedux } from "../../../types";
import { TAcademicSemester } from "../../../types/academicManagement.types";
import { baseApi } from "../../api/baseApi";

export const academicSemesterApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllSemester: builder.query({
      query: (args) => {
        const params = new URLSearchParams();
        if (args) {
          args.forEach((item: TQueryParam) => {
            params.append(item.name, item.value as string);
          });
        }

        return {
          url: "/academic-semesters",
          method: "GET",
          params: params,
        };
      },
      transformResponse: (response: TResponseRedux<TAcademicSemester[]>) => {
        return {
          data: response.data,
          meta: response.meta,
        };
      },
    }),
    createAcademicSemester: builder.mutation({
      query: (data) => ({
        url: "/academic-semesters/create-academic-semester",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useGetAllSemesterQuery, useCreateAcademicSemesterMutation } =
  academicSemesterApi;
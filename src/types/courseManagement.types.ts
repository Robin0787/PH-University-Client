import { TAcademicSemester } from "./academicManagement.types";

export type TSemesterRegistration = {
  _id: string;
  academicSemester: TAcademicSemester;
  status: string;
  startDate: string;
  endDate: string;
  minCredit: number;
  maxCredit: number;
  createdAt: string;
  updatedAt: string;
};

export type TPreRequisiteCourse = {
  course: string;
  isDeleted: Boolean;
};

export type TCourse = {
  title: string;
  prefix: string;
  code: number;
  credits: number;
  preRequisiteCourses: [TPreRequisiteCourse];
  isDeleted: Boolean;
};

export type TCourseFaculties = {
  course: string;
  faculties: [string];
};

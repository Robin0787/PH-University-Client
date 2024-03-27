import {
  TAcademicDepartment,
  TAcademicFaculty,
  TAcademicSemester,
} from "./academicManagement.types";
import { TFaculty } from "./userManagement.types";

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
  _id?: string;
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

export type TOfferedCourse = {
  _id: string;
  semesterRegistration: TSemesterRegistration;
  academicSemester: TAcademicSemester;
  academicFaculty: TAcademicFaculty;
  academicDepartment: TAcademicDepartment;
  course: TCourse;
  faculty: TFaculty;
  maxCapacity: number;
  section: number;
  days: string[];
  startTime: string;
  endTime: string;
};

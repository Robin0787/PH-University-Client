import {
  TAcademicDepartment,
  TAcademicFaculty,
  TAcademicSemester,
} from "./academicManagement.types";
import {
  TCourse,
  TCourseGrade,
  TCourseMarks,
  TOfferedCourse,
  TSemesterRegistration,
} from "./courseManagement.types";
import { TFaculty, TStudent } from "./userManagement.types";

export type MyEnrolledCourse = {
  _id: string;
  academicDepartment: TAcademicDepartment;
  academicFaculty: TAcademicFaculty;
  academicSemester: TAcademicSemester;
  course: TCourse;
  courseMarks: TCourseMarks;
  faculty: TFaculty;
  grade: TCourseGrade;
  gradePoints: number;
  isCompleted: boolean;
  isEnrolled: boolean;
  offeredCourse: TOfferedCourse;
  semesterRegistration: TSemesterRegistration;
  student: TStudent;
};

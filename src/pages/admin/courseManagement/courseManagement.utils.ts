import {
  TAcademicDepartment,
  TAcademicFaculty,
  TAcademicSemester,
} from "../../../types/academicManagement.types";
import {
  TCourse,
  TSemesterRegistration,
} from "../../../types/courseManagement.types";
import { TFaculty } from "../../../types/userManagement.types";

export const getRegisteredSemesterOptions = (
  registeredSemesters: TSemesterRegistration[] | undefined
) => {
  if (!registeredSemesters) {
    return [];
  }
  return registeredSemesters.map((item) => ({
    value: item._id,
    label: `${item.academicSemester?.name} - ${item.academicSemester?.year} (${item.academicSemester?.startMonth}-${item.academicSemester?.endMonth})`,
  }));
};

export const getAcademicSemesterOptions = (
  academicSemesters: TAcademicSemester[] | undefined
) => {
  if (!academicSemesters) {
    return [];
  }
  return academicSemesters.map((item) => ({
    value: item._id,
    label: `${item?.name} - ${item?.year} (${item?.startMonth}-${item?.endMonth})`,
  }));
};

export const getAcademicFacultyOptions = (
  academicFaculty: TAcademicFaculty[] | undefined
) => {
  if (!academicFaculty) {
    return [];
  }
  return academicFaculty.map((item) => ({
    value: item._id,
    label: item.name,
  }));
};

export const getAcademicDepartmentOptions = (
  academicDepartment: TAcademicDepartment[] | undefined
) => {
  if (!academicDepartment) {
    return [];
  }
  return academicDepartment.map((item) => ({
    value: item._id,
    label: item.name,
  }));
};

export const getCourseOptions = (courseData: TCourse[] | undefined) => {
  if (!courseData) {
    return [];
  }
  return courseData.map((item) => ({
    value: item._id,
    label: item.title,
  }));
};

export const getFacultyOptions = (facultyData: TFaculty[] | undefined) => {
  if (!facultyData) {
    return [];
  }
  return facultyData.map((item) => ({
    value: item._id,
    label: item.fullName,
  }));
};

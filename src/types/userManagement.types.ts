import {
  TAcademicDepartment,
  TAcademicFaculty,
} from "./academicManagement.types";

export type TStudentName = {
  firstName: string;
  middleName?: string;
  lastName: string;
};

export type TGender = "Male" | "Female";

export type TGuardian = {
  fatherName: string;
  fatherOccupation: string;
  fatherContactNo: string;
  motherName: string;
  motherOccupation: string;
  motherContactNo: string;
};

export type TBloodGroup =
  | "A+"
  | "A-"
  | "B+"
  | "B-"
  | "O+"
  | "O-"
  | "AB+"
  | "AB-";

export type TLocalGuardian = {
  name: string;
  occupation: string;
  contactNo: string;
  address: string;
};

export interface TStudent {
  _id: string;
  id: string;
  user: string;
  name: TStudentName;
  fullName: string;
  email: string;
  gender: TGender;
  dateOfBirth?: string;
  contactNo: string;
  emergencyContactNo: string;
  admissionSemester: string;
  academicDepartment: TAcademicDepartment;
  academicFaculty: TAcademicFaculty;
  bloodGroup: TBloodGroup;
  presentAddress: string;
  permanentAddress: string;
  guardian: TGuardian;
  localGuardian: TLocalGuardian;
  profileImage: string;
  isDeleted: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export type TFacultyName = {
  firstName: string;
  middleName?: string;
  lastName: string;
};

export interface TFaculty {
  _id: string;
  id: string;
  name: TFacultyName;
  fullName: string;
  designation: string;
  email: string;
  gender: TGender;
  dateOfBirth?: string;
  contactNo: string;
  emergencyContactNo: string;
  academicDepartment: TAcademicDepartment;
  academicFaculty: TAcademicFaculty;
  bloodGroup?: TBloodGroup;
  presentAddress: string;
  permanentAddress: string;
  profileImage: string;
  isDeleted?: boolean;
}

export interface TCourseWithFaculties {
  _id: string;
  course: string;
  faculties: TFaculty[];
}

export interface TAdmin {
  _id: string;
  id: string;
  name: TFacultyName;
  fullName: string;
  designation: string;
  email: string;
  gender: TGender;
  dateOfBirth?: string;
  contactNo: string;
  emergencyContactNo: string;
  managementDepartment: TAcademicDepartment;
  bloodGroup?: TBloodGroup;
  presentAddress: string;
  permanentAddress: string;
  profileImage?: string;
}

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
  academicDepartment: string;
  academicFaculty: string;
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

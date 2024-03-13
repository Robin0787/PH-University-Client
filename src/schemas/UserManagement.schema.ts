import { z } from "zod";

const nameSchema = z.object({
  firstName: z
    .string({ required_error: "This field is required!" })
    .min(3, { message: "firstName must have minimum 3 characters" })
    .max(20, { message: "firstName can't have more than 20 characters" })
    .refine((value) => /^[A-Z]/.test(value), {
      message: "firstName must start with a capital letter.",
    }),
  middleName: z.string().optional(),
  lastName: z
    .string({ required_error: "This field is required!" })
    .min(3, { message: "lastName must have minimum 3 characters" })
    .max(20, { message: "lastName can't have more than 20 characters" }),
});

const guardianSchema = z.object({
  fatherName: z.string({ required_error: "This field is required!" }),
  fatherOccupation: z.string({ required_error: "This field is required!" }),
  fatherContactNo: z.string({ required_error: "This field is required!" }),
  motherName: z.string({ required_error: "This field is required!" }),
  motherOccupation: z.string({ required_error: "This field is required!" }),
  motherContactNo: z.string({ required_error: "This field is required!" }),
});

const localGuardianSchema = z.object({
  name: z.string({ required_error: "This field is required!" }),
  occupation: z.string({ required_error: "This field is required!" }),
  contactNo: z.string({ required_error: "This field is required!" }),
  address: z.string({ required_error: "This field is required!" }),
});

const studentCreateValidationSchema = z.object({
  name: nameSchema,
  gender: z.enum(["Male", "Female"], {
    required_error: "This field is required!",
  }),
  dateOfBirth: z.any({ required_error: "This field is required!" }),
  bloodGroup: z.enum(["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"], {
    required_error: "This field is required!",
  }),
  image: z.any().optional(),

  email: z
    .string({
      invalid_type_error: "Value must be an email",
      required_error: "This field is required!",
    })
    .email(),
  contactNo: z.string({ required_error: "This field is required!" }),
  emergencyContactNo: z.string({ required_error: "This field is required!" }),

  guardian: guardianSchema,

  localGuardian: localGuardianSchema,

  presentAddress: z.string({ required_error: "This field is required!" }),
  permanentAddress: z.string({ required_error: "This field is required!" }),

  admissionSemester: z.string({ required_error: "This field is required!" }),
  academicDepartment: z.string({ required_error: "This field is required!" }),
});

export const studentValidationSchemas = {
  studentCreateValidationSchema,
};

const facultyCreateValidationSchema = z.object({
  name: nameSchema,
  designation: z.string({ required_error: "This field is required!" }),
  email: z.string({ required_error: "This field is required!" }).email(),
  gender: z.enum(["Male", "Female"], {
    required_error: "This field is required!",
  }),
  dateOfBirth: z.any({ required_error: "This field is required!" }),
  image: z.any().optional(),
  contactNo: z.string({ required_error: "This field is required!" }),
  emergencyContactNo: z.string({ required_error: "This field is required!" }),
  academicDepartment: z.string({ required_error: "This field is required!" }),
  bloodGroup: z.enum(["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"], {
    required_error: "This field is required!",
  }),
  presentAddress: z.string({ required_error: "This field is required!" }),
  permanentAddress: z.string({ required_error: "This field is required!" }),
});

export const facultyValidationSchemas = {
  facultyCreateValidationSchema,
};

const adminCreateValidationSchema = z.object({
  name: nameSchema,
  designation: z.string({ required_error: "This field is required!" }),
  email: z.string({ required_error: "This field is required!" }).email(),
  gender: z.enum(["Male", "Female"], {
    required_error: "This field is required!",
  }),
  dateOfBirth: z.any(),
  image: z.any().optional(),
  contactNo: z.string({ required_error: "This field is required!" }),
  emergencyContactNo: z.string({ required_error: "This field is required!" }),
  managementDepartment: z.string({ required_error: "This field is required!" }),
  bloodGroup: z.enum(["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"], {
    required_error: "This field is required!",
  }),
  presentAddress: z.string({ required_error: "This field is required!" }),
  permanentAddress: z.string({ required_error: "This field is required!" }),
});

export const adminValidationSchemas = {
  adminCreateValidationSchema,
};

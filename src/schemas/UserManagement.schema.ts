import { z } from "zod";

const studentNameSchema = z.object({
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
  name: studentNameSchema,
  gender: z.enum(["Male", "Female"], {
    required_error: "This field is required!",
  }),
  dateOfBirth: z.string({ required_error: "This field is required!" }),
  bloodGroup: z.enum(["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"], {
    required_error: "This field is required!",
  }),

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

const studentNameSchemaForUpdate = z.object({
  firstName: z
    .string()
    .min(3, { message: "firstName must have minimum 3 characters" })
    .max(20, { message: "firstName can't have more than 20 characters" })
    .refine((value) => /^[A-Z]/.test(value), {
      message: "firstName must start with a capital letter.",
    })
    .optional(),
  middleName: z.string().optional(),
  lastName: z
    .string()
    .min(3, { message: "lastName must have minimum 3 characters" })
    .max(20, { message: "lastName can't have more than 20 characters" })
    .optional(),
});

const guardianSchemaForUpdate = z.object({
  fatherName: z.string().optional(),
  fatherOccupation: z.string().optional(),
  fatherContactNo: z.string().optional(),
  motherName: z.string().optional(),
  motherOccupation: z.string().optional(),
  motherContactNo: z.string().optional(),
});

const localGuardianSchemaForUpdate = z.object({
  name: z.string().optional(),
  occupation: z.string().optional(),
  contactNo: z.string().optional(),
  address: z.string().optional(),
});

const studentUpdateValidationSchema = z.object({
  body: z.object({
    student: z.object({
      id: z.string().optional(),
      name: studentNameSchemaForUpdate.optional(),
      email: z.string().email().optional(),
      gender: z.enum(["Male", "Female"]).optional(),
      dateOfBirth: z.string().optional(),
      contactNo: z.string().optional(),
      emergencyContactNo: z.string().optional(),
      academicDepartment: z.string().optional(),
      admissionSemester: z.string().optional(),
      bloodGroup: z
        .enum(["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"])
        .optional(),
      presentAddress: z.string().optional(),
      permanentAddress: z.string().optional(),
      guardian: guardianSchemaForUpdate.optional(),
      localGuardian: localGuardianSchemaForUpdate.optional(),
      profileImage: z.string().optional(),
    }),
  }),
});

export const studentValidationSchemas = {
  studentCreateValidationSchema,
  studentUpdateValidationSchema,
};

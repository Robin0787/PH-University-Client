import { z } from "zod";
import { DaysArray } from "../constant/global";

const courseCreateValidationSchema = z.object({
  title: z.string({ required_error: "This field is required!" }),
  prefix: z.string({ required_error: "This field is required!" }),
  code: z.string({ required_error: "This field is required!" }),
  credits: z.string({ required_error: "This field is required!" }),
});

const assignFacultiesValidationSchema = z.object({
  faculties: z.string({ required_error: "This field is required!" }).array(),
});

const offerCourseCreateValidationSchema = z.object({
  semesterRegistration: z.string({ required_error: "This field is required!" }),
  academicFaculty: z.string({ required_error: "This field is required!" }),
  academicDepartment: z.string({ required_error: "This field is required!" }),
  course: z.string({ required_error: "This field is required!" }),
  faculty: z.string({ required_error: "This field is required!" }),
  maxCapacity: z.string({ required_error: "This field is required!" }),
  section: z.string({ required_error: "This field is required!" }),
  days: z.array(z.enum([...DaysArray] as [string, ...string[]]), {
    required_error: "This field is required!",
  }),
  startTime: z.any().refine((val) => val, {
    message: "This field is required!",
  }),
  endTime: z.any().refine((val) => val, {
    message: "This field is required!",
  }),
});

export const CourseManagementValidationSchemas = {
  courseCreateValidationSchema,
  assignFacultiesValidationSchema,
  offerCourseCreateValidationSchema,
};

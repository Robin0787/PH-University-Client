import { z } from "zod";

const courseCreateValidationSchema = z.object({
  title: z.string({ required_error: "This field is required!" }),
  prefix: z.string({ required_error: "This field is required!" }),
  code: z.string({ required_error: "This field is required!" }),
  credits: z.string({ required_error: "This field is required!" }),
});

const assignFacultiesValidationSchema = z.object({
  faculties: z.string({ required_error: "This field is required!" }).array(),
});

export const CourseManagementValidationSchemas = {
  courseCreateValidationSchema,
  assignFacultiesValidationSchema,
};

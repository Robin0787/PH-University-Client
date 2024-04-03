import { z } from "zod";

const updateStudentMarksValidationSchema = z.object({
  classTest1: z.string({ required_error: "This field is required!" }),
  midTerm: z.string({ required_error: "This field is required!" }),
  classTest2: z.string({ required_error: "This field is required!" }),
  finalTerm: z.string({ required_error: "This field is required!" }),
});

export const facultyCoursesSchema = {
  updateStudentMarksValidationSchema,
};

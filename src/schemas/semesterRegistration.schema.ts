import { z } from "zod";

export const semesterRegistrationCreateValidationSchema = z.object({
  academicSemester: z.string({ required_error: "This field is required!" }),
  status: z.string({ required_error: "This field is required!" }),
  startDate: z.any().refine((val) => val, {
    message: "This field is required!",
  }),
  endDate: z.any().refine((val) => val, {
    message: "This field is required!",
  }),
  minCredit: z.string({ required_error: "This field is required!" }),
  maxCredit: z.string({ required_error: "This field is required!" }),
});

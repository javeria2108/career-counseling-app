import { z } from "zod";

export const formSchema = z
  .object({
    firstName: z.string().min(1, "First name is required"),
    lastName: z.string().min(1, "Last name is required"),
    email: z.string().email("Please enter a valid email"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string().min(1, "Confirm password is required"),
    age: z.string().refine((val) => {
      const num = parseInt(val, 10);
      return !isNaN(num) && num >= 13 && num <= 100;
    }, "Please enter a valid age (13-100)"),
    educationLevel: z.string().min(1, "Education level is required"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"], // attach error to confirmPassword field
  });

export type FormData = z.infer<typeof formSchema>;

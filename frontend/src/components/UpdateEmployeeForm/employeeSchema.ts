import { z } from "zod"
const nameReg = /\w+(?:[ -]\w+){0,2}/
const auMobileRegex = /04\d{8}/
const nameRegMsg =
  "Names can only be a maximum of 3 words, and can only contain letters, with either a hyphen or space between words"
const auMobileRegMsg =
  "Mobile numbers must start with '04' and be 10 digits long"
export const employeeSchema = z.object({
  firstName: z.string().min(3).max(20).regex(nameReg, { message: nameRegMsg }),
  middleName: z
    .string()
    .min(1)
    .max(20)
    .regex(nameReg, { message: nameRegMsg })
    .optional()
    .or(z.literal("").transform(() => undefined)),
  lastName: z.string().min(1).max(20).regex(nameReg, { message: nameRegMsg }),
  email: z
    .string()
    .email({
      message: "Invalid email address",
    })
    .or(z.literal("").transform(() => undefined)),
  emailConfirmation: z
    .string()
    .email({
      message: "Invalid email address",
    })
    .or(z.literal("").transform(() => undefined)),
  mobile: z
    .string()
    .length(10)
    .regex(auMobileRegex, { message: auMobileRegMsg })
    .or(z.literal("").transform(() => undefined)),
  address: z
    .string()
    .min(10)
    .max(80)
    .optional()
    .or(z.literal("").transform(() => undefined)),
})

export type EmployeeFormData = z.infer<typeof employeeSchema>

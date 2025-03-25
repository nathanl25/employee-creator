import { z } from "zod"
const nameReg = /\w+(?:[ -]\w+){0,2}/
const auMobileRegex = /04\d{8}/
const nameRegMsg =
  "Names can only be a maximum of 3 words, and can only contain letters, with either a hyphen or space between words"
const auMobileRegMsg =
  "Mobile numbers must start with '04' and be 10 digits long"
export const status = ["PERMANENT", "CONTRACTOR"] as const
export const basis = ["FULL_TIME", "PART_TIME"] as const
export const employeeSchema = z
  .object({
    firstName: z
      .string()
      .min(1)
      .max(20)
      .regex(nameReg, { message: nameRegMsg }),
    middleName: z
      .string()
      .min(1)
      .max(20)
      .regex(nameReg, { message: nameRegMsg })
      .optional()
      .or(z.literal("").transform(() => undefined)),
    lastName: z.string().min(1).max(20).regex(nameReg, { message: nameRegMsg }),
    email: z.string().email({
      message: "Invalid email address",
    }),
    emailConfirmation: z.string().email({
      message: "Invalid email address",
    }),
    mobile: z
      .string()
      .length(10)
      .regex(auMobileRegex, { message: auMobileRegMsg }),
    address: z.string().min(10).max(80),
    startDay: z.coerce.number().min(1).max(31),
    startMonth: z
      .object({
        value: z.number(),
      })
      .refine(mon => mon.value >= 1, { message: "Select a month" }),
    startYear: z.coerce.number().min(1980).max(2100),
    endDay: z.coerce
      .number()
      .min(1)
      .max(31)
      .optional()
      .or(z.literal("").transform(() => null)),
    endMonth: z
      .object({
        value: z.number(),
      })
      .optional(),
    // .refine(mon => mon.value >= 1, { message: "Select a month" }),
    endYear: z.coerce
      .number()
      .min(1980)
      .max(2100)
      .or(z.literal("").transform(() => null)),
    isOngoing: z.coerce.boolean(),
    weeklyHours: z.coerce.number().min(8).max(40),
    status: z.enum(status, { message: "Please select a contract type" }),
    basis: z.enum(basis, { message: "Please select an employment basis" }),
  })
  .refine(data => data.email === data.emailConfirmation, {
    message: "Emails do not match",
    path: ["emailConfirmation"],
  })
  .refine(
    data => {
      const dateSchema = z.coerce.date()
      const month = String(data.startMonth.value).padStart(2, "0")
      const start = `${data.startYear}-${month}-${data.startDay}`
      return dateSchema.safeParse(new Date(start)).success
    },
    {
      message: "Start date is invalid",
      path: ["startDay"],
    },
  )
  .refine(
    data => {
      if (data.isOngoing) {
        return true
      }
      const dateSchema = z.coerce.date()
      const month = String(data.endMonth?.value).padStart(2, "0")
      const day = String(data.endDay).padStart(2, "0")
      const end = `${data.endYear}-${month}-${day}`
      return dateSchema.safeParse(new Date(end)).success
    },
    {
      message: "End date is invalid",
      path: ["endMonth"],
    },
  )

export type EmployeeFormData = z.infer<typeof employeeSchema>

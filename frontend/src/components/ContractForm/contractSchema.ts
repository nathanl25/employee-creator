import { z } from "zod"

export const status = ["PERMANENT", "CONTRACTOR"] as const
export const basis = ["FULL_TIME", "PART_TIME"] as const
export const contractSchema = z
  .object({
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

    endYear: z.coerce
      .number()
      .min(1980)
      .max(2100)
      .optional()
      .or(z.literal("").transform(() => null)),
    isOngoing: z.coerce.boolean(),

    weeklyHours: z.coerce.number().min(8).max(40),
    status: z.enum(status, { message: "Please select a contract type" }),
    basis: z.enum(basis, { message: "Please select an employment basis" }),
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

export type ContractFormData = z.infer<typeof contractSchema>

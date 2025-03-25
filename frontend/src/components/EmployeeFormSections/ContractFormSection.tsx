import { Controller, useFormContext } from "react-hook-form"
import classes from "./FormSection.module.scss"
import { useState, type InputHTMLAttributes } from "react"
import type {
  BaseContract,
  EmployeeDisplay,
} from "../../features/employees/employeesApiSlice"
import Select from "react-select"
import { splitDate } from "../../utils/utilities"

interface ContractFormProps extends InputHTMLAttributes<HTMLInputElement> {
  values?: BaseContract
}
const months = [
  "No Month Selected",
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
]
export const monthOptions = months.map((month, index) => {
  return {
    label: month,
    value: index,
  }
})

const customStyles = {
  control: (baseStyles: any) => ({
    ...baseStyles,
    borderRadius: "10px",
    width: "260px",
    fontSize: "1.25rem",

    paddingTop: ".3em",
    paddingBottom: ".3em",
    border: "2px solid gray",
  }),
}

const ContractFormSection = ({ values, ...rest }: ContractFormProps) => {
  const {
    register,
    control,
    setValue,
    resetField,
    formState: { errors },
  } = useFormContext()
  const [disableEndDate, setDisableEndDate] = useState(values?.isOngoing)
  const toggleDisabled = () => {
    resetField("endDay")
    resetField("endMonth")
    resetField("endYear")
    setDisableEndDate(!disableEndDate)
  }
  const start = values?.startDate && splitDate(values.startDate)
  let end
  if (!values) {
    end = values
  } else {
    end = splitDate(values.endDate)
  }
  const defaultStartMonth = start
    ? monthOptions[Number(start.month)]
    : undefined
  const defaultEndMonth = end && monthOptions[Number(end.month)]

  return (
    <>
      <section>
        <h1 className={classes.heading}>Employee Status</h1>
        <div className={classes.field}>
          <label className={classes.caption}>What is the contract type?</label>
          <div className={classes.radio_container}>
            <div className={classes.radio_field}>
              <input
                type="radio"
                id="contractTypePermanent"
                value="PERMANENT"
                defaultChecked={values && values.status === "PERMANENT"}
                {...register("status")}
              />
              <label
                className={classes.radio_input}
                htmlFor="contractTypePermanent"
              >
                Permanent
              </label>
            </div>
            <div className={classes.radio_field}>
              <input
                type="radio"
                id="contractTypeContract"
                value="CONTRACTOR"
                defaultChecked={values && values.status === "CONTRACTOR"}
                {...register("status")}
              />
              <label
                className={classes.radio_input}
                htmlFor="contractTypeContract"
              >
                Contract
              </label>
            </div>
            <div className={classes.radio_error}>
              {errors?.status && <p>{`${errors?.status?.message}`}</p>}
            </div>
          </div>
        </div>
        <h1 className={classes.caption}>Start date</h1>
        <div className={classes.date_container}>
          <div className={classes.date_field}>
            <label htmlFor="startDay" className={classes.caption}>
              Day
            </label>
            <input
              type="number"
              className={classes.date_input}
              id="startDay"
              min={1}
              max={31}
              defaultValue={start && start.day}
              {...register("startDay")}
            />
            <div className={classes.date_error}>
              {errors?.startDay && <p>{`${errors?.startDay?.message}`}</p>}
            </div>
          </div>
          <div className={classes.date_field}>
            <label className={classes.caption}>Month</label>
            <Controller
              control={control}
              name="startMonth"
              render={({ field }) => (
                <Select
                  {...field}
                  options={monthOptions}
                  styles={customStyles}
                  defaultValue={defaultStartMonth}
                />
              )}
            />
            <div className={classes.date_error}>
              {errors?.startMonth && <p>{`${errors?.startMonth?.message}`}</p>}
            </div>
          </div>
          <div className={classes.date_field}>
            <label htmlFor="startYear" className={classes.caption}>
              Year
            </label>
            <input
              type="number"
              id="startYear"
              min={1980}
              max={2100}
              className={classes.date_input}
              defaultValue={start && start.year}
              {...register("startYear")}
            />
            <div className={classes.date_error}>
              {errors?.startYear && <p>{`${errors?.startYear?.message}`}</p>}
            </div>
          </div>
        </div>

        <h1 className={classes.caption}>Finish date</h1>
        <div className={classes.date_container}>
          <div className={classes.date_field}>
            <label htmlFor="endDay" className={classes.caption}>
              Day
            </label>
            <input
              type="number"
              id="endDay"
              min={1}
              max={31}
              disabled={disableEndDate}
              className={classes.date_input}
              defaultValue={end && end.day}
              {...register("endDay")}
            />
            <div className={classes.date_error}>
              {errors?.endDay && <p>{`${errors?.endDay?.message}`}</p>}
            </div>
          </div>
          <div className={classes.date_field}>
            <label className={classes.caption}>Month</label>
            <Controller
              disabled={disableEndDate}
              control={control}
              name="endMonth"
              render={({ field }) => (
                <Select
                  {...field}
                  options={monthOptions}
                  styles={customStyles}
                  defaultValue={defaultEndMonth}
                  isDisabled={disableEndDate}
                />
              )}
            />
            <div className={classes.date_error}>
              {errors?.endMonth && <p>{`${errors?.endMonth?.message}`}</p>}
            </div>
          </div>
          <div className={classes.date_field}>
            <label htmlFor="endYear" className={classes.caption}>
              Year
            </label>
            <input
              type="number"
              id="endYear"
              min={1980}
              max={2100}
              defaultValue={end && end.year}
              className={classes.date_input}
              disabled={disableEndDate}
              {...register("endYear")}
            />
            <div className={classes.date_error}>
              {errors?.endYear && <p>{`${errors?.endYear?.message}`}</p>}
            </div>
          </div>
        </div>
        <div className={classes.checkbox_field}>
          <input
            type="checkbox"
            id="ongoingChecked"
            value={"true"}
            onClick={toggleDisabled}
            defaultChecked={values && values.isOngoing}
            {...register("isOngoing")}
          />
          <label htmlFor="ongoingChecked">Ongoing</label>
          <div className={classes.radio_error}>
            {errors?.isOngoing && <p>{`${errors?.isOngoing?.message}`}</p>}
          </div>
        </div>
        <div className={classes.field}>
          <label className={classes.caption}>
            Is this on a full-time or part-time basis?
          </label>
          <div className={classes.radio_container}>
            <div className={classes.radio_field}>
              <input
                type="radio"
                id="basisTypeFullTime"
                value="FULL_TIME"
                defaultChecked={values && values.basis === "FULL_TIME"}
                {...register("basis")}
              />
              <label
                className={classes.radio_input}
                htmlFor="basisTypeFullTime"
              >
                Full-time
              </label>
            </div>
            <div className={classes.radio_field}>
              <input
                type="radio"
                id="basisTypePartTime"
                value="PART_TIME"
                defaultChecked={values && values.basis === "PART_TIME"}
                {...register("basis")}
              />
              <label
                className={classes.radio_input}
                htmlFor="basisTypePartTime"
              >
                Part-time
              </label>
            </div>
            <div className={classes.radio_error}>
              {errors?.basis && <p>{`${errors?.basis?.message}`}</p>}
            </div>
          </div>
        </div>
        <div className={classes.field}>
          <label htmlFor="weeklyHours" className={classes.caption}>
            Hours per week
          </label>
          <input
            type="number"
            id="weeklyHours"
            className={classes.hour_input}
            min={8}
            max={40}
            defaultValue={values && values.weeklyHours}
            {...register("weeklyHours")}
          />
          <div className={classes.radio_error}>
            {errors?.weeklyHours && <p>{`${errors?.weeklyHours?.message}`}</p>}
          </div>
        </div>
      </section>
    </>
  )
}

export default ContractFormSection

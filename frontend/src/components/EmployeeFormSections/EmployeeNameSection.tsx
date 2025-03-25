import { useFormContext } from "react-hook-form"
import classes from "./FormSection.module.scss"
import type { InputHTMLAttributes } from "react"
import type { EmployeeDisplay } from "../../features/employees/employeesApiSlice"

interface EmployeeNameProps extends InputHTMLAttributes<HTMLInputElement> {
  values?: EmployeeDisplay
}

const EmployeeNameSection = ({
  values,

  ...rest
}: EmployeeNameProps) => {
  const {
    register,

    formState: { errors },
  } = useFormContext()
  return (
    <>
      <section>
        <h1 className={classes.heading}>Personal Information</h1>
        <div className={classes.field}>
          <label className={classes.caption} htmlFor="firstNameInput">
            First name
          </label>
          <input
            className={classes.name_input}
            type="text"
            id="firstNameInput"
            defaultValue={values && values.firstName}
            {...register("firstName")}
          />
          <div className={classes.error_row}>
            {errors?.firstName && <p>{`${errors?.firstName?.message}`}</p>}
          </div>
        </div>
        <div className={classes.field}>
          <label className={classes.caption} htmlFor="middleNameInput">
            Middle name (if applicable)
          </label>
          <input
            className={classes.name_input}
            type="text"
            id="middleNameInput"
            defaultValue={values && values.middleName}
            {...register("middleName")}
          />
          <div className={classes.error_row}>
            {errors?.middleName && <p>{`${errors?.middleName?.message}`}</p>}
          </div>
        </div>

        <div className={classes.field}>
          <label className={classes.caption} htmlFor="lastNameInput">
            Last name
          </label>
          <input
            className={classes.name_input}
            type="text"
            id="lastNameInput"
            defaultValue={values && values.lastName}
            {...register("lastName")}
          />
          <div className={classes.error_row}>
            {errors?.lastName && <p>{`${errors?.lastName?.message}`}</p>}
          </div>
        </div>
      </section>
    </>
  )
}

export default EmployeeNameSection

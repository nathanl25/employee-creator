import { useFormContext } from "react-hook-form"
import classes from "./FormSection.module.scss"
import type { InputHTMLAttributes } from "react"
import type { EmployeeDisplay } from "../../features/employees/employeesApiSlice"

interface ContactDetailsProps extends InputHTMLAttributes<HTMLInputElement> {
  values?: EmployeeDisplay
}

const ContactDetailsSection = ({ values, ...rest }: ContactDetailsProps) => {
  const {
    register,
    formState: { errors },
  } = useFormContext()
  return (
    <>
      <section>
        <h1 className={classes.heading}>Contact details</h1>
        <div className={classes.field}>
          <label className={classes.caption} htmlFor="emailInput">
            Email address:
          </label>
          <input
            className={classes.email_input}
            type="text"
            id="emailInput"
            defaultValue={values && values.email}
            {...register("email")}
          />
          <div className={classes.error_row}>
            {errors?.email && <p>{`${errors?.email?.message}`}</p>}
          </div>
        </div>
        <div className={classes.field}>
          <label className={classes.caption} htmlFor="emailConfirmationInput">
            Confirm email address:
          </label>
          <input
            className={classes.email_input}
            type="text"
            id="emailConfirmationInput"
            defaultValue={values && values.email}
            {...register("emailConfirmation")}
          />
          <div className={classes.error_row}>
            {errors?.emailConfirmation && (
              <p>{`${errors?.emailConfirmation?.message}`}</p>
            )}
          </div>
        </div>

        <div className={classes.field}>
          <label className={classes.caption} htmlFor="mobileInput">
            Mobile number:
          </label>
          <input
            className={classes.mobile_input}
            type="text"
            id="mobileInput"
            defaultValue={values && values.mobile}
            {...register("mobile")}
          />
          <div className={classes.error_row}>
            {errors?.mobile && <p>{`${errors?.mobile?.message}`}</p>}
          </div>
        </div>
        <div className={classes.field}>
          <label className={classes.caption} htmlFor="addressInput">
            Residental address:
          </label>
          <input
            className={classes.address_input}
            type="text"
            id="addressInput"
            defaultValue={values && values.address}
            {...register("address")}
          />
          <div className={classes.error_row}>
            {errors?.address && <p>{`${errors?.address?.message}`}</p>}
          </div>
        </div>
      </section>
    </>
  )
}

export default ContactDetailsSection

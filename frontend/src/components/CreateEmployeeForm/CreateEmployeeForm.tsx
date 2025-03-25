import { useForm, FormProvider } from "react-hook-form"
import classes from "./EmployeeForm.module.scss"
import type { CreateEmployeeBody } from "../../features/employees/employeesApiSlice"
import { useAddEmployeeMutation } from "../../features/employees/employeesApiSlice"
import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import Button from "../Button/Button"
import { useNavigate } from "react-router"
import { parseErrors } from "../../utils/utilities"
import { employeeSchema, type EmployeeFormData } from "./employeeSchema"
import EmployeeNameSection from "../EmployeeFormSections/EmployeeNameSection"
import ContactDetailsSection from "../EmployeeFormSections/ContactDetailsSection"
import ContractFormSection from "../EmployeeFormSections/ContractFormSection"

const CreateEmployeeForm = () => {
  const [addEmployee] = useAddEmployeeMutation()
  const [errorMessage, setErrorMessage] = useState("")
  const navigate = useNavigate()
  const methods = useForm({
    resolver: zodResolver(employeeSchema),
  })
  const { handleSubmit, getValues } = methods

  const submitCreateWrapper = (data: EmployeeFormData) => {
    setErrorMessage("")
    const { startDay, startMonth, startYear, ...noStart } = data
    const { endDay, endMonth, endYear, ...noEnd } = noStart
    const body = { ...noEnd } as CreateEmployeeBody
    body.startDate = `${String(startYear)}-${String(startMonth.value).padStart(2, "0")}-${String(startDay).padStart(2, "0")}`
    body.endDate =
      endDay == null
        ? null
        : `${String(endYear)}-${String(endMonth?.value).padStart(2, "0")}-${String(endDay).padStart(2, "0")}`
    addEmployee(body)
      .unwrap()
      .then(() => {
        navigate("/")
      })
      .catch(err => {
        setErrorMessage(parseErrors(err.data))
      })
  }

  return (
    <>
      <FormProvider {...methods}>
        <form
          className={classes.container}
          onSubmit={handleSubmit(submitCreateWrapper)}
        >
          <EmployeeNameSection />
          <ContactDetailsSection />
          <ContractFormSection />
          <div className={classes.error_message}>{errorMessage}</div>
          <div className={classes.submit}>
            <Button
              variant="add"
              // onClick={() => {
              //   console.log(getValues())
              // }}
            >
              Submit
            </Button>
            <Button onClick={() => navigate("/")} type="button">
              Cancel
            </Button>
          </div>
        </form>
      </FormProvider>
    </>
  )
}

export default CreateEmployeeForm

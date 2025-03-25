import { useForm, FormProvider } from "react-hook-form"
import classes from "./EmployeeForm.module.scss"
import type {
  EmployeeDisplay,
  EmployeeUpdateForm,
} from "../../features/employees/employeesApiSlice"
import { useUpdateEmployeeMutation } from "../../features/employees/employeesApiSlice"
import { useState } from "react"
import type { EmployeeFormData } from "./employeeSchema"
import { employeeSchema } from "./employeeSchema"
import { zodResolver } from "@hookform/resolvers/zod"
import Button from "../Button/Button"
import { useNavigate } from "react-router"
import { parseErrors } from "../../utils/utilities"
import EmployeeNameSection from "../EmployeeFormSections/EmployeeNameSection"
import ContactDetailsSection from "../EmployeeFormSections/ContactDetailsSection"
interface EmployeeFormProps {
  values?: EmployeeDisplay
  isEditMode?: boolean
}
const UpdateEmployeeForm = ({
  values,
  isEditMode = false,
}: EmployeeFormProps) => {
  const [updateEmployee] = useUpdateEmployeeMutation()
  const [errorMessage, setErrorMessage] = useState("")
  const navigate = useNavigate()
  const methods = useForm<EmployeeFormData>({
    resolver: zodResolver(employeeSchema),
    // mode: "all",
  })
  const { handleSubmit } = methods
  const submitUpdateWrapper = async (newData: EmployeeFormData) => {
    setErrorMessage("")
    if (!values) {
      setErrorMessage("No existing employee found, cannot update data")
      return
    }

    const obj = {} as Partial<EmployeeUpdateForm>
    obj.id = values.id
    Object.assign(obj, newData)
    console.log(obj)

    updateEmployee(obj)
      .unwrap()
      .then(() => {
        console.log("updated")
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
          onSubmit={handleSubmit(submitUpdateWrapper)}
        >
          <EmployeeNameSection values={values} />
          <ContactDetailsSection values={values} />

          <div className={classes.submit}>
            <Button variant="add">Submit</Button>
            <Button onClick={() => navigate("/")} type="button">
              Cancel
            </Button>
          </div>
          <div className={classes.error_message}>{errorMessage}</div>
        </form>
      </FormProvider>
    </>
  )
}

export default UpdateEmployeeForm

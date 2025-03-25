import { useForm, FormProvider } from "react-hook-form"
import classes from "./EmployeeForm.module.scss"
import type {
  BaseContract,
  ContractDisplay,
  CreateContractBody,
  EmployeeDisplay,
  EmployeeUpdateForm,
  UpdateContractBody,
} from "../../features/employees/employeesApiSlice"
import {
  useAddContractMutation,
  useUpdateContractMutation,
  useUpdateEmployeeMutation,
} from "../../features/employees/employeesApiSlice"
import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import Button from "../Button/Button"
import { useNavigate } from "react-router"
import { parseErrors, splitDate } from "../../utils/utilities"
import EmployeeNameSection from "../EmployeeFormSections/EmployeeNameSection"
import ContactDetailsSection from "../EmployeeFormSections/ContactDetailsSection"
import { contractSchema, type ContractFormData } from "./contractSchema"
import ContractFormSection, {
  monthOptions,
} from "../EmployeeFormSections/ContractFormSection"
interface ContractProps
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > {
  employeeId: number
  contract?: ContractDisplay
  toggleView: () => void
}
const ContractForm = ({ employeeId, contract, toggleView }: ContractProps) => {
  const [updateContract] = useUpdateContractMutation()
  const [addContract] = useAddContractMutation()
  const [errorMessage, setErrorMessage] = useState("")
  const navigate = useNavigate()
  const start = contract?.startDate && splitDate(contract.startDate)
  let end
  if (!contract) {
    end = contract
  } else {
    end = splitDate(contract.endDate)
  }
  const defaultStartMonth = start
    ? monthOptions[Number(start.month)]
    : undefined
  const defaultEndMonth = end ? monthOptions[Number(end.month)] : undefined
  const methods = useForm<ContractFormData>({
    resolver: zodResolver(contractSchema),
    defaultValues: { startMonth: defaultStartMonth, endMonth: defaultEndMonth },
  })
  const { handleSubmit, getValues } = methods

  const submitUpdateWrapper = async (newData: ContractFormData) => {
    setErrorMessage("")
    if (!contract) {
      setErrorMessage("No existing contract found, cannot update data")
      return
    }
    const { startDay, startMonth, startYear, ...noStart } = newData
    const { endDay, endMonth, endYear, ...noEnd } = noStart
    const body = { ...noEnd } as UpdateContractBody
    body.startDate = `${String(startYear)}-${String(startMonth.value).padStart(2, "0")}-${String(startDay).padStart(2, "0")}`
    body.endDate =
      endDay == null
        ? null
        : `${String(endYear)}-${String(endMonth?.value).padStart(2, "0")}-${String(endDay).padStart(2, "0")}`
    body.id = contract.id
    body.employeeId = employeeId
    updateContract(body)
      .unwrap()
      .then(() => {
        console.log(body)
        console.log("updated")
        toggleView()
      })
      .catch(err => {
        setErrorMessage(parseErrors(err.data))
      })
  }
  const submitCreateWrapper = (newData: ContractFormData) => {
    setErrorMessage("")
    if (contract) {
      setErrorMessage("Cannot create a new contract using an existing one")
      return
    }
    const { startDay, startMonth, startYear, ...noStart } = newData
    const { endDay, endMonth, endYear, ...noEnd } = noStart
    const body = { ...noEnd } as CreateContractBody
    body.startDate = `${String(startYear)}-${String(startMonth.value).padStart(2, "0")}-${String(startDay).padStart(2, "0")}`
    body.endDate =
      endDay == null
        ? null
        : `${String(endYear)}-${String(endMonth?.value).padStart(2, "0")}-${String(endDay).padStart(2, "0")}`
    body.employeeId = employeeId
    addContract(body)
      .unwrap()
      .then(() => {
        console.log("updated")
        toggleView()
      })
      .catch(err => {
        setErrorMessage(parseErrors(err.data))
      })
  }
  return (
    <div>
      <FormProvider {...methods}>
        <form
          className={classes.container}
          onSubmit={handleSubmit(
            contract ? submitUpdateWrapper : submitCreateWrapper,
          )}
        >
          <ContractFormSection values={contract} />

          <div className={classes.error_message}>{errorMessage}</div>
          <div className={classes.submit}>
            <Button
              onClick={() => {
                console.log(getValues())
              }}
              variant="add"
            >
              Submit
            </Button>
            <Button onClick={toggleView} type="button">
              Cancel
            </Button>
          </div>
        </form>
      </FormProvider>
    </div>
  )
}

export default ContractForm

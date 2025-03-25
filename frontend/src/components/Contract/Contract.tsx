import { useState } from "react"
import {
  useDeleteContractMutation,
  type ContractDisplay,
} from "../../features/employees/employeesApiSlice"
import Button from "../Button/Button"
import classes from "./Contract.module.scss"
import ContractForm from "../ContractForm/ContractForm"
import { formatString } from "../../utils/utilities"
interface ContractProps
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > {
  employeeId: number
  contract: ContractDisplay
}

const Contract = ({ employeeId, contract, ...rest }: ContractProps) => {
  const [deleteContract] = useDeleteContractMutation()
  const [formShown, setFormShown] = useState(false)
  const contractEnd = contract.endDate ? new Date(contract.endDate) : new Date()
  const duration =
    contractEnd.getTime() - new Date(contract.startDate).getTime()
  const durationDate = new Date(duration)
  const years = Math.abs(durationDate.getUTCFullYear() - 1970)
  const yearsWorked = years + (years === 1 ? " yr" : " yrs")

  const status = formatString(contract.status)
  const basis = formatString(contract.basis)

  const toggleView = () => {
    setFormShown(!formShown)
  }

  const delContract = () => {
    deleteContract({ id: contract.id, employeeId: employeeId })
      .unwrap()
      .catch(err => {
        console.log(err)
      })
  }

  return (
    <div>
      <div className={classes.container}>
        <div className={classes.field}>
          <h2 className={classes.title}>Start Date</h2>
          <p className={classes.value}>{contract.startDate}</p>
        </div>
        <div className={classes.field}>
          <h2 className={classes.title}>End Date</h2>
          <p className={classes.value}>{contract.endDate}</p>
        </div>
        <div className={classes.field}>
          <h2 className={classes.title}>Tenure</h2>
          <p className={classes.value}>{yearsWorked}</p>
        </div>
        <div className={classes.field}>
          <h2 className={classes.title}>Status</h2>
          <p className={classes.value}>{status}</p>
        </div>
        <div className={classes.field}>
          <h2 className={classes.title}>Basis</h2>
          <p className={classes.value}>{basis}</p>
        </div>
        <div className={classes.field}>
          <h2 className={classes.title}>HPW</h2>
          <p className={classes.value}>{contract.weeklyHours}</p>
        </div>
        <div className={classes.button_container}>
          <Button variant="employee" onClick={toggleView}>
            Edit
          </Button>
          <Button variant="employee" onClick={delContract}>
            Delete
          </Button>
        </div>
      </div>
      {formShown && (
        <ContractForm
          contract={contract}
          employeeId={employeeId}
          toggleView={toggleView}
        />
      )}
    </div>
  )
}

export default Contract

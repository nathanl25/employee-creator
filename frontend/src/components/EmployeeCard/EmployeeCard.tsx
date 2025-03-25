// import type { Employee } from "../../features/employees/employeesApiSlice"
import Button from "../Button/Button"
import classes from "./EmployeeCard.module.scss"
import type { EmployeeDisplay } from "../../features/employees/employeesApiSlice"
import { useDeleteEmployeeMutation } from "../../features/employees/employeesApiSlice"
import { store } from "../../app/store"
import { Link, useNavigate } from "react-router"

interface EmployeeCardProps
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > {
  data: EmployeeDisplay
  // deleteFn: (id: number) => void
  // editFn: () => void
}

const EmployeeCard = ({ data, ...rest }: EmployeeCardProps) => {
  const navigate = useNavigate()
  const [deleteEmployee] = useDeleteEmployeeMutation()
  let fullName = data.firstName
  fullName += data.middleName
    ? ` ${data.middleName} ${data.lastName}`
    : ` ${data.lastName}`
  const status =
    String(data.currentEmploymentStatus).charAt(0) +
    String(data.currentEmploymentStatus).slice(1).toLowerCase()
  const yearsWorked =
    data.yearsWorked === 1
      ? data.yearsWorked + " yr"
      : data.yearsWorked + " yrs"
  return (
    <div className={classes.container}>
      <div className={classes.title}>
        <p className={classes.full_name}>
          {/* {data.firstName} */}
          {fullName}
        </p>
        <div className={classes.link_container}>
          <Button
            onClick={() => navigate("contract", { state: { id: data.id } })}
            variant="employee"
          >
            Contracts
          </Button>
          <Button
            onClick={() => navigate("update", { state: data })}
            variant="employee"
          >
            Edit
          </Button>
          <Button variant="employee" onClick={() => deleteEmployee(data.id)}>
            Remove
          </Button>
        </div>
      </div>
      <p className={classes.tenure}>{`${status} - ${yearsWorked}`}</p>
      <p className={classes.email}>{data.email}</p>
    </div>
  )
}

export default EmployeeCard

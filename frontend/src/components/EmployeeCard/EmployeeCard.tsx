import type { Employee } from "../../features/employees/employeesApiSlice"
import Button from "../Button/Button"
import classes from "./EmployeeCard.module.scss"

interface EmployeeCardProps
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > {
  data: Employee
}

const EmployeeCard = ({ data, ...rest }: EmployeeCardProps) => {
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
          <Button variant="employee">Edit</Button>
          <Button variant="employee">Remove</Button>
        </div>
      </div>
      <p className={classes.tenure}>{`${status} - ${yearsWorked}`}</p>
      <p className={classes.email}>{data.email}</p>
    </div>
  )
}

export default EmployeeCard

import Contract from "../../components/Contract/Contract"
import type { EmployeeDisplay } from "../../features/employees/employeesApiSlice"

interface ContractContainerProps {
  values: EmployeeDisplay
}
const ContractContainer = ({ values }: ContractContainerProps) => {
  return (
    <div>
      {values.contracts.map(contract => (
        <Contract
          key={contract.id}
          employeeId={values.id}
          contract={contract}
        />
      ))}
    </div>
  )
}

export default ContractContainer

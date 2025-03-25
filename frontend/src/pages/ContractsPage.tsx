import { useEffect, useState } from "react"
import { useAppDispatch } from "../app/hooks"
import { setHeading } from "../features/header/headerSlice"
import { useLocation } from "react-router"
import ContractContainer from "../containers/contractContainer/ContractContainer"
import { useGetEmployeesQuery } from "../features/employees/employeesApiSlice"
import ContractForm from "../components/ContractForm/ContractForm"
import Button from "../components/Button/Button"
import Classes from "./Pages.module.scss"

const ContractsPage = () => {
  const { state } = useLocation()
  const dispatch = useAppDispatch()
  const { data, isError, isLoading, isSuccess } = useGetEmployeesQuery()
  const [formVisible, setFormVisible] = useState(false)
  const toggleView = () => {
    setFormVisible(!formVisible)
  }
  useEffect(() => {
    dispatch(setHeading("Contracts"))
  }, [dispatch, formVisible])
  if (state == null) {
    return <p>No Employee Selected</p>
  }
  if (isError) {
    return (
      <div>
        <h2>Could not load employee list</h2>
      </div>
    )
  }

  if (isLoading) {
    return (
      <div>
        <h2>Loading...</h2>
      </div>
    )
  }
  if (isSuccess) {
    const employeeId = state.id
    const employee = data.reduce((acc, curr) => {
      acc = curr.id === employeeId ? curr : acc
      return acc
    })
    return (
      <>
        <ContractContainer values={employee} />
        <div className={Classes.buttons}>
          {!formVisible && (
            <Button onClick={toggleView} variant="add">
              Add a new contract
            </Button>
          )}
        </div>
        {formVisible && (
          <ContractForm employeeId={employee.id} toggleView={toggleView} />
        )}
      </>
    )
  }
}

export default ContractsPage

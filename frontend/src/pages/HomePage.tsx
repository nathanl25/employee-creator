import { useEffect } from "react"
import { useAppDispatch } from "../app/hooks"
import { Employees } from "../features/employees/Employees"
import { setHeading } from "../features/header/headerSlice"

const HomePage = () => {
  const dispatch = useAppDispatch()
  useEffect(() => {
    // dispatch(setHeading("Update an Existing Employee"))
    dispatch(setHeading("Employees' List"))
  }, [dispatch])
  // const dispatch = useAppDispatch()
  return <Employees />
}

export default HomePage

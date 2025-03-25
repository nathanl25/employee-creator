import { useEffect } from "react"
import { useAppDispatch } from "../app/hooks"
import { setHeading } from "../features/header/headerSlice"
import CreateEmployeeForm from "../components/CreateEmployeeForm/CreateEmployeeForm"

const CreatePage = () => {
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(setHeading("Create a New Employee"))
  }, [dispatch])
  return (
    <>
      <CreateEmployeeForm />
    </>
  )
}

export default CreatePage

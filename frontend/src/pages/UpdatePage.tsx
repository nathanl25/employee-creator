import { useLocation } from "react-router"
import { useAppDispatch } from "../app/hooks"
import UpdateEmployeeForm from "../components/UpdateEmployeeForm/UpdateEmployeeForm"
import { setHeading } from "../features/header/headerSlice"
import { useEffect } from "react"

const UpdatePage = () => {
  const { state } = useLocation()

  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(setHeading("Update an Existing Employee"))
  }, [dispatch])
  if (state == null) {
    return <p>No Employee selected</p>
  }
  return (
    <>
      <UpdateEmployeeForm values={state} isEditMode={true} />
    </>
  )
}

export default UpdatePage

import classes from "./Employees.module.scss"
import Button from "../../components/Button/Button"

import { useGetEmployeesQuery } from "./employeesApiSlice"
import EmployeeCard from "../../components/EmployeeCard/EmployeeCard"
import { Link } from "react-router"

export const Employees = () => {
  const { data, isError, isLoading, isSuccess } = useGetEmployeesQuery()

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
    return (
      <section className={classes.container}>
        <div className={classes.instructions}>
          <p>Please click on 'Edit' to find more details of each employee.</p>
          <Link to="/create">
            <Button variant="add">Add Employee</Button>
          </Link>
        </div>
        <div>
          {data.map(val => (
            <EmployeeCard data={val} key={val.id} />
          ))}
        </div>
      </section>
    )
  }
}

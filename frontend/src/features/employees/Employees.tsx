// import { useState } from 'react';
// import classes from "./Employees.modules.scss"
import classes from "./Employees.module.scss"
import Button from "../../components/Button/Button"
import { useGetQuotesQuery } from "../quotes/quotesApiSlice"
import { useGetEmployeesQuery } from "./employeesApiSlice"
import EmployeeCard from "../../components/EmployeeCard/EmployeeCard"

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
    // console.log(data)
    return (
      <section className={classes.container}>
        <div className={classes.instructions}>
          <p>Please click on 'Edit' to find more details of each employee.</p>
          <Button variant="add">Add Employee</Button>
        </div>
        <div>
          {data.map(val => (
            // <h2 key={val.id}>{val.firstName}</h2>
            <EmployeeCard data={val} key={val.id} />
          ))}
        </div>
      </section>
    )
  }
}

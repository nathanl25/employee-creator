// import { useState } from 'react';
import { useGetQuotesQuery } from "../quotes/quotesApiSlice"
import { useGetEmployeesQuery } from "./employeesApiSlice"

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
      <div>
        <h2>Employees:</h2>
        {data.map(val => (
          <h2 key={val.id}>{val.firstName}</h2>
        ))}
        {/* {data.employees.map(val => (
          <h2>{val.firstName}</h2>
        ))} */}
      </div>
    )
  }
}

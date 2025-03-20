import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
// import { quotesApiSlice } from '../quotes/quotesApiSlice'
// import { build } from 'vite'

type EmployeeStatus = "PEMANENT" | "CONTRACTOR"

export interface Employee {
  id: number
  firstName: string
  lastName: string
  middleName?: string
  email: string
  yearsWorked: number
  currentEmploymentStatus: EmployeeStatus
}

export interface EmployeeProps {
  data: Employee
}

// interface EmployeesApiResponse {
//   employees: Employee[]
// }

export const employeesApiSlice = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: "http://127.0.0.1:8080" }),
  reducerPath: "employeesApi",
  //   tagTypes: ["Employees"],
  endpoints: build => ({
    getEmployees: build.query<Employee[], void>({
      query: () => "/employee",
    }),
    // deleteEmployee: build.mutation<{ success: string, id: number}, number>({
    //   query(id) {
    //     return {

    //     }
    //   }
    // })
  }),
})

export const { useGetEmployeesQuery } = employeesApiSlice

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
// import { quotesApiSlice } from '../quotes/quotesApiSlice'
// import { build } from 'vite'

interface Employee {
  id: number
  firstName: string
  lastName: string
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
  }),
})

export const { useGetEmployeesQuery } = employeesApiSlice

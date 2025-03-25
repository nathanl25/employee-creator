import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export type EmployeeStatus = "PERMANENT" | "CONTRACTOR"
export type EmployeeBasis = "FULL_TIME" | "PART_TIME"

export interface BaseEmployee {
  firstName: string
  lastName: string
  middleName?: string
  email: string
  address: string
  mobile: string
}

export interface BaseContract {
  startDate: string
  endDate: string | null
  weeklyHours: number
  status: EmployeeStatus
  basis: EmployeeBasis
  isOngoing?: boolean
}

export interface ContractDisplay extends BaseContract {
  id: number
}

export interface CreateEmployeeBody extends BaseEmployee, BaseContract {
  emailConfirmation: string
}

export interface CreateContractBody extends BaseContract {
  employeeId: number
}

export interface EmployeeDisplay extends BaseEmployee {
  id: number
  yearsWorked: number
  currentEmploymentStatus: EmployeeStatus
  contracts: ContractDisplay[]
}

export interface UpdateContractBody extends CreateContractBody {
  id: number
}

interface DeleteContractBody {
  id: number
  employeeId: number
}

export interface EmployeeUpdateForm extends BaseEmployee {
  id: number
  emailConfirmation: string
}

export interface EmployeeProps {
  data: EmployeeDisplay
}

export const employeesApiSlice = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: "http://127.0.0.1:8080" }),
  reducerPath: "employeesApi",
  tagTypes: ["Employees"],
  endpoints: build => ({
    getEmployees: build.query<EmployeeDisplay[], void>({
      query: () => "/employee",
      providesTags: result =>
        result
          ? [
              ...result.map(({ id }) => ({ type: "Employees", id }) as const),
              { type: "Employees", id: "LIST" },
            ]
          : [{ type: "Employees", id: "LIST" }],
    }),
    addEmployee: build.mutation<EmployeeDisplay, CreateEmployeeBody>({
      query(body) {
        return {
          url: "/employee",
          method: "POST",
          body,
        }
      },
      invalidatesTags: [{ type: "Employees", id: "LIST" }],
    }),
    deleteEmployee: build.mutation<{ success: boolean; id: number }, number>({
      query(id) {
        return {
          url: `/employee/${id}`,
          method: "DELETE",
        }
      },
      invalidatesTags: (result, error, id) => [{ type: "Employees", id }],
    }),
    updateEmployee: build.mutation<
      EmployeeDisplay,
      Partial<EmployeeUpdateForm>
    >({
      query(data) {
        const { id, ...body } = data
        console.log(id)
        console.log(data)
        return {
          url: `/employee/${id}`,
          method: "PATCH",
          body,
        }
      },
      invalidatesTags: (result, error, { id }) => [{ type: "Employees", id }],
    }),
    updateContract: build.mutation<ContractDisplay, UpdateContractBody>({
      query(data) {
        const { id, employeeId, ...body } = data
        console.log(id)
        console.log(data)
        console.log(employeeId)
        return {
          url: `/employee/${employeeId}/contract/${id}`,
          method: "PATCH",
          body,
        }
      },
      invalidatesTags: (result, error, { employeeId }) => [
        { type: "Employees", employeeId },
      ],
    }),
    addContract: build.mutation<ContractDisplay, CreateContractBody>({
      query(data) {
        const { employeeId, ...body } = data
        console.log(data)
        console.log(employeeId)
        return {
          url: `/employee/${employeeId}/contract`,
          method: "POST",
          body,
        }
      },
      invalidatesTags: (result, error, { employeeId }) => [
        { type: "Employees", employeeId },
      ],
    }),
    deleteContract: build.mutation<
      { success: boolean; id: number },
      DeleteContractBody
    >({
      query(data) {
        const { employeeId, id } = data

        return {
          url: `/employee/${employeeId}/contract/${id}`,
          method: "DELETE",
        }
      },
      invalidatesTags: (result, error, { employeeId }) => [
        { type: "Employees", employeeId },
      ],
    }),
  }),
})

export const {
  useGetEmployeesQuery,
  useDeleteEmployeeMutation,
  useUpdateEmployeeMutation,
  useAddEmployeeMutation,
  useAddContractMutation,
  useUpdateContractMutation,
  useDeleteContractMutation,
} = employeesApiSlice

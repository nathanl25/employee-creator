import {
  EmployeeBasis,
  EmployeeStatus,
} from "../features/employees/employeesApiSlice"

interface ErrorData {
  error: string
  status: number
  errors: Error[]
}

interface Error {
  defaultMessage: string
  field?: string
  code: string
}

export const parseErrors = (data: any) => {
  if (!Array.isArray(data.errors)) {
    let str = ""
    const errorObjs = Object.values(data.errors)
    // for ()
    errorObjs.forEach((obj: any) => {
      obj.forEach((msg: string) => (str += msg))
    })
    return str
  }
  return data.errors.reduce((acc: any, curr: any) => {
    acc += `${curr.field ? curr.field + ": " : ""} ${curr.defaultMessage} \n`
    return acc
  }, "")
}

export const splitDate = (date: string | null) => {
  if (date == null) {
    return undefined
  }
  return {
    year: date.slice(0, 4),
    month: date.slice(5, 7),
    day: date.slice(8, 10),
  }
}

export const formatString = (value: EmployeeBasis | EmployeeStatus) => {
  let str = value.replaceAll("_", " ")
  str = str.charAt(0) + str.slice(1).toLowerCase()
  return str
}

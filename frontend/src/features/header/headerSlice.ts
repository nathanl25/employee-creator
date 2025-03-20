import type { PayloadAction } from "@reduxjs/toolkit"
import { createAppSlice } from "../../app/createAppSlice"

export interface HeaderSliceState {
  value: string
  status: "idle" | "loading" | "failed"
}

const initialState: HeaderSliceState = {
  value: "Employees' List",
  status: "idle",
}

export const headerSlice = createAppSlice({
  name: "header",
  initialState,
  reducers: create => ({
    setHeading: create.reducer((state, action: PayloadAction<string>) => {
      state.value = action.payload
    }),
  }),

  selectors: {
    selectTitle: header => header.value,
    selectStatus: header => header.status,
  },
})

export const { setHeading } = headerSlice.actions
export const { selectTitle, selectStatus } = headerSlice.selectors

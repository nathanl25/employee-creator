import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { selectStatus, selectTitle, setHeading } from "./headerSlice"
import classes from "./Header.module.scss"

export const Header = () => {
  //   const dispatch = useAppDispatch()
  const title = useAppSelector(selectTitle)
  const status = useAppSelector(selectStatus)

  if (status === "failed") {
    return (
      <div className={classes.header}>
        <h1 className={classes.heading}>Failed to load heading</h1>
      </div>
    )
  }
  if (status === "loading") {
    return (
      <div className={classes.header}>
        <h1 className={classes.heading}>Loading Heading...</h1>
      </div>
    )
  }
  return (
    <div className={classes.header}>
      <h1 className={classes.heading}>{title}</h1>
    </div>
  )
}

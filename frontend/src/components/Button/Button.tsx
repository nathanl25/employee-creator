// import { useContext } from 'react';

// import React from 'react'
import classes from "./Button.module.scss"
// import { ButtonContext } from '../../context/ButtonContextProvider';

interface ButtonProps
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  variant?: "default" | "edit" | "delete" | "add" | "close" | "employee"
}

const Button = ({
  variant = "default",
  // size = 'medium',
  children,
  ...rest
}: ButtonProps) => {
  //   const { editVisibility } = useContext(ButtonContext);
  return (
    <button className={`${classes[variant]} ${classes.large}`} {...rest}>
      {children}
    </button>
  )
}

export default Button

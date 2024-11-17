import * as React from "react"

const Button = React.forwardRef<HTMLButtonElement, React.ButtonHTMLAttributes<HTMLButtonElement>>(
  ({ className, ...props }, ref) => (
    <button
      ref={ref}
      className={`rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 ${className}`}
      {...props}
    />
  )
)
Button.displayName = "Button"

export { Button }
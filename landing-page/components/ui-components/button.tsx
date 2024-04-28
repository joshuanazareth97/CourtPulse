import React from "react";
type ButtonVariant = "primary" | "secondary";

type ButtonProps = {
  variant?: ButtonVariant;
  icon?: React.ReactNode;
  endIcon?: React.ReactNode;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

type LinkButtonProps = {
  href: string;
  internal?: boolean;
} & ButtonProps;

const primaryClasses =
  "flex items-center space-x-2 px-8 py-3 text-lg font-medium text-center text-white bg-midnight-600 rounded-md";
const secondaryClasses =
  "flex items-center space-x-2 p-3 text-gray-500 border-2 dark:text-gray-400 border-gray-500 dark:border-gray-400";

const LinkButton = ({
  children,
  href,
  variant,
  icon,
  endIcon,
  internal = false,
}: LinkButtonProps) => {
  return (
    <a
      href={href}
      target={internal ? "_self" : "_blank"}
      rel="noopener"
      className={`flex items-center space-x-2 rounded-md ${
        variant === "primary" ? primaryClasses : secondaryClasses
      } `}
    >
      {icon ? icon : null}
      <span>{children}</span>
      {endIcon ? endIcon : null}
    </a>
  );
};

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, onClick, variant, icon, endIcon, ...props }, ref) => {
    return (
      <button
        {...props}
        ref={ref}
        onClick={onClick}
        className={`${
          props.className ?? ""
        } flex items-center space-x-2 rounded-md ${
          variant === "primary" ? primaryClasses : secondaryClasses
        }`}
      >
        {icon ? icon : null}
        <span>{children}</span>
        {endIcon ? endIcon : null}
      </button>
    );
  }
);

export { Button, LinkButton };

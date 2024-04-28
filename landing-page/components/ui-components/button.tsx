import React from "react";
type ButtonVariant = "primary" | "secondary";

const LinkButton = ({
  children,
  href,
  onClick,
  variant,
  icon,
  internal = false,
}: {
  children: React.ReactNode;
  href: string;
  onClick?: () => void;
  variant?: ButtonVariant;
  icon?: React.ReactNode;
  internal?: boolean;
}) => {
  const primaryClasses =
    "flex items-center space-x-2 px-8 py-4 text-lg font-medium text-center text-white bg-midnight-600 rounded-md";
  const secondaryClasses =
    "flex items-center space-x-2 p-4 text-gray-500 border-2 dark:text-gray-400 border-gray-500 dark:border-gray-400";

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
    </a>
  );
};

export { LinkButton };

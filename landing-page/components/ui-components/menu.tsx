import { Popover, Transition } from "@headlessui/react";
import {
  ArrowTopRightOnSquareIcon,
  ChevronDownIcon,
  LinkIcon,
} from "@heroicons/react/20/solid";
import { Button } from "./button";
import React, { useRef } from "react";
import Image from "next/image";

const TIMEOUT_MS = 150;

export type MenuItem = {
  label: string;
  image: string;
} & React.AnchorHTMLAttributes<HTMLAnchorElement>;

type MenuProps = {
  buttonLabel: string;
  itemList: MenuItem[];
};

export const Menu = ({ buttonLabel, itemList }: MenuProps) => {
  const triggerRef = useRef<HTMLButtonElement>();

  const handleEnter = (isOpen: boolean) => {
    if (!isOpen && triggerRef) {
      triggerRef.current?.click?.();
    }
  };

  return (
    <Popover className="relative">
      {({ open }) => (
        <div onClick={() => handleEnter(open)}>
          <Popover.Button
            ref={triggerRef}
            as={Button}
            variant="primary"
            endIcon={
              <ChevronDownIcon
                className={`${
                  open ? "rotate-180 transform transition-transform" : ""
                }w-5 h-5`}
              />
            }
          >
            {buttonLabel}
          </Popover.Button>

          <Transition
            className={`absolute z-10 w-60 mt-2 origin-top-right bg-gray-50 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none`}
            show={open}
            enter="transition duration-100 ease-out"
            enterFrom="transform scale-95 opacity-0"
            enterTo="transform scale-100 opacity-100"
            leave="transition duration-75 ease-out"
            leaveFrom="transform scale-100 opacity-100"
            leaveTo="transform scale-95 opacity-0"
          >
            <Popover.Panel>
              <div className="flex flex-col">
                {(itemList ?? []).map(({ label, href, image }) => (
                  <MenuItem
                    className="hover:bg-gray-200 p-4 first:rounded-t-md last:rounded-b-md"
                    key={href}
                    href={href}
                    label={label}
                    image={image}
                  />
                ))}
              </div>
            </Popover.Panel>
          </Transition>
        </div>
      )}
    </Popover>
  );
};

const MenuItem = ({ label, image, className, ...props }: MenuItem) => {
  return (
    <a
      target="__blank"
      rel="noopener"
      className={` ${className} flex items-center gap-4 font-semibold text-midnight-500`}
      {...props}
    >
      <Image src={image} alt={label} className="w-8 h-8 rounded-md" />
      <span>{label}</span>
      <ArrowTopRightOnSquareIcon className="w-3" />
    </a>
  );
};

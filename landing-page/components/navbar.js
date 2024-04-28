import { Disclosure } from "@headlessui/react";
import Image from "next/image";
import Link from "next/link";
import { CALL_TO_ACTION, CTA_LINK } from "../constants/contentStrings";
import ThemeChanger from "./DarkSwitch";
import Container from "./container";
import { Hamburger, LinkButton } from "./ui-components";

const Navbar = () => {
  const navigation = ["Features", "Benefits", "FAQ"];

  return (
    <div className="w-full">
      <Container
        Component="nav"
        className="container relative flex flex-wrap items-center justify-between p-8 mx-auto lg:justify-between xl:px-0"
      >
        {/* Logo  */}
        <Disclosure>
          {({ open }) => (
            <>
              <div className="flex flex-wrap items-center justify-between w-full lg:w-auto">
                <Link href="/">
                  <span className="flex items-center space-x-2 text-2xl font-medium text-indigo-500 dark:text-gray-100">
                    <span>
                      <Image
                        src="/img/logo.svg"
                        alt="N"
                        width="32"
                        height="32"
                        className="w-8"
                      />
                    </span>
                    <span>CourtPulse</span>
                  </span>
                </Link>

                <Disclosure.Button
                  aria-label="Toggle Menu"
                  className="px-2 py-1 ml-auto text-gray-500 rounded-md lg:hidden hover:text-indigo-500 focus:text-indigo-500 focus:bg-indigo-100 focus:outline-none dark:text-gray-300 dark:focus:bg-trueGray-700"
                >
                  <Hamburger open={open} />
                </Disclosure.Button>

                <Disclosure.Panel className="flex flex-wrap w-full my-5 lg:hidden">
                  <>
                    {navigation.map((item, index) => (
                      <Link
                        key={index}
                        href={`#${item.toLowerCase()}`}
                        className="w-full px-4 py-2 -ml-4 text-gray-500 rounded-md dark:text-gray-300 hover:text-indigo-500 focus:text-indigo-500 focus:bg-indigo-100 dark:focus:bg-gray-800 focus:outline-none"
                      >
                        {item}
                      </Link>
                    ))}
                    <LinkButton variant="primary" href={CTA_LINK}>
                      {CALL_TO_ACTION}
                    </LinkButton>
                  </>
                </Disclosure.Panel>
              </div>
            </>
          )}
        </Disclosure>

        {/* menu  */}
        <div className="hidden text-center lg:flex lg:items-center">
          <ul className="items-center justify-end flex-1 pt-6 list-none lg:pt-0 lg:flex">
            {navigation.map((item, index) => (
              <li className="mr-3 nav__item" key={index}>
                <a
                  href={`#${item.toLowerCase()}`}
                  className="inline-block px-4 py-2 text-lg font-normal text-gray-800 no-underline rounded-md dark:text-gray-200 hover:text-indigo-500 focus:text-indigo-500 focus:bg-indigo-100 focus:outline-none dark:focus:bg-gray-800"
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="hidden mr-3 space-x-4 lg:flex nav__item">
          <LinkButton variant="primary" href={CTA_LINK}>
            {CALL_TO_ACTION}
          </LinkButton>
          <ThemeChanger />
        </div>
      </Container>
    </div>
  );
};

export default Navbar;

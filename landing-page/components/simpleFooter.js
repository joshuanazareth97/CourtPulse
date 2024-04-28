// simple footer
import React from "react";

const SimpleFooter = () => {
  return (
    <footer className="flex flex-col items-center justify-center w-full h-24 border-t">
      <p className="text-sm text-center text-gray-500 dark:text-gray-400">
        &copy; {new Date().getFullYear()}
      </p>
      <p className="text-gray-500 dark:text-gray-400">
        Made with ❤️ by{" "}
        <a
          href="https://joshuanaz.dev"
          className="text-midnight-500 hover:underline"
        >
          Joshua
        </a>
      </p>
    </footer>
  );
};

export default SimpleFooter;

import React from "react";
import { bots } from "../constants/bots";
import { CALL_TO_ACTION } from "../constants/contentStrings";
import Container from "./container";
import { Menu } from "./ui-components";

const Cta = () => {
  return (
    <Container>
      <div className="flex flex-wrap items-center justify-between w-full max-w-4xl gap-5 mx-auto text-white bg-gray-400 px-7 py-7 lg:px-12 lg:py-12 lg:flex-nowrap rounded-xl">
        <div className="flex-grow text-center lg:text-left">
          <h2 className="text-2xl font-medium lg:text-3xl">
            Ready to Enhance Your Legal Practice?
          </h2>
          <p className="mt-2 font-medium text-white text-opacity-90 lg:text-xl">
            Join several other legal professionals who trust CourtPulse to keep
            them informed.
          </p>
        </div>
        <div className="flex-shrink-0 w-full text-center lg:w-auto">
          <Menu buttonLabel={CALL_TO_ACTION} itemList={bots} />
        </div>
      </div>
    </Container>
  );
};

export default Cta;

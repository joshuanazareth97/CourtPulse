import React from "react";
import Container from "./container";
import { CALL_TO_ACTION, CTA_LINK } from "../constants/contentStrings";
import { LinkButton } from "./ui-components";

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
          <LinkButton variant="primary" href={CTA_LINK}>
            {CALL_TO_ACTION}
          </LinkButton>
        </div>
      </div>
    </Container>
  );
};

export default Cta;

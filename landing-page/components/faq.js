import React from "react";
import Container from "./container";
import { SeeMore } from "./ui-components";

const Faq = () => {
  return (
    <Container className="!p-0">
      <div className="w-full max-w-2xl p-2 mx-auto rounded-2xl">
        {faqdata.map((item, index) => (
          <div key={item.question} className="mb-5">
            <SeeMore header={item.question}>{item.answer}</SeeMore>
          </div>
        ))}
      </div>
    </Container>
  );
};

const faqdata = [
  {
    question: "What courts does CourtPulse currently support?",
    answer:
      "CourtPulse currently offers automated case tracking for the Delhi High Court and the Supreme Court of India. We are continuously working to expand our services to include more courts across India.",
  },
  {
    question: "How do I receive notifications about my cases?",
    answer:
      "After initially messaging the bot for any court, you can then send messages asking it to track a case on any given day. CourtPulse will send real-time notifications directly to your Telegram. These notifications will alert you whenever your cases are listed for hearing.",
  },
  {
    question:
      "Is there a limit to the number of cases I can track with CourtPulse?",
    answer:
      "No, CourtPulse allows you to track an unlimited number of cases across multiple courts. Our platform is designed to handle the needs of legal professionals managing numerous cases simultaneously.",
  },
  {
    question: "How secure is my data with CourtPulse?",
    answer:
      "At CourtPulse, we prioritize the security of your data. Our platform uses Telegram's advanced E2E encryption standards to ensure that all your case details and personal information are securely stored and transmitted.",
  },
  {
    question: "How can I sign up for CourtPulse?",
    answer:
      "Signing up for CourtPulse is easy! Just visit our website, click on the 'Get Started' button. Choose the bot for the court you want to monitor. This will take you to a Telegram chat window with our bot. Message the bot and follow the instructions that the bot messages you back.",
  },
];

export default Faq;

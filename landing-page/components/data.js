import {
  ArrowTrendingDownIcon,
  BellAlertIcon,
  BoltIcon,
  ChatBubbleLeftRightIcon,
  ClockIcon,
  InformationCircleIcon,
} from "@heroicons/react/24/solid";

import featureImage from "../public/img/features.png";
import benefitsImage from "../public/img/benefits.png";

const benefitOne = {
  title: "What does it do?",
  desc: "Enhance your practice with CourtPulse's user-friendly interface and real-time updates.",
  image: featureImage,
  bullets: [
    {
      title: "Automated Case Tracking",
      desc: "Automate your case monitoring with our specialized bots for each court. Set it once, and never miss that case listing.",
      icon: <BoltIcon />,
    },
    {
      title: "Instant Notifications",
      desc: "Receive real-time alerts the moment your case status changes or gets listed, directly on your mobile device.",
      icon: <BellAlertIcon />,
    },
    {
      title: "Court-specific Bots",
      desc: "Each court has its own dedicated bot, currently supporting the Delhi High Court and Supreme Court of India, tailored for specific needs and updates. More courts coming soon!",
      icon: <ChatBubbleLeftRightIcon />,
    },
  ],
};

const benefitTwo = {
  title: "How does it help?",
  desc: "Maximize efficiency with CourtPulse. Spend less time on manual tracking and more on what matters.",
  image: benefitsImage,
  bullets: [
    {
      title: "Save Time",
      desc: "Automatic updates mean you spend less time tracking cases manually, giving you more time to allocate to other pressing tasks.",
      icon: <ClockIcon />,
    },
    {
      title: "Reduce Stress",
      desc: "Keep your focus on case preparation and client interaction without the constant concern of missing important updates.",
      icon: <ArrowTrendingDownIcon />,
    },
    {
      title: "Stay Informed",
      desc: "With real-time notifications, you’ll always be in the loop on the status of your cases.",
      icon: <InformationCircleIcon />,
    },
  ],
};

export { benefitOne, benefitTwo };

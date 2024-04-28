import supremeCourtImage from "../public/img/court-logos/supreme-court.png";
import delhiHighCourtImage from "../public/img/court-logos/delhi-hc.png";
import { MenuItem } from "../components/ui-components/menu";

export const bots: MenuItem[] = [
  {
    label: "Supreme Court",
    href: "https://t.me/CourtNotifierBot?start=hello",
    image: supremeCourtImage,
  },
  {
    label: "Delhi High Court",
    href: "https://t.me/court_pulse_dhc_bot?start=hello",
    image: delhiHighCourtImage,
  },
];

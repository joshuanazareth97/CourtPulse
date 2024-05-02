import re
from app.core import BaseBot


class SupremeCourtBot(BaseBot):
    def __init__(self):
        super().__init__("Supreme Court")

    def validate_input(self, court_no, case_nos):
        if not court_no or not (court_no.startswith("C") or court_no.startswith("RC")):
            return False, "Please provide a valid Court Number."
        all_cases_valid = all(bool(re.search("\d+", case)) for case in case_nos)
        if not all_cases_valid:
            return (
                False,
                "Please provide a valid, comma-separated list of Case Numbers.",
            )
        return True, ""

    def process_data(self, data):
        court_list = data["listedItemDetails"]

        case_list = []

        for court in court_list:
            status = court.get("item_status", "")
            if status != "HEARING":
                continue
            name = court.get("court_name", "")
            case_no = court.get("item_no", "")
            respondent_name = court.get("respondent_name", "")
            petitioner_name = court.get("petitioner_name", "")
            reg_no = court.get("registration_number_display", "")
            case_list.append(
                {
                    "status": status,
                    "court_name": name,
                    "respondent_name": respondent_name,
                    "petitioner_name": petitioner_name,
                    "case_no": case_no,
                    "reg_no": reg_no,
                }
            )

        return case_list

    def get_message_prefix(self, case) -> str:
        reg_no = case.get("reg_no", "")
        petitioner_name = case.get("petitioner_name", "")
        respondent_name = case.get("respondent_name", "")
        if reg_no and petitioner_name and respondent_name:
            return f"{reg_no} ({petitioner_name} v. {respondent_name})"
        return ""

    def format_message(self, case_no: str, court_no: str, case):
        message = f"Case No. {case_no} : Now listed in Court {court_no}"
        prefix = self.get_message_prefix(case)
        if prefix:
            message = f"{prefix}\n{message}"
        return message

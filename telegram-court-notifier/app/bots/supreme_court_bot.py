import re
from core import BaseBot


class SupremeCourtBot(BaseBot):
    def __init__(self):
        super().__init__(self)

    def validate_input(self, court_no, case_nos):
        if not court_no or not (court_no.startswith("C") or court_no.startswith("RC")):
            return False, "Please provide a valid Court Number."
        if not all(re.search("/d+", case) for case in case_nos):
          return False,  "Please provide a valid, comma-separated list of Case Numbers."
        return True, ""

    def process_data(self, data):
        return super().process_data(data)
    
    def format_message(self, case):
        return super().format_message(case)
import re
from app.core import BaseBot
from requests.models import Response
from bs4 import BeautifulSoup


DHC_API = "https://delhihighcourt.nic.in/display_board"


class DelhiHighCourtBot(BaseBot):
    def __init__(self):
        super().__init__("Delhi High Court", DHC_API)

    def validate_input(self, court_no, case_nos):
        if not court_no or not re.search("^\d+$", court_no):
            return False, "Please provide a valid Court Number."
        all_cases_valid = all(
            bool(re.search("^[A-Za-z]\d+$", case)) for case in case_nos
        )
        if not all_cases_valid:
            return (
                False,
                "Please provide a valid list of Case Numbers.",
            )
        return True, ""

    def process_data(self, response: Response):
        html = response.text
        soup = BeautifulSoup(html, "html.parser")
        table = soup.find(
            "table", class_="table table-bordered table-hover table-striped"
        )
        data_list = []
        # skip the first row as it contains headers
        rows = table.find_all("tr")[1:]

        for row in rows:
            row_data = {}
            cells = row.find_all("td")
            in_session = True
            for cell in cells:
                # is this a court cell, or a case cell?
                if cell_data := cell.find("a"):
                    cell_text = cell_data.text.strip()
                    row_data["court_name"] = cell_text
                    row_data["url"] = cell_data["href"]
                else:
                    cell_data = cell.text.strip()
                    if cell_data == "Not in Session":
                        in_session = False
                        continue
                    row_data["case_no"] = cell_data.split(" ")[0]
            if in_session:
                data_list.append(row_data)

        return data_list

    def format_message(self, case_no: str, court_no: str, case):
        message = f"Case No. {case_no} : Now listed in Court {court_no}"
        message = f"{message}\n{case['url']}"
        return message

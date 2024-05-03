def print_dict_as_table(data: dict) -> None:
    """Print a dictionary as a table."""
    print("{:<8} {:<15} {:<10}".format("#", "Config", "Value"))
    idx = 0
    for k, v in data.items():
        if not k.startswith("__"):
            idx += 1
            print(f"{idx:<8} {k:<20} {v.__str__():<10}")

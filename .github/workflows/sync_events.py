import csv
import io
import os
import sys
import urllib.request

import yaml

SHEET_URL = os.environ.get("EVENTS_SHEET_URL", "")
OUTPUT = "data/events.yaml"
REQUIRED_COLS = {"title", "date", "time", "location", "type", "description", "signup_url"}


def fetch_csv(url):
    with urllib.request.urlopen(url, timeout=15) as resp:
        return resp.read().decode("utf-8")


def parse(raw):
    reader = csv.DictReader(io.StringIO(raw))
    missing = REQUIRED_COLS - set(reader.fieldnames or [])
    if missing:
        print(f"ERROR: Sheet is missing columns: {missing}", file=sys.stderr)
        sys.exit(1)
    events = []
    for row in reader:
        title = row["title"].strip()
        date = row["date"].strip()
        if not title or not date:
            continue
        events.append({
            "title": title,
            "date": date,
            "time": row["time"].strip(),
            "location": row["location"].strip(),
            "type": row["type"].strip() or "public",
            "description": row["description"].strip(),
            "signup_url": row["signup_url"].strip(),
        })
    return events


def main():
    if not SHEET_URL:
        print("ERROR: EVENTS_SHEET_URL variable is not set.", file=sys.stderr)
        sys.exit(1)
    raw = fetch_csv(SHEET_URL)
    events = parse(raw)
    with open(OUTPUT, "w", encoding="utf-8") as f:
        yaml.dump(events, f, allow_unicode=True, default_flow_style=False, sort_keys=False)
    print(f"Written {len(events)} events to {OUTPUT}.")


if __name__ == "__main__":
    main()

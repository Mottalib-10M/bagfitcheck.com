#!/usr/bin/env python3
"""Monthly re-reading of the airline and agency pages (RECETTE §12.1, §17.4).

For every figure of src/data/airlines.json and src/data/params-2026.json, src/data/checks.json keeps the
page it was read on and a short verbatim sentence that contains it. This script opens each page again
(browser User-Agent), and reports every sentence that is no longer on the page. It never edits the data
files: a person reads the change on the airline's page, then edits the record and its reading date.

    python3 scripts/update-data.py            # report
    python3 scripts/update-data.py --write    # also writes data/official-latest.json (dated trace)

Exit code 2 when a readable page no longer contains its sentence; pages that refuse automated reading
(HTTP 403/406, timeouts) are listed as "unreadable", not as changed.
"""
import json, os, re, sys, html, urllib.request, datetime

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
UA = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0 Safari/537.36'

def norm(s: str) -> str:
    s = html.unescape(re.sub(r'<[^>]+>', ' ', s))
    s = s.replace(' ', ' ').replace('’', "'").replace('“', '"').replace('”', '"').replace('–', '-').replace('—', '-')
    return re.sub(r'\s+', ' ', s).strip().lower()

def fetch(url: str):
    try:
        req = urllib.request.Request(url, headers={'User-Agent': UA, 'Accept-Language': 'en-US,en;q=0.9'})
        with urllib.request.urlopen(req, timeout=30) as r:
            return r.read().decode('utf-8', 'replace')
    except Exception as e:  # noqa: BLE001
        return None

def main():
    checks = json.load(open(os.path.join(ROOT, 'src/data/checks.json')))
    pages, changed, unreadable, ok = {}, [], [], 0
    for c in checks['checks']:
        url = c['url']
        if url not in pages:
            pages[url] = fetch(url)
        txt = pages[url]
        if txt is None:
            unreadable.append(c); continue
        if norm(c['quote']) in norm(txt):
            ok += 1
        else:
            changed.append(c)
    print(f'{ok} sentence(s) still on their page · {len(changed)} changed or moved · {len(unreadable)} on unreadable pages')
    for c in changed:
        print(f"  CHANGED  {c['id']}: {c['url']}\n           expected: {c['quote'][:140]}")
    for c in unreadable:
        print(f"  UNREADABLE {c['id']}: {c['url']}")
    if '--write' in sys.argv:
        os.makedirs(os.path.join(ROOT, 'data'), exist_ok=True)
        json.dump({'run': datetime.date.today().isoformat(), 'ok': ok, 'changed': [c['id'] for c in changed], 'unreadable': [c['id'] for c in unreadable]},
                  open(os.path.join(ROOT, 'data/official-latest.json'), 'w'), indent=1)
    sys.exit(2 if changed else 0)

if __name__ == '__main__':
    main()

import json, sys, datetime
raw = json.load(open(sys.argv[1] if len(sys.argv) > 1 else 'raw.json', encoding='utf-8'))
G = [
 ("student", "Student Lehramt", "Studierend", 20, 28),
 ("anw_gs", "Lehramtsanwärter Grundschule", "Beamter auf Widerruf · A12", 23, 38),
 ("anw", "Lehramtsanwärter", "Beamter auf Widerruf · A13 (Gymnasium)", 23, 38),
 ("bs", "Berufsschullehrer", "Beamter auf Probe · A13", 26, 45),
 ("hs", "Hauptschullehrer", "Beamter auf Probe · A12", 26, 45),
 ("gym", "Gymnasiallehrer", "Beamter auf Probe · A13", 26, 45),
 ("gs", "Grundschullehrer", "Beamter auf Probe · A12", 26, 45),
]
num = lambda s: None if s is None else float(s.replace('.', '').replace(',', '.'))
def pick(res, keys):
    return [num(res.get(k)) for k in keys]
DU = ["BU PROTECT NR", "ALVSDV Allg. DU NR", "WorkLife EXKLUSIV-PLUS DU"]
TEIL = ["BU PROTECT Teil DU NR", "ALVSDV Allg. Teil-DU NR", "WorkLife EXKLUSIV-PLUS Teil-DU"]
out = {"stand": datetime.date.today().strftime("%d.%m.%Y"),
       "rahmen": "1.500 € Rente, Laufzeit bis 67, Nichtraucher, ohne Dynamik, Bürotätigkeit 0–24 %",
       "groups": []}
for gid, name, sub, lo, hi in G:
    ages = {}
    for a in range(lo, hi + 1):
        r = (raw.get(gid, {}).get(str(a)) or {}).get("res")
        if r:
            ages[str(a)] = {"du": pick(r, DU), "teil": pick(r, TEIL)}
    out["groups"].append({"id": gid, "name": name, "sub": sub, "min": lo, "max": hi, "ages": ages})
json.dump(out, open('data.json', 'w', encoding='utf-8'), ensure_ascii=False)
print({g["id"]: len(g["ages"]) for g in out["groups"]})

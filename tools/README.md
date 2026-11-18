# Monatliche Aktualisierung
1. Check24-BU-Ergebnisseite im Browser öffnen (siehe groups.json), tools/collect.js ausführen, `window.__G` = groups.json setzen, `window.__chain2()` starten.
   Nur sequentiell mit Pausen (kein paralleles Laden). Ein Alter dauert ca. 40-100 s, gesamt ca. 2-3 Stunden.
2. Pro Gruppe als kompakter String je Alter exportieren: "BU PROTECT DU|ALVSDV DU|WorkLife DU|BU PROTECT Teil|ALVSDV Teil|WorkLife Teil" (leer = nicht gelistet).
3. raw.json bauen ({gruppe:{alter:{cnt,res:{Tarifname:"xx,xx"}}}}) und `python3 tools/build_data.py raw.json` -> data.json im Repo-Stamm.
4. Committen und nach main pushen; Netlify veröffentlicht automatisch.

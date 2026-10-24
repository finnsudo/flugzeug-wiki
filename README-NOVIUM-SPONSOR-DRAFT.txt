# Flugzeug-Wiki – Novium-Sponsor-Entwurf

Diese ZIP ist ein **lokaler Entwurf**. Sie wurde nicht auf GitHub oder Novium veröffentlicht. Erst nach bestätigter Partnerschaft veröffentlichen.

## Enthaltene Änderungen
- Footer-Link „Sponsored by Novium“ zur https://suite.novium.world
- Sponsor-Fenster mit Discord- und Website-Link
- `auth.js` ruft das Sponsor-Fenster nach erkanntem erfolgreichem Login auf
- Das Sponsor-Fenster wird höchstens einmal pro Browser-Session angezeigt

## Dateien
Die vorhandenen Website-Dateien wurden beibehalten. `auth.js` wurde aus der zusätzlich gelieferten Datei übernommen und an der Stelle `renderUser()` um den Aufruf des Sponsor-Fensters ergänzt.

## Vor der Veröffentlichung prüfen
1. Sponsoring-Bestätigung abwarten.
2. Website lokal bzw. in einer Testumgebung prüfen: Login per E-Mail, Discord/Twitch (falls aktiviert), Logout und erneutes Login.
3. Sicherstellen, dass Novium die Sponsor-Nennung und Logos/Links freigegeben hat.
4. Erst dann die Dateien auf das neue Hosting übertragen.

Der Sponsor-Link und das Fenster sind nur in diesem ZIP-Entwurf enthalten. Es wurden keine Änderungen veröffentlicht.

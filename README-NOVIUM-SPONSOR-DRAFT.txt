# Flugzeug-Wiki – Novium-Sponsor-Entwurf

Diese ZIP ist ein **lokaler Entwurf**. Sie wurde nicht auf GitHub oder Novium veröffentlicht. Erst nach bestätigter Partnerschaft veröffentlichen.

## Enthaltene Änderungen
- Footer-Link „Sponsored by Novium“ zur https://suite.novium.world
- Sponsor-Fenster mit Discord- und Website-Link
- Login-Popup für normale Nutzer, nicht für Konten mit Team-Panel-Berechtigung
- Im privaten Team-Panel: „Werbung senden“, Sponsor „Novium“ auswählen und die Einblendung an aktuell verbundene Website-Besucher senden
- Team-Mitglieder/Admins werden bei der ausgesendeten Werbung ausgeschlossen
- Das Fenster kann frühestens 5 Sekunden nach dem Öffnen geschlossen werden; das gilt auch für Escape und Klick auf den Hintergrund
- Die öffentliche Fußnote „Sponsor-Hinweis vorbereitet …“ wurde entfernt

## Technischer Hinweis
Die Live-Ausspielung nutzt Supabase Realtime Broadcast. Besucher müssen die Website geöffnet haben und mit Realtime verbunden sein, um die ausgesendete Werbung zu erhalten. Offline-Besucher bekommen keine nachträgliche Einblendung. Die Realtime-Funktion muss im veröffentlichten Supabase-Projekt funktionieren. Der Broadcast wurde hier nicht live mit mehreren Browsern getestet.

## Vor der Veröffentlichung prüfen
1. Sponsoring-Bestätigung abwarten.
2. In einer Testumgebung mit mehreren Browsern prüfen: normaler Besucher, angemeldeter Nutzer und Admin/Team-Mitglied.
3. Login, Logout und die 5-Sekunden-Sperre des Schließen-Buttons testen.
4. Erst nach Freigabe die Dateien auf das Hosting übertragen.

Es wurden keine Änderungen veröffentlicht.

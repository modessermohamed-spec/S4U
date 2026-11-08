# S4U – Roadmap Schritt für Schritt

Legende: ✅ erledigt · 🔄 in Arbeit · ⬜ offen
**Wer:** 👤 = Gründer · 🤖 = Claude · 🇸🇩 = Team im Sudan · ⚖️ = Rechtsberatung

Stand: November 2026 · Alles läuft im **Demo-Modus**, bis Phase 4 abgeschlossen ist.

---

## Phase 1 – Grundlage und Registrierung (Demo)
| # | Schritt | Wer | Status |
|---|---|---|---|
| 1.1 | Repository analysieren, Fehler finden (leere CSS, v2 nicht eingespielt) | 🤖 | ✅ |
| 1.2 | Design wiederherstellen, Code aufräumen und in Bausteine aufteilen | 🤖 | ✅ |
| 1.3 | Kundenregistrierung (Demo) | 🤖 | ✅ |
| 1.4 | Handwerkerregistrierung in 4 Schritten (Demo) | 🤖 | ✅ |
| 1.5 | Login und „Passwort vergessen“ (Demo) | 🤖 | ✅ |
| 1.6 | Profilseite pro Handwerker | 🤖 | ✅ |
| 1.7 | Preise in SDG / ج.س | 🤖 | ✅ |
| 1.8 | Pull Request #1 prüfen (Vercel-Vorschau) und mergen | 👤 | ⬜ |
| 1.9 | Startgebiet festlegen (z. B. eine Stadt) | 👤 | ⬜ |
| 1.10 | Entscheiden: Seite für Google sperren, bis echte Profile da sind? (aktuell gesperrt) | 👤 | ⬜ |

## Phase 2 – Profile und Dashboards (Demo)
| # | Schritt | Wer | Status |
|---|---|---|---|
| 2.1 | Kunden-Dashboard: meine Anfragen, Angebote, Profil | 🤖 | ⬜ |
| 2.2 | Handwerker-Dashboard: Anfragen, Angebote erstellen, Aufträge, Profil bearbeiten | 🤖 | ⬜ |
| 2.3 | Dienstleistungen anlegen, bearbeiten, löschen | 🤖 | ⬜ |
| 2.4 | Profilfoto und Arbeitsproben verwalten (Bilder für langsames Internet verkleinern) | 🤖 | ⬜ |
| 2.5 | Anfrage → Angebot → Annahme als Ablauf (noch ohne Zahlung) | 🤖 | ⬜ |
| 2.6 | Arabische Texte von einem Muttersprachler im Sudan prüfen lassen | 🇸🇩 | ⬜ |

## Phase 3 – Verwaltung und Vertrauen (Demo)
| # | Schritt | Wer | Status |
|---|---|---|---|
| 3.1 | Admin-Dashboard mit Kennzahlen (klar markierte Demodaten) | 🤖 | ⬜ |
| 3.2 | Rollen: Admin, Operations Manager (eingeschränkt), Kunde, Handwerker | 🤖 | ⬜ |
| 3.3 | Verifizierungsablauf mit den 6 Status, nur durch Admin/Ops änderbar | 🤖 | ⬜ |
| 3.4 | Auftragsstatus (angefragt → angeboten → angenommen → erledigt → bewertet) | 🤖 | ⬜ |
| 3.5 | Beschwerdemanagement | 🤖 | ⬜ |
| 3.6 | Bewertungen nur nach abgeschlossenem Auftrag | 🤖 | ⬜ |
| 3.7 | Aktivitätsprotokoll (wer hat was geändert) und Export als CSV/Excel | 🤖 | ⬜ |

## Phase 4 – Echter Betrieb mit Supabase
| # | Schritt | Wer | Status |
|---|---|---|---|
| 4.1 | Supabase-Konto anlegen (kostenloser Plan), Projekt in Region EU erstellen | 👤 | ⬜ |
| 4.2 | URL und öffentlichen Schlüssel in Vercel eintragen (Anleitung von Claude) | 👤 | ⬜ |
| 4.3 | Datenbank-Tabellen und Zugriffsregeln (Row Level Security) | 🤖 | ⬜ |
| 4.4 | Echte Registrierung mit E-Mail-Bestätigung und Passwort-Reset | 🤖 | ⬜ |
| 4.5 | Uploads (Fotos) mit Größen- und Typprüfung | 🤖 | ⬜ |
| 4.6 | Sicherheitsprüfung vor dem Livegang | 🤖 | ⬜ |
| 4.7 | Datenschutzerklärung, AGB, Handwerkerbedingungen (Entwürfe von Claude, Freigabe durch Anwalt) | 🤖 ⚖️ | ⬜ |
| 4.8 | Betreiber und Firmenregistrierung klären (Sudan / Österreich), Steuern | 👤 ⚖️ | ⬜ |
| 4.9 | Demo-Kennzeichnung entfernen, erste echte Handwerker in der Startstadt | 👤 🇸🇩 | ⬜ |

## Phase 5 – Identität, Zahlungen, Wachstum
| # | Schritt | Wer | Status |
|---|---|---|---|
| 5.1 | SUDAPASS: offizielle Anfrage, Dokumentation, Genehmigung | 👤 | ⬜ |
| 5.2 | SUDAPASS technisch anbinden (erst nach Freigabe) | 🤖 | ⬜ |
| 5.3 | Übergangslösung Identität: manuelle Prüfung durch Ops-Team (rechtlich klären) | 👤 🇸🇩 ⚖️ | ⬜ |
| 5.4 | Bankak: Geschäftskonto / Merchant-Zugang klären (kein privates Familienkonto) | 👤 ⚖️ | ⬜ |
| 5.5 | Zahlungsabgleich im Admin-Dashboard (keine Bestätigung nur per Screenshot) | 🤖 | ⬜ |
| 5.6 | Benachrichtigungen (E-Mail, später WhatsApp/SMS) | 🤖 | ⬜ |
| 5.7 | Registrierung per Telefonnummer | 🤖 | ⬜ |
| 5.8 | Wöchentlicher Kennzahlen-Bericht automatisch per E-Mail | 🤖 | ⬜ |
| 5.9 | S4U Protected: Ablauf, Personal, Versicherung, Haftung klären | 👤 🇸🇩 ⚖️ | ⬜ |

## Marketing und Betrieb (parallel ab Phase 2)
| # | Schritt | Wer | Status |
|---|---|---|---|
| M.1 | Flyer auf Arabisch mit QR-Code (Entwurf von Claude) | 🤖 👤 | ⬜ |
| M.2 | WhatsApp-Business-Konto und Standardtexte | 👤 🇸🇩 | ⬜ |
| M.3 | Erste 10–20 Handwerker persönlich anwerben (nach Phase 4) | 🇸🇩 | ⬜ |
| M.4 | Einfache Arbeitsanleitung für das Team im Sudan | 🤖 | ⬜ |
| M.5 | Social-Media-Profile anlegen | 👤 🇸🇩 | ⬜ |

---

## Die nächsten 3 Schritte
1. 👤 **PR #1 mergen**, dann ist die Live-Seite wieder mit Design und den neuen Seiten online.
2. 👤 **Startstadt nennen.**
3. 🤖 **Phase 2 beginnen:** Dashboards für Kunden und Handwerker.

**Wichtig:** Supabase (Phase 4) kann jederzeit vorgezogen werden. Es kostet anfangs nichts und dauert für Sie etwa 15 Minuten.

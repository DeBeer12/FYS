## ST_001 - Gebruiker inloggen
**Test Case ID:** ST_001  
**Test Case Titel:** Gebruiker inloggen  
**Test Prioriteit (Hoog/Gemiddeld/Laag):** Hoog  
**Gerelateerde requirements:** EIS-18
**Pre-condities:** De testdatabase moet gevult zijn met testgegevens

### Main Scenario
| Stap | Omschrijving | Invoer |  Verwacht resultaat |
|-|-|-|-|
| 1 | ga naar de website van de testomgeving met een ondersteunde webbrowser naar keuze  | - | Website toont een pagina met daarop een formulier met velden voor "gebruikersnaam" en "wachtwoord", en een knop "inloggen".
| 2 | Vul het formulier in en druk op de "inloggen"-knop | Gebruikersnaam = test123, Wachtwoord = test123 | Website toont de profielpagina van de gebruiker en is ingelogd als "Meneer de Tester". |

### Extensie Scenario - 2A - Verkeerde gegevens invullen
| Branch Stap | Omschrijving | Invoer |  Verwacht resultaat |
|-|-|-|-|
| 2A.1 | Vul geen gegevens in en druk op de "inloggen"-knop" | - | Website toont een foutmelding "Gebruikersnaam en wachtwoord zijn verplichte velden". |
| 2A.2 | Vul enkel "gebruikersnaam" in en druk op de "inloggen"-knop" | testgebruiker | Website toont een foutmelding "Wachtwoord is een verplicht veld". |
| 2A.3 | Vul enkel "wachtwoord" in en druk op de "inloggen"-knop" | test | Website toont een foutmelding "Gebruikersnaam is een verplicht veld".  |
| 2A.4 | Vul het formulier in en druk op de "inloggen"-knop" | Gebruikersnaam = testgebruiker, Wachtwoord = test | Website toont een foutmelding "Gebruikersnaam en/of wachtwoord zijn ongeldig".  |

Ga verder met stap 2
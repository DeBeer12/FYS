## ST_003 - Gebruiker matchen
**Test Case ID:** ST_003  
**Test Case Titel:** Gebruiker matchen  
**Test Prioriteit (Hoog/Gemiddeld/Laag):** Laag  
**Gerelateerde requirements:** None  
**Pre-condities:** Gebruiker moet ingelogd zijn

### Main Scenario
| Stap | Omschrijving | Invoer |  Verwacht resultaat |  
|-|-|-|-|-|  
| 1 | Klik op de "matchen"-knop bij een willekeurige gebruiker  | - |  Website toont een alert box met die opties "Oke" & "Annuleren".  
| 2 | Druk op de "Oke"-knop | - | Website geeft een melding dat de gebruiker succesvol is gematched. de gebruiker wordt ook niet meer getoond op de hoofdpagina.  
| 3 | Druk op de "Mijn matches"-knop | - | Website toont een pagina met personen matches.  
| 4 | Zoek de persoon die bij stap 1 gematched is | - | Voer de "Gebruikersnaam" van de gebruiker bij #1A in | - | Gebruiker wordt getoond als match.  

### Extensie Scenario - 2A - Gebruiker niet matchen
| Branch Stap | Omschrijving | Invoer |  Verwacht resultaat |  
|-|-|-|-|-|  
| 2A.1 | Druk op de "Annuleren"-knop | - | Website toont de hoofdpagina met dezelfde gebruikers.  

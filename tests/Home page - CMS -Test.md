## ST_004 - Text bewerken
**Test Case ID:** ST_004  
**Test Case Titel:** Text bewerken  
**Test Prioriteit (Hoog/Gemiddeld/Laag):** Laag  
**Gerelateerde requirements:** None  
**Pre-condities:** Gebruiker moet ingelogd zijn

### Main Scenario
| Stap | Omschrijving | Invoer |  Verwacht resultaat |  
|-|-|-|-|  
| 1 | Navigeer naar de home pagina  | - |  Website geeft de homepagina weer.  
| 2 | Klik op het bewerken icoon rechts boven de text | - | Text wordt vervangen door input velden en een opslaan en annuleren knop.  
| 3 | Vul het formulier/input veld in en druk op de knop opslaan | - | Website geeft de zojuist ingevoerde gegevens weer in het text veld.

### Extensie Scenario - 3A - Text bewerken zonder gegevens
| Branch Stap | Omschrijving | Invoer |  Verwacht resultaat |  
|-|-|-|-|
| 3A.1 | Vul geen gegevens in de druk op de knop opslaan | - | Website toont de voorgaande waarde.
| 3A.2 | Vul alleen de titel in | - | Titel wordt vervangen door de input van gebruiker, inleiding behoud de voorgaande waarde.
| 3A.3 | Val alleen de inleiding in | - | Titel behoud de voorgaande waarde de inleiding wordt vervangen door de input van gebruiker.


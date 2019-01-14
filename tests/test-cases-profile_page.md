## ST_001 - Gebruiker inloggen
**Test Case ID:** 1  
**Test Case Titel:** Gegevens aanpassen van profiel
**Test Prioriteit (Hoog/Gemiddeld/Laag):** Hoog  
**Gerelateerde requirements:**  
**Pre-condities:** Gebruiker is ingelogd en op de profiel pagina

### Main Scenario
| Stap | Omschrijving | Invoer |  Verwacht resultaat |
|-|-|-|-|-|
| 1 | Gebruiker wilt persoonlijke data aan passen | Klikt op het icoon om aan te passen | | De tekst velden veranderen naar input |
| 2 | Gebruiker past een veld aan | past 1 van de velden aan met de nieuw gewilde informatie | | -- |
| 3 | Gebruiker slaat de nieuwe data op | Klikt op het icoon om op te slaan | | Pagina herlaad en de nieuwe data staat op het profiel van de gebruiker |


### Extensie Scenario - 2A - Verkeerde gegevens invullen
| Branch Stap | Omschrijving | Invoer |  Verwacht resultaat |
|-|-|-|-|-|
| 2A.1 | Gebruiker wilt data aanpassen maar vergeet een veld | gebruiker vult 1 veld niet in | | -- |
| 2A.2 | Gebruiker wilt nieuwe data opslaan | Klikt op het icoon om op te slaan | | Er komt een foutmelding |


## 2: profiel foto aanpassen
**Test Case ID:** 2  
**Test Case Titel:** profiel foto aanpassen 
**Test Prioriteit (Hoog/Gemiddeld/Laag):** gemiddeld  
**Gerelateerde requirements:**   
**Pre-condities:** gebruiker is ingelogd en op de profiel pagina

### Main Scenario
| Stap | Omschrijving | Invoer |  Verwacht resultaat |
|-|-|-|-|-|
| 1 | Gebruiker wilt zijn profielfoto aanpassen | - | Klikt op het icoon om een foto te kiezen |
| 2 | Gebruiker kiest een foto van zijn pc | - | kiest een juiste foto |
| 3 | Gebruiker upload de foto door op het icoon te klikken | - | profiel fot is veranderd | 

### Extensie Scenario - 2.1 - kiest geen nieuwe profiel foto
| Branch Stap | Omschrijving | Invoer |  Verwacht resultaat |
|-|-|-|-|-|
| 2.1 | gebruiker kiest geen foto | - | er word geen foto gekozen| - | komt een melding dat er eerst een foto moet worden gekozen voor het uploaden |

### Extensie Scenario - 3.1 - vekeerde bestandstype
| Branch Stap | Omschrijving | Invoer |  Verwacht resultaat |
|-|-|-|-|-|
| 3.1 | gebruiker kiest een foto dat niet het goede formaat is | - | er word een foto gekozen met het vekeerde formaat | - | komt een melding dat het niet het juiste bestandstype is |
# Testresultaten voor [Corendon Matching]
**Team**: IS106_1 / Codacity
**Versie**: 1  
**Datum**: 14-01-2019  

**Teamleden**:
- [500801975], [Fels, Mike]
- [500801418], [Jesse van Bree]
- [Studentnummer], [Naam]
- [Studentnummer], [Naam]
- [500800871], [Winkelaar, Richard]

# Inleiding
[Het doel van dit document is het vaststellen van de systeem test resultaten, De website is een connectie middel tussen alleen staande ouderen die graag op vakantie willen met een metgezel.]

# Samenvatting
Onderstaande tabel geeft een samenvatting van de resultaten van alle tests die hebben plaatsgevonden.

| Datum | Test | Uitgevoerd door | # Pass | # Fail |
|-|-|-|-|-|
| [14-01-2019] | [Gebruiker matchen] | [Fels, Mike] | 1 | 0 |
| [14-01-2019] | [Text bewerken] | [Fels, Mike] | 1 | 0 |
| [14-01-2019] | [Gebruiker inloggen] | [van Bree, Jesse] | 2 | 1 |
| [14-01-2019] | [Chatten met een match] | [van Bree, Jesse] | 2 | 0 |

# System Tests
Hieronder volgen de resultaten van een aantal iteraties van de System Tests.

## [14-01-2019]
**Uitgevoerd door:** [Mike]  
---
| Test Case ID | Test Case Titel / Extensie Titel | Pass / Fail |  Fail Stap | Fail Opmerking |  
|-|-|-|-|-|
| [ST_003] | [Gebruiker matchen] | Pass | ... | ... |  
| [ST_003_2A] | [Gebruiker niet matchen] | Pass | ... | ... |  
| [ST_004] | [Text bewerken] | Pass | ... | ... |  
| [ST_003_3A] | [Text bewerken zonder gegevens] | Pass | ... | ... |  

## [14-01-2019 12:00]
**Uitgevoerd door:** [van Bree, Jesse]
---
| Test Case ID | Test Case Titel / Extensie Titel | Pass / Fail |  Fail Stap | Fail Opmerking |
|-|-|-|-|-|
| [ST_001] | [Gebruiker inloggen] | Pass | ... | ... |
| [ST_001_2A] | [Verkeerde gegevens invullen] | Fail | 2A.4 | De node server crasht |
| [ST_002] | [Chatten met een match] | Pass | ... | ... |
| [ST_002_4A] | [Verkeerde gegevens invullen] | Pass | ... | ... |

## [14-01-2019 13:00]
**Uitgevoerd door:** [van Bree, Jesse]
---
| Test Case ID | Test Case Titel / Extensie Titel | Pass / Fail |  Fail Stap | Fail Opmerking |
|-|-|-|-|-|
| [ST_001_2A] | [Verkeerde gegevens invullen] | Pass | ... | ... |

##[14-01-2019 14.05]
**Uitgevoerd door:** [Winkelaar, Richard]
---
| Test Case ID | Test Case Titel / Extensie Titel | Pass / Fail |  Fail Stap | Fail Opmerking |
|:------------|:---------------------------------|:------------|:-----------|:---------------|
|[ST_005_1]|[Niks invullen]|Pass|...|...|
|[ST_005_2]|[Alle velden invullen]|Pass|...|...|
|[ST_005_2A]|[Laat een veld leeg]|Pass|...|...|
|[ST_005_2B]|[Laat alles meerdere velden leeg]|Pass|...|...|
|[ST_005_3]|[Naar login gaan]|Pass|...|...|
|[ST_006_1]|[Nav-bar Home knop indrukken]||Pass|...|...|
|[ST_006_2]|[Nav-bar Matches knop indrukken]|Pass|...|...|
|[ST_006_3]|[Nav-bar Profiel knop indrukken]|Pass|...|...|
|[ST_006_4]|[Nav-bar logout knop indrukken]|Pass|...|...|
|[ST_006_5]|[Naam filter]|Pass|...|...|
|[ST_006_6]|[Leeftijd filter]|Pass|...|...|
|[ST_006_7]|[Naam en leeftijd filter]|Pass|...|...|
|[ST_006_8]|[Reset filters]|Pass|...|...|

## [14-01-2019 14:30]
**Uitgevoerd door:** [Broersen, Bob]
---
| Test Case ID | Test Case Titel / Extensie Titel | Pass / Fail |  Fail Stap | Fail Opmerking |
|-|-|-|-|-|
| [ST_008] | [Gegevens aanpassen] | Pass | ... | ... |
| [ST_008_2A] | [Verkeerde gegevens invullen] | pass | ... | ... |
| [ST_009] | [profiel foto aanpassen] | Pass | ... | ... |
| [ST_009_2A] | [kiest geen nieuwe profiel foto] | Pass | ... | ... |
| [ST_009_3A] | [vekeerde bestandstype] | fail | 3.1 | upload het bestand gewoon |
##Test Case ID:
##Test Case Titel: Registratie
##Test Prioriteit(Hoog/Gemiddeld/Laag): Hoog
##Gerelateerde requirements:
##Pre-condities:

Main scenario
---
|Stap  |Omschrijving    |Invoer    |Verwachte Resultaten|
|:-----|:---------------|:---------|:-------------------|
|1.|  Niks invullen in het formulier| Niks|Pop up met lege velden lege velden|
|2.|  Alle velden in vullen| Voornaam, Achternaam, Gebuikersnaam, E-mail, Wachtwoord,Geboortedatum| Een nieuw account in de database, en een registratie e-mail|
|3.|  Naar login gaan| Klik op het linkje al een account log hier in| Ga naar login.html|
---
##Extensie scenario: Stap 2
Titel: Invul mogelijkheden
---

|Stap  |Omschriving     |Invoer    |Verwachte Resultaten|
|:-----|:---------------|:---------|-------------------:|
|2a.|Laat een veld leeg|Alle velden behalve 1|Pop up met het lege veld|
|2b.|Laat meerdere velden leeg| Teminste 1 veld|Pop up met lege velden|
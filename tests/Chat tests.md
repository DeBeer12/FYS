## ST_001 - Gebruiker inloggen
**Test Case ID:** ST_002  
**Test Case Titel:** Chatten met een match  
**Test Prioriteit (Hoog/Gemiddeld/Laag):** Gemiddeld  
**Gerelateerde requirements:** EIS-11  
**Pre-condities:** De testdatabase moet gevult zijn met testgegevens, er moet ingelogd zijn met de testgebruiker  

### Main Scenario
| Stap | Omschrijving | Invoer |  Verwacht resultaat |
|-|-|-|-|
| 1 | Klik op het kopje "Mijn Matches" in de navigatiebalk | - | De website toont een pagina met Naam, Leeftijd een Intresse filters en twee knoppen "Zoeken" en "Reset filters" en hieronder andere gebruikers waar de ingelogede gebruiker mee gematched is.
| 2 | De gebruiker vult bij het naamfilter de naam in van de gematchde testpersoon en klikt op zoeken | Naam = testMatch | Website toont alleen de match testMatch |
| 3 | De gebruiker klikt op het chaticoon in het vak van testMatch | - | De website verwijst naar de chat pagina waarin gechat kan worden met testMatch |
| 4 | De gebruiker vult onderin de pagina een bericht in | bericht = "Test bericht naar testMatch" | Rechts boven in het chat vak verschijnt de tekst in een groene blak met de gebruikersnaam Test123 erboven |
| 5 | Log uit met het account testgebruiker d.m.v. op de knop loguit te drukken in de navigatiebalk |-| er wordt doorverwijsd naar de loginpagina |
| 5 | Login met het account testMatch en ga naar de chat met testgebruiker |-| In de chat staat het bericht "Test bericht naar testMatch" met daarboven de naam van de testgebruiker |

### Extensie Scenario - 4A - Verkeerde gegevens invullen
| Branch Stap | Omschrijving | Invoer |  Verwacht resultaat |
|-|-|-|-|
| 4A.1 | Vul geen gegevens in en drukt op het chat icoon | - | Er wordt geen bericht verstuurd |
| 4A.2 | Vul meer dan 500 characters in  en drukt op het chat icoon | *Zie Bericht 4A.2 hieronder | Er verschijnt een melding dat het bericht te lang is |

Ga verder met stap 4


*Bericht 4A.2:
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut blandit condimentum arcu, vel volutpat orci tincidunt quis. Morbi varius et nibh at volutpat. Vivamus id luctus nulla. Sed ullamcorper, tellus eget egestas laoreet, quam est rhoncus tellus, sit amet condimentum nibh libero id est. Sed lobortis malesuada aliquam. Suspendisse semper id tortor in feugiat. Aliquam eu eros gravida, consectetur nunc at, ornare ante. Ut consequat lacus in velit venenatis viverra. Phasellus faucibus placerat nisl a egestas. Ut vehicula lorem quis felis feugiat porta. In hac habitasse platea dictumst. Etiam cursus porttitor lectus non dapibus. Nullam sollicitudin ex bibendum enim gravida, nec pulvinar ex volutpat. Donec nec nisi et ante feugiat fringilla. Sed condimentum ex in tortor bibendum rhoncus. Pellentesque dapibus erat ut est maximus imperdiet. Curabitur non quam rutrum, efficitur ligula ut, porta sem. Vivamus bibendum molestie dictum. Morbi blandit semper vehicula. Nam dignissim sem ac fringilla hendrerit. Aenean in viverra ligula. Nam placerat gravida metus, dignissim aliquam enim fringilla ut. Suspendisse tempus tincidunt mauris at tincidunt. Etiam interdum mauris ut sem finibus, non gravida orci placerat. Ut fermentum ut lectus non posuere. Sed venenatis metus sit amet nisl tincidunt tristique. Integer at pretium est. Mauris pretium ornare ex sed molestie. Sed molestie sapien a tempor eleifend. Curabitur pharetra mi ut tellus venenatis, id lobortis elit pellentesque. Mauris quis lorem ut velit condimentum tristique vel eget lacus. Ut sollicitudin ante non augue aliquet auctor. Suspendisse ac nibh bibendum, tincidunt ipsum in, tempus ligula. Nullam laoreet eleifend sapien ac dapibus.


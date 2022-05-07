# LUMI Gruppen Oppgave Internship

Av Carlos Reiakvam

### Om funksjonalitet i appen

Følgende funksjoner er implementert:

- Kjøring av mock-server med gitt json-fil ved hjelp av json-server.
- Asynkron fetching av data fra API (json-server) og visning av dette i tabell.
- Sortering ved trykking på headers i tabellen.
- Form med mulighet for å legge inn nye elever ved hjelp av POST request. 
 (Nettsiden må foreløpig refreshes manuelt for å vise endring).

Følgende mangler foreløpig:
- Tømming av tabell
- Sletting av enkelt element
- Popup ved klikking på elev
- Eventuelt bilde ved hver elev

### Installasjonsveiledning

1. Clone dette prosjektet fra Github. Fra en terminal kan det gjøres med med ```git clone https://github.com/carlosreiakvam-uit/api_testing.git```

2. Om Node ikke er installert på maskinen fra før; last ned og installer [Node](https://nodejs.org/en/download/)

3. Åpne terminal og skriv ```npm -v``` for å bekrefte installasjon av Node.

4. I terminal: cd inn i clonet prosjekt.

5. I terminal: Installer json-server med ```npm install -g json-server```.

6. I terminal: cd videre inn i mappen src -> json_serverfile. Der ligger filen output.json (som er noe modifisert for å kunne fungere med json-server).

7. I terminal: kjør ```json-server –watch output.json``` for å kjøre igang en lokal mock-server med data fra output.json.
8. I terminal: cd tilbake til root folder for clonet prosjekt.
9. I terminal: kjør ```npm install``` for å installere alle dependencies.
10. I terminal: kjør ```npm start``` for å starte appen. Den kan deretter vises i en nettleser ved å følge linken som kommer opp. 

*Ved spørsmål kontakt Carlos på carlosreiakvam@outlook.com*


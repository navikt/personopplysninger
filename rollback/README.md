# Bash script for å rulle tilbake til annen versjon.

## Generelt

Dette skriptet er laget for å kunne rulle tilbake til en annen versjon av applikasjonen i Azure Storage. Scriptet kopierer index.html fra ønsket versjon, til rotmappen, slik at det er denne versjonen som blir servet i appen. 

## Bruk

Før man kan kjøre scriptet første gang må man sjekke at alle variabler stemmer.

``` 
AZURE_STORAGE_ACCOUNT="sapersonopplysninger"
AZURE_STORAGE_CONTAINER_PROD="sc-personopplysninger"
AZURE_STORAGE_CONTAINER_DEV="\$web"
AZURE_STORAGE_SAS="<--- Sett inn SAS for storage account her --->" 
```

I personopplysninger er "Storage Account"-name og Container-name konfigurert til riktige navn i scriptet. ```AZURE_STORAGE_SAS```er en signatur som gir scriptet tilgang til å skrive til Storage Accounten den er knyttet til. Den generes i Azure Portal, se [her](https://docs.snowflake.net/manuals/user-guide/data-load-azure-config.html) for fremgangsmåte. Kopier inn signaturen i variabelen ```AZURE_STORAGE_SAS```. 

Scriptet kjøres ved kommandoen ```bash rollback.sh``` fra mappen scriptet ligger. Scirptet vil liste opp tilgjengelige versjoner, og deretter velger man ønsket versjon. Om versjonen er gyldig og alt er gått fint, vil du få beskjed om at applikasjonen er rullet tilbake. Hvis ikke vil det vises en feilmelding. 

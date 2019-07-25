#!/bin/bash

read_dom () {
    local IFS=\>
    read -d \< ENTITY CONTENT
}

AZURE_STORAGE_ACCOUNT="sapersonopplysninger"
AZURE_STORAGE_CONTAINER_PROD="sc-personopplysninger"
AZURE_STORAGE_CONTAINER_DEV="\$web"
AZURE_STORAGE_SAS="<--- Sett inn SAS for storage account her --->"

echo "Starter rollback kommando!"


BLOBS=$(curl -s -X GET -H "x-ms-date: $(date -u)" -H "x-ms-blob-type: BlockBlob" "https://$AZURE_STORAGE_ACCOUNT.blob.core.windows.net/$AZURE_STORAGE_CONTAINER_PROD?restype=container&comp=list&$AZURE_STORAGE_SAS")

while read_dom; do
    if [[ $ENTITY = "Name" ]]; then
        REGEX="^([1-9][0-9]*)"
        if [[ $CONTENT =~ $REGEX ]]
        then
            NUMBER="$BASH_REMATCH"
            echo $NUMBER
        fi
    fi
done <<< "$BLOBS" | uniq

echo "Hvilken versjon vil du rulle tilbake til?"
read VERSJON
echo "Du valgte $VERSJON"

RESPONSE_PROD=$(curl --write-out %{http_code} -s -X PUT "https://$AZURE_STORAGE_ACCOUNT.blob.core.windows.net/$AZURE_STORAGE_CONTAINER_PROD/index.html?$AZURE_STORAGE_SAS" \
    -H "x-ms-date: $(date -u)" \
    -H "x-ms-copy-source: https://$AZURE_STORAGE_ACCOUNT.blob.core.windows.net/$AZURE_STORAGE_CONTAINER_PROD/$VERSJON/index.html" \
    -d "Content-Length: 0")

RESPONSE_DEV=$(curl --write-out %{http_code} -s -X PUT "https://$AZURE_STORAGE_ACCOUNT.blob.core.windows.net/$AZURE_STORAGE_CONTAINER_DEV/index.html?$AZURE_STORAGE_SAS" \
    -H "x-ms-date: $(date -u)" \
    -H "x-ms-copy-source: https://$AZURE_STORAGE_ACCOUNT.blob.core.windows.net/$AZURE_STORAGE_CONTAINER_DEV/$VERSJON/index.html" \
    -d "Content-Length: 0")

if [[ $RESPONSE_PROD = "202" ]]; then
    echo "$AZURE_STORAGE_CONTAINER_PROD ble rullet tilbake til versjon $VERSJON"
else
    echo -e "Noe gikk galt ved utrulling til $AZURE_STORAGE_CONTAINER_PROD. Kanskje du skrev en ugyldig verjson? Her er feilmeldingen: \n\n$RESPONSE_PROD\n"
fi
if [[ $RESPONSE_DEV = "202" ]]; then
    echo "$AZURE_STORAGE_CONTAINER_DEV ble rullet tilbake til versjon $VERSJON"
else
    echo -e "Noe gikk galt ved utrulling til $AZURE_STORAGE_CONTAINER_DEV. Kanskje du skrev en ugyldig verjson? Her er feilmeldingen: \n\n$RESPONSE_DEV\n"
fi
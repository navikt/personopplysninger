putFile () {
    FILENAME=$1
    STORAGE_ACCOUNT=$2
    CONTAINER=$3
    AZURE_STORAGE_SAS=$4 

    EXSTENSION="${FILENAME##*.}"
   
    case $EXSTENSION in

        js)
            CONTENT_TYPE="application/javascript" 
            ;;

        map)
            CONTENT_TYPE="application/octet-stream" 
            ;;

        html)
            CONTENT_TYPE="text/html" 
            ;;
        
        css)
            CONTENT_TYPE="text/css" 
            ;;
        
        less)
            CONTENT_TYPE="text/plain"
            ;;
        
        svg)
            CONTENT_TYPE="image/svg+xml"
            ;;

        json)
            CONTENT_TYPE="application/json" 
            ;;

        png)
            CONTENT_TYPE="image/png" 
            ;;

        jpeg)
            CONTENT_TYPE="image/jpeg" 
            ;;

        jpg)
            CONTENT_TYPE="image/jpeg" 
            ;;
        
        ico)
            CONTENT_TYPE="image/x-icon" 
            ;;

        gif)
            CONTENT_TYPE="image/gif" 
            ;;

        *)
            exit
            ;;
        
    esac
    echo "Uploading file with name: $FILENAME"
    echo "With content-type: $CONTENT_TYPE"
    echo "To storage account: $STORAGE_ACCOUNT"
    echo "To container: $CONTAINER"

    curl -i -X PUT -T "$FILENAME" -H "content-type: $CONTENT_TYPE" -H "x-ms-date: $(date -u)" -H "x-ms-blob-type: BlockBlob" "https://$STORAGE_ACCOUNT.blob.core.windows.net/$CONTAINER/$FILENAME?$AZURE_STORAGE_SAS"

}

putFile $1 $2 $3 $4
# export -f putFile


#find ./public -type f -exec bash -c putFile {} \;
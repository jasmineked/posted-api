#!/bin/bash

API="http://localhost:4741"
URL_PATH="/profile"

curl "${API}${URL_PATH}" \
  --include \
  --request POST \
  --header "Content-Type: application/json" \
  --header "Authorization: Bearer ${TOKEN}" \
  --data '{
    "profile": {
      "firstName": "'"${FIRSTNAME}"'",
      "lastName": "'"${LASTNAME}"'",
      "pronouns": "'"${PRONOUNS}"'",
      "picture": "'"${PICTURE}"'",
    }
    }
  }'

echo

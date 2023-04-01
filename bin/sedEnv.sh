#! /bin/sh

replace() {
  sed -i "s/${2}/${1}/g" .env
}

HOST="./terraform/postgres-manager/configs/host.tfvars"
OUT="./out/pg-mgmt.out.json"

replace $(cat ${OUT} | jq .app.password | tr -d '\"') "<PASSWORD>"
replace $(cat ${HOST} | grep secret | awk -F'"' '{print $2}') "<ROOTPASSWORD>"
replace $(cat ${HOST} | grep user | awk -F'"' '{print $2}') "<HOST>"

SECRET=$(openssl rand -base64 32 | tr -d '/')

echo ${SECRET}
replace "${SECRET}" "<NEXTAUTH_SECRET>" 

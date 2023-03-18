# BestMatch

## BootStrap
package need to be installed before running application
- docker
- make
- yarn
- terraform

## Installation
if you are using linux you can use following command
```bash
  make
```
or
```bash
  make install
```

or following these manual steps

start up database container
```bash
  docker-compose up -d
```

setting up database & migration
```bash
  CONF="./configs"
  cd ./terraform/postgres-manager && terraform init && terraform apply \
  -var-file=${CONF}/host.tfvars \
  -var-file=${CONF}/config.tfvars \
  --parallelism=1
```

get application user & creds
```bash
    OUT="../../out/pg-mgmt.out.json"
    terraform output -json user_password | jq . > ${OUT}
```

## Shutdown Server
```bash
   make down
```
or
```bash
    docker-compose down
```

## Uninstallation
Warning ! this procedure didn't ask your confirmation be careful to type `make` cmd
```bash
  make uninstall
```

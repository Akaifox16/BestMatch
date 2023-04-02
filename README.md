# BestMatch

## BootStrap
package need to be installed before running application
- make
- [docker](https://www.docker.com/)
- [yarn](https://yarnpkg.com/getting-started/install)
- [terraform](https://developer.hashicorp.com/terraform/downloads)

next change postgres password in `terraform/postgres-manager/configs/host.tfvars`
```
connection = {
  host = "localhost"
  port = 5433
  secret = "<your password here>"
}
```
and `db.env`
```
POSTGRES_PASSWORD="<your password here>"
```

then copy `.env.example` and rename to be `.env`
```
DATABASE_URL=postgresql://postgres:<ROOTPASSWORD>@localhost:5433/autoroommate?schema=roommate
APP_DB_URL="postgres://app:<PASSWORD>@backend-db:5432/autoroommate?schema=roommate"

NEXTAUTH_URL="localhost"
NEXTAUTH_SECRET="<NEXTAUTH_SECRET>"
```
### leave the .env exact same as when it was copied the make file will do its job

## Installation
We recommend you to run this application on linux machine
```bash
  make
```
or
```bash
  make install
```

## Shutdown Server
```bash
   make down
```

## Uninstallation
Warning ! this procedure didn't ask your confirmation be careful to type `make` cmd
```bash
  make uninstall
```

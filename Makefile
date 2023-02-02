# executer
SHELL=bash

# terraform path
TF_PATH="./terraform/postgres-manager/"
CONF="./configs"
OUT="../../out/pg-mgmt.out.json"

#color
C="\033["
DNGR="${C}31m"
SUCS="${C}32m"
INFO="${C}34m"
RS="${C}0m"

install:
	@echo -e "${INFO}Starting${RS} installation..."
	@docker-compose up -d
	@echo -e "\n\n${INFO}Setting up${RS} database"
	@cd ${TF_PATH} && terraform init && terraform apply -var-file=${CONF}/host.tfvars -var-file=${CONF}/config.tfvars --parallelism=1 && terraform output -json user_password | jq . > ${OUT}
	@echo -e "\n\n${INFO}Migrate${RS} database"
	@cd ./packages/database/ && yarn db:migrate:dev
	@echo -e "\n\n${SUCS}Installation completed${RS}"

uninstall:
	@echo -e "${DNGR}Begining${RS} uninstallation..."
	@echo -e "${DNGR}Destroy${RS} database"
	@cd ${TF_PATH} && terraform init && terraform destroy -var-file=${CONF}/host.tfvars -var-file=${CONF}/config.tfvars --parallelism=1 && rm ${OUT}
	@echo -e "${DNGR}Destroy${RS} docker-compose"
	@docker-compose down -v
	@docker volume list
	@echo -e "\n\n${SUCS}Uninstall completed${RS}"

# executer
SHELL=bash

# terraform path
TF_PATH="./terraform/postgres-manager/"
CONF="./configs/"

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
	# @cd ${TF_PATH} && terraform init && terraform apply -var-file=${CONF}/host.tfvars -var-file=${CONF}/config.tfvars --parallelism=1
	@echo -e "\n\n${INFO}Migrate${RS} database"
	@cd ./packages/database/ && yarn db:migrate:dev
	@echo -e "\n\n${SUCS}Installation completed${RS}"

uninstall:
	@echo -e "${DNGR}Begining${RS} uninstallation..."
	@docker-compose down -v
	echo -e "\n\n${SUCS}Uninstall completed${RS}"

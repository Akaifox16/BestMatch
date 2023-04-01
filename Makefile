# executer
SHELL=bash

# terraform path
TF_PATH="./terraform/postgres-manager/"
CONF="./configs"
OUT="../../out/pg-mgmt.out.json"
PWD_CNF="${TF_PATH}/${CONF}/host.tfvars"

#color
C="\033[" # ANSI COMMAND
DNGR="${C}31m" # DANGER
SUCS="${C}32m" # SUCCESS
INFO="${C}34m" # INFO
RS="${C}0m" 	 # RESET

install:
	@echo -e "${INFO}Starting${RS} installation..."
	@docker-compose up -d backend-db
	@sleep 1
	@echo -e "\n\n${INFO}Setting up${RS} database"
	@cd ${TF_PATH} && \
		terraform init && \
		terraform apply \
		-var-file=${CONF}/host.tfvars \
		-var-file=${CONF}/config.tfvars \
		--parallelism=1 \
		--auto-approve && \
		terraform output -json user_password | jq . > ${OUT}
	@echo -e "\n\n${INFO}Replacing Environment Variables${RS}"
	@./bin/sedEnv.sh
	@echo -e "\n\n${INFO}Migrate${RS} database"
	@yarn workspace @acme/database db:push
	@sleep 1
	@echo -e "\n\n${INFO}Starting Application${RS}"
	@docker-compose up -d next-app nginx
	@echo -e "\n\n${SUCS}Installation completed${RS}"

up:
	@echo -e "${INFO}Booting${RS} server"
	@docker-compose up -d
	@echo -e "\n\n${SUCS}Booting server successfully...${RS}"

down:
	@echo -e "${INFO}Shutting down${RS} server"
	@docker-compose down
	@docker ps
	@echo -e "\n\n${SUCS}Shutting down server successfully...${RS}"

uninstall:
	@echo -e "${DNGR}Begining${RS} uninstallation..."
	@echo -e "${DNGR}Destroy${RS} database"
	@cd ${TF_PATH} && \
		terraform init && \
		terraform destroy \
		-var-file=${CONF}/host.tfvars \
		-var-file=${CONF}/config.tfvars \
		--parallelism=1 \
		--auto-approve && \
		rm ${OUT}
	@echo -e "${DNGR}Destroy${RS} docker-compose"
	@docker-compose down -v
	@docker volume list
	@echo -e "\n\n${SUCS}Uninstall completed${RS}"

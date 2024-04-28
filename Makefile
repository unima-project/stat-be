.PHONY: init
init:
	@echo "> init apps"
	@make init-be init-fe -j

.PHONY: init-be
init-be:
	@echo "> init be"
	@pip install -r requirements.txt

.PHONY: init-fe
init-fe:
	@echo "> init fe"
	@cd client; npm i -f

.PHONY: run
run:
	@echo "> run apps"
	@make run-be run-fe -j

.PHONY: run-be
run-be:
	@echo "> run be"
	@python3 -m flask --app app run --host=0.0.0.0 --port=9000

.PHONY: run-fe
run-fe:
	@echo "> run fe"
	@cd client; npm start

.PHONY: create-admin
create-admin:
	@echo "> register admin"
	@cd models; python3 -m model_admin

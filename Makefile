serve:
	@echo "$(shell tput bold)Welcome to Project Launcher!$(shell tput sgr0)"
	@echo "$(shell tput setaf 1)*** Have you configured the .env file accordingly? ***$(shell tput sgr0)"
	@echo "$(shell tput setaf 6)Choose how to run the project:$(shell tput sgr0)"
	@echo "$(shell tput setaf 4)1. Run with Docker (requires Docker Desktop)$(shell tput sgr0)"
	@echo "$(shell tput setaf 2)2. Run Locally (requires XAMPP)$(shell tput sgr0)"
	@echo "$(shell tput setaf 5)x. Close Launcher$(shell tput sgr0)"
	@read -p "$(shell tput setaf 3)Enter your choice (1, 2, or x to close): $(shell tput sgr0)" choice; \
	if [ $$choice = "x" ]; then \
		echo "$(shell tput setaf 5)Closing Launcher...$(shell tput sgr0)"; \
	elif [ $$choice -eq 1 ]; then \
		echo "$(shell tput setaf 6)Launching Docker containers...$(shell tput sgr0)"; \
		docker system prune && docker-compose up --build; \
	elif [ $$choice -eq 2 ]; then \
		echo "$(shell tput setaf 6)Running Locally...$(shell tput sgr0)"; \
		npm i && node seeder && npm start; \
	else \
		echo "$(shell tput setaf 1)Invalid choice! Exiting...$(shell tput sgr0)"; \
	fi

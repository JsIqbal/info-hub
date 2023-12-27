serve:
	@echo "$(shell tput bold)Welcome to Project Launcher!$(shell tput sgr0)"
	@echo "$(shell tput setaf 6)Choose how to run the project:$(shell tput sgr0)"
	@echo "$(shell tput setaf 4)1. Run with Docker (requires Docker Desktop)$(shell tput sgr0)"
	@echo "$(shell tput setaf 2)2. Run Locally (requires XAMPP)$(shell tput sgr0)"
	@read -p "$(shell tput setaf 3)Enter your choice (1 or 2): $(shell tput sgr0)" choice; \
	if [ $$choice -eq 1 ]; then \
		echo "$(shell tput setaf 6)Launching Docker containers...$(shell tput sgr0)"; \
		docker system prune && docker-compose up --build; \
	elif [ $$choice -eq 2 ]; then \
		echo "$(shell tput setaf 6)Running Locally...$(shell tput sgr0)"; \
		node seeder && npm start; \
	else \
		echo "$(shell tput setaf 1)Invalid choice! Exiting...$(shell tput sgr0)"; \
	fi

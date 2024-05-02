SHELL := /bin/bash

# Param defaults
IMAGE_NAME ?= $(notdir $(CURDIR))
REGISTRY ?= ghcr.io
NAMESPACE ?= joshuanazareth97
VERSION_TYPE ?= patch
SNAPSHOT ?= true
CHANGELOG_FILE := CHANGELOG.md

# Helper to check variables and display current/default value in the prompt
define check_defined
		if [ -z '$($(1))' ]; then \
				echo "Please provide $(2) by running 'make $(1)=$(2)'"; \
				exit 1; \
		fi
endef

# Validate required parameters and prompt for missing ones, except when snapshot is true
check-params:
		@$(call check_defined,AUTH_TOKEN,your auth token)
		@if [ "$(SNAPSHOT)" = "false" ]; then \
				$(call check_defined,CHANGELOG_MSG,changelog message); \
		fi

# Update Python package version with Poetry and get the new version, considering snapshot
bump-version: check-params
	@if [ "$(SNAPSHOT)" = "true" ]; then \
		echo "Bumping pre-$(VERSION_TYPE) version using Poetry..."; \
		poetry version pre$(VERSION_TYPE); \
	else \
		echo "Bumping $(VERSION_TYPE) version using Poetry..."; \
		poetry version $(VERSION_TYPE); \
	fi
	@echo "New version: $$(poetry version -s)"

# Update changelog conditionally
update-changelog: bump-version
	@if [ "$(SNAPSHOT)" = "false" ]; then \
		echo "Updating changelog..." && \
		echo "## [$$(cat version.txt)] - $$(date +'%Y-%m-%d')" >> $(CHANGELOG_FILE) && \
		echo "$(CHANGELOG_MSG)" >> $(CHANGELOG_FILE) && \
		echo "" >> $(CHANGELOG_FILE); \
	fi

# Build the Docker image
build: update-changelog
	@echo "Building Docker image with version $$(poetry version -s)..."
	@docker build --build-arg VERSION=$$(poetry version -s) -t $(REGISTRY)/$(NAMESPACE)/$(IMAGE_NAME):$$(poetry version -s) .

# Push the Docker image to a registry
push: build
	@echo "Checking if image exists..."
	@ docker manifest inspect $(REGISTRY)/$(NAMESPACE)/$(IMAGE_NAME):$$(poetry version -s) > /dev/null 2>&1 && \
		echo "Image already exists, not pushing." || \
		(echo "Image does not exist, pushing..." && \
		docker push $(REGISTRY)/$(NAMESPACE)/$(IMAGE_NAME):$$(poetry version -s))
		

# Log in to the Docker registry
login: 
	@echo "Logging into Docker registry..."
	@docker login $(REGISTRY) -u $(NAMESPACE) -p 

# Clean up local Docker images
clean:
	@docker rmi $(REGISTRY)/$(NAMESPACE)/$(IMAGE_NAME):$$(poetry version -s)


# Phony targets
.PHONY: build push login clean update-changelog bump-version check-params

# Default target
all: push

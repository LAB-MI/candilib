SHELL := /bin/bash
APP := candilib
# get version (from git  or static VERSION file)
APP_VERSION := $(shell bash ./version.sh || cat VERSION)
#
LATEST_VERSION = latest

APP_PATH := $(shell pwd)
BUILD_DIR=${APP_PATH}/${APP}-build

# binaries
DOCKER := $(shell type -p docker)
DC     := $(shell type -p docker-compose)
proxy := $(shell echo $$http_proxy)
no_proxy := $(shell echo $$no_proxy)

# cli docker-compose
DC_BUILD_ARGS = --pull --no-cache --force-rm

# docker-compose file: development or production  (build or run time)
DC_APP_BUILD_DEV  := docker-compose.yml
DC_APP_RUN_DEV    := docker-compose.yml
DC_APP_BUILD_PROD := docker-compose-production.yml
DC_APP_RUN_PROD   := docker-compose-run-production.yml
DC_APP_BUILD_FRONT_PROD  := docker-compose-build-front.yml
DC_APP_RUN_FRONT_PROD    := docker-compose-build-front.yml
DC_APP_BUILD_FRONT_DEV  := docker-compose-build-front-dev.yml
DC_APP_RUN_FRONT_DEV    := docker-compose-build-front-dev.yml

# detect tty
USE_TTY := $(shell test -t 1 && { DOCKER_USE_TTY="-t" ; DOCKER_COMPOSER_USE_TTY="-T" ; } )

# source archive
FILE_ARCHIVE_APP_VERSION = $(APP)-$(APP_VERSION)-archive.tar.gz
FILE_ARCHIVE_LATEST_VERSION = $(APP)-$(LATEST_VERSION)-archive.tar.gz
FILE_FRONT_APP_VERSION = $(APP)-$(APP_VERSION)-front.tar.gz
 
# docker image name
FILE_IMAGE_WEB_APP_VERSION = $(APP)-web-$(APP_VERSION)-image.tar
FILE_IMAGE_WEB_LATEST_VERSION = $(APP)-web-$(LATEST_VERSION)-image.tar
FILE_IMAGE_DB_APP_VERSION = $(APP)-db-$(APP_VERSION)-image.tar
FILE_IMAGE_DB_LATEST_VERSION = $(APP)-db-$(LATEST_VERSION)-image.tar

# Publish URL (docker image and archive)
PUBLISH_AUTH_TOKEN         :=
PUBLISH_URL                :=
PUBLISH_URL_BASE           := ${APP}-docker-images
PUBLISH_URL_APP_VERSION    := $(PUBLISH_URL_BASE)/$(APP_VERSION)
PUBLISH_URL_LATEST_VERSION := $(PUBLISH_URL_BASE)/$(LATEST_VERSION)

# escape dollar
dollar = $(shell echo \$$)

# Build env
#  Private npm miror
NPM_REGISTRY = $(shell echo $$NPM_REGISTRY )

# Run env
#  Mongo DB volume path (in production mode)
DBDATA := ${APP_PATH}/db

# export all variables in subshell
export

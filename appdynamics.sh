#!/usr/bin/env bash

export APPD_NAME="my-prefix-${APP_NAME}"
export APPD_TIER=backend
export APPD_HOSTNAME="$FASIT_ENVIRONMENT_NAME-$HOSTNAME"
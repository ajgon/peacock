#!/usr/bin/env bash

yarn install --non-interactive --no-progress

exec "$@"

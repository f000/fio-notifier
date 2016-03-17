#!/bin/bash

cd "$(dirname "$0")"

export NVM_DIR="$HOME/.nvm"

DEFAULT_NVM="$NVM_DIR/nvm.sh"
HOMEBREW_NVM="$(/usr/local/bin/brew --prefix nvm)/nvm.sh"
if [ -s "$HOMEBREW_NVM" ]
then
    . "$HOMEBREW_NVM"
else
    . "$DEFAULT_NVM"
fi

nvm use stable > /dev/null

node ./fio-notifier.js

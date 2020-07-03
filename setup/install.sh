#!/bin/sh
#Dummy Script.
#Target OS X

brew install pyenv

# Replace .zshrc with your appropriate shell RC file
# IMPORTANT: Use .bash_profile, not .bashrc for bash

echo -e 'if command -v pyenv 1>/dev/null 2>&1; then\n  eval "$(pyenv init -)"\nfi' >> ~/.zshrc
exec $SHELL
pyenv install 3.7.3
pyenv global 3.7.3

pip3 install ansible fabric3 jsonpickle requests PyYAML
vagrant plugin install vagrant-vbguest

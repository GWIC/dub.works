#!/usr/bin/env bash

# Script to install Meteor

# Packages
METEOR_URL="https://install.meteor.com/"
METEOR="meteor"
GIT="git"

# Git
GIT_INSTALLED=$(dpkg-query -W --showformat='${Status}\n' $GIT | grep "install ok installed")
echo "Checking for $GIT: $GIT_INSTALLED"
if [ "" == "$GIT_INSTALLED" ]; then
    apt-get update
    apt-get install -y $GIT
fi

# Meteor
if [ ! -d ~/.meteor ]; then
    echo "Checking for $METEOR: not installed... Installing."
    curl $METEOR_URL | sh
else
    echo "Checking for $METEOR: install ok installed"
fi

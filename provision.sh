#!/usr/bin/env bash
# Packages
NODE="nodejs"
BUILD_ESSENTIAL="build-essential"
MONGO="mongodb-org"
GIT="git"
# Prerequisites
GIT_INSTALLED=$(dpkg-query -W --showformat='${Status}\n' $GIT | grep "install ok installed")
echo "Checking for $GIT: $GIT_INSTALLED"
if [ "" == "$GIT_INSTALLED" ]; then
  apt-get update
  apt-get install -y $GIT
fi
# MongoDB
MONGO_INSTALLED=$(dpkg-query -W --showformat='${Status}\n' $MONGO | grep "install ok installed")
echo "Checking for $MONGO: $MONGO_INSTALLED"
if [ "" == "$MONGO_INSTALLED" ]; then
  apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv EA312927
  echo "deb http://repo.mongodb.org/apt/ubuntu trusty/mongodb-org/3.2 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-3.2.list
  apt-get update
  apt-get install -y mongodb-org
fi
# Node.js
NODE_INSTALLED=$(dpkg-query -W --showformat='${Status}\n' $NODE | grep "install ok installed")
echo "Checking for $NODE: $NODE_INSTALLED"
if [ "" == "$NODE_INSTALLED" ]; then
  curl -sL https://deb.nodesource.com/setup_6.x | sudo -E bash -
  apt-get install -y build-essential nodejs
fi
BOWER_INSTALLED=$(npm list --depth 1 --parseable=true --global bower > /dev/null 2>&1)
echo "Checking for $BOWER: $BOWER_INSTALLED"
if [ "" == "$BOWER_INSTALLED" ]; then
  npm install -g bower
fi
GULP_INSTALLED=$(npm list --depth 1 --parseable=true --global gulp > /dev/null 2>&1)
echo "Checking for $GULP: $GULP_INSTALLED"
if [ "" == "$GULP_INSTALLED" ]; then
  npm install -g gulp
fi

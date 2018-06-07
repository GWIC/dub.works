#!/usr/bin/env bash

# Script to install MEAN.js using commands from http://mean.io/2017/10/31/getting-started-mean-io/

# Packages
NODE="nodejs"
MONGO="mongodb-org"
GIT="git"
KEYSTONEJS="generator-keystone"
YO="yo"

BUILD_ESSENTIAL="build-essential"

# Git
GIT_INSTALLED=$(dpkg-query -W --showformat='${Status}\n' $GIT | grep "install ok installed")
echo "Checking for $GIT: $GIT_INSTALLED"
if [ "" == "$GIT_INSTALLED" ]; then
    apt-get update
    apt-get install -y $GIT
fi

# Node.js & npm
NODE_INSTALLED=$(dpkg-query -W --showformat='${Status}\n' $NODE | grep "install ok installed")
echo "Checking for $NODE: $NODE_INSTALLED"
if [ "" == "$NODE_INSTALLED" ]; then
    curl -sL https://deb.nodesource.com/setup_8.x | sudo -E bash -
    apt-get install -y build-essential nodejs
fi

# MongoDB
MONGO_INSTALLED=$(dpkg-query -W --showformat='${Status}\n' $MONGO | grep "install ok installed")
echo "Checking for $MONGO: $MONGO_INSTALLED"
if [ "" == "$MONGO_INSTALLED" ]; then
    apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv 2930ADAE8CAF5059EE73BB4B58712A2291FA4AD5
    echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu xenial/mongodb-org/3.6 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-3.6.list
    apt-get update
    apt-get install -y $MONGO
fi

# Setting up MongoDB service
sudo service mongod start
cat /var/log/mongodb/mongod.log | grep "27017"

# KeystoneJS generator
KEYSTONEJS_INSTALLED=$(npm list --depth 1 --parseable=true --global generator-keystone > /dev/null 2>&1)
echo "Checking for $KEYSTONEJS: $KEYSTONEJS_INSTALLED"
if [ "" == "$KEYSTONEJS_INSTALLED" ]; then
    npm install -g $KEYSTONEJS
fi

# Yeoman generator
YO_INSTALLED=$(npm list --depth 1 --parseable=true --global yo > /dev/null 2>&1)
echo "Checking for $YO: $YO_INSTALLED"
if [ "" == "$YO_INSTALLED" ]; then
    npm install -g $YO
fi

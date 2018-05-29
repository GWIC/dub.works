#!/usr/bin/env bash

# Script to install MEAN.js using commands from http://mean.io/2017/10/31/getting-started-mean-io/

# Packages
NODE="nodejs"
MONGO="mongodb-org"
GIT="git"

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
    curl -sL https://deb.nodesource.com/setup_6.x | sudo -E bash -
    apt-get install -y build-essential nodejs
fi

# MongoDB
MONGO_INSTALLED=$(dpkg-query -W --showformat='${Status}\n' $MONGO | grep "install ok installed")
echo "Checking for $MONGO: $MONGO_INSTALLED"
if [ "" == "$MONGO_INSTALLED" ]; then
    apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv 2930ADAE8CAF5059EE73BB4B58712A2291FA4AD5
    echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu xenial/mongodb-org/3.6 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-3.6.list
    apt-get update
    apt-get install -y mongodb-org

    # Setting up service
    cat <<EOF >> /etc/systemd/system/mongodb.service
[Unit]
Description=High-performance, schema-free document-oriented database
After=network.target

[Service]
User=mongodb
ExecStart=/usr/bin/mongod –quiet –config /etc/mongod.conf

[Install]
WantedBy=multi-user.target
EOF

    systemctl start mongodb
    systemctl status mongodb
    systemctl enable mongodb
fi

# Bower
BOWER_INSTALLED=$(npm list --depth 1 --parseable=true --global bower > /dev/null 2>&1)
echo "Checking for $BOWER: $BOWER_INSTALLED"
if [ "" == "$BOWER_INSTALLED" ]; then
    npm install -g bower
fi

# Gulp
GULP_INSTALLED=$(npm list --depth 1 --parseable=true --global gulp > /dev/null 2>&1)
echo "Checking for $GULP: $GULP_INSTALLED"
if [ "" == "$GULP_INSTALLED" ]; then
    npm install -g gulp
fi

# MEAN-CLI
MEAN_INSTALLED=$(npm list --depth 1 --parseable=true --global mean-cli > /dev/null 2>&1)
echo "Checking for $MEAN: $MEAN_INSTALLED"
if [ "" == "$MEAN_INSTALLED" ]; then
    npm install -g mean-cli
fi

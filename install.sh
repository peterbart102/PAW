#!/bin/sh

# DOCKER INSTALLATION
apt-get update
apt-get -y install \
    apt-transport-https \
    ca-certificates \
    curl \
    software-properties-common
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
add-apt-repository --yes \
   "deb [arch=amd64] https://download.docker.com/linux/ubuntu \
   $(lsb_release -cs) \
   stable"
apt-get update
apt-get -y install docker-ce
docker run hello-world


# DOCKER-COMPOSE INSTALLATION
curl -L https://github.com/docker/compose/releases/download/1.19.0/docker-compose-`uname -s`-`uname -m` -o /usr/local/bin/docker-compose
chmod +x /usr/local/bin/docker-compose

docker-compose --version

# GIT INSTALLATION
apt-get install git-core

# CLONE PROJECT
mkdir ~/projects
git clone https://github.com/peterbart102/PAW.git ~/projects

# INSTALL NVM
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.8/install.sh | bash

nvm use node

cd ~/projects/PAW/docker
docker-compose up -d mariadb
cd ~/projects/PAW/back-end

npm install
npm install -g @nestjs/cli

nest serve

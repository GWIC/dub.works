# dub.works
[KeystoneJS](http://keystonejs.com/) port of the current dub.works website

## Installation
### Cloning
Run the following command:
```bash
git clone https://github.com/omn0mn0m/dub.works.git
```

### Setting Up Vagrant
Follow the instructions found [here](https://www.vagrantup.com/intro/getting-started/install.html). This project has been tested with VirtualBox, but should also work with VMware (someone please confirm this).

After installing VM software and Vagrant, run the following command while in the repo:

```bash
vagrant up
```

This command should be used whenever starting up the virtual machine.

## Accessing the Virtual Machine
You can SSH into the virtual machine using the following:

```bash
vagrant ssh
```

The dub.works code can be found in `/vagrant/dub-works`. A live version can be found at http://192.168.33.10:3000

### Initial Access
When you first open the project, you must do the following setup commands:

```bash
cd /vagrant/dub-works
npm install
```

After installing NodeJS dependencies, you should download the `.env` file from the Slack channel. If you need this file, contact [omn0mn0m](mailto:tranngocnam97@gmail.com). This file contains secrets and keys and should not be commited to Git. After adding the `.env` file to dub-works, run the following:

```bash
node keystone
```

This wil start a live version of the site, which can be stopped with CTRL-C.

## Pulling Latest Changes
Pulling the latest changes are as simple as running the following commands from **outside** of Vagrant SSH:

```bash
git pull
vagrant reload --provision
```

This will reload the VM and run the provisioning script, which will only install software that is not already present on the VM.

## Pushing New Changes
Pushing changes consists of commiting new changes and then pushing the commits to GitHub.

```bash
git add any-of-your-new-files
git commit -a -m "Your changes here"
git push
```

## Closing the Virtual Machine
Run the following command:

```bash
vagrant halt
```

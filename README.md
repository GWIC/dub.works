# dub.works
MEAN stack port of the current dub.works website

## Cloning
Run the following command:
```bash
git clone https://github.com/omn0mn0m/vagrant-dubworks.git
```

Note that the repo will contain the [dub.works](https://github.com/ryansteed/dub.works) repo as a subtree. It will most likely need to be updated. To do that, run the follow commands:

```bash
git remote add -f dub.works https://github.com/ryansteed/dub.works.git
git subtree pull --prefix public dub.works master --squash
git push
```

This will add dub.works as a remote, pull the latest commits, and then push back to vagrant-dubworks so that the next time someone clones it, it will be up-to-date.

## Setting Up Vagrant
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

The dub.works code can be found in `/var/www/public`. A live version can be found at http://192.168.33.10

## Closing the Virtual Machine
Run the following command:

```bash
vagrant halt
```

## Pulling Latest Changes
Because of the subtree setup, it is important to distinguish between pulling from vagrant-dubworks or dub.works... This will be fixed in the future.

### Website Changes
To pull changes for the website:

```bash
git subtree pull --prefix public dub.works master --squash
```

### Vagrant Changes
To pull changes for the Vagrant virtual machine:

```bash
git pull
```

## Pushing New Changes
Because of the subtree setup, it is important to distinguish between pushing to vagrant-dubworks or dub.works... This will be fixed in the future.

General commands to add new files for tracking and then commiting:

```bash
git add any-of-your-new-files
git commit -a -m "Your changes here"
```

### Website Changes (Do these first)

To push changes to the website:

```bash
git subtree push --prefix=public dub.works master
```

### Vagrant Changes (Do these second)
To push changes to the Vagrant virtual machine:

```bash
git push
```

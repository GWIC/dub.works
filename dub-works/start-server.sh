#!/bin/sh

#if ! screen -list | grep -q "keystone"; then
    #screen -S minecraft -d -m java -jar -Xmx4096M spigot-1.12.2.jar nogui
    screen -S keystone -d -m node keystone
#fi

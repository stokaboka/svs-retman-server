#!/bin/sh

#scp -rp  /home/igor/WebstormProjects/svs-retman-server/dist/* ubuntu@orangem.me:/opt/webapps/retman/beginners

# ssh ubuntu@orangem.me 'mkdir -p /opt/webapps/retman/beginners/config'

# scp -rp  /home/igor/WebstormProjects/svs-retman-server/config/* ubuntu@orangem.me:/opt/webapps/retman/beginners/config
# scp -rp  /home/igor/WebstormProjects/svs-retman-server/.env ubuntu@orangem.me:/opt/webapps/retman/beginners/.env
# scp -rp  /home/igor/WebstormProjects/svs-retman-server/ormconfig.json ubuntu@orangem.me:/opt/webapps/retman/beginners/ormconfig.json
# scp -rp  /home/igor/WebstormProjects/svs-retman-server/package.json ubuntu@orangem.me:/opt/webapps/retman/beginners/package.json

#ssh ubuntu@orangem.me 'mkdir -p /opt/webapps/retman/beginners/public/sound'

#scp -rp  /home/igor/WebstormProjects/svs-retman-server/public/sound/* ubuntu@orangem.me:/opt/webapps/retman/beginners/public/sound

scp -rp  /home/igor/WebstormProjects/svs-retman/dist/spa-mat/* ubuntu@orangem.me:/opt/webapps/retman/beginners/public


exit 0

#!/bin/bash
npm config delete prefix
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.31.2/install.sh | bash
. ~/.nvm/nvm.sh
nvm install 6.7.0
npm install npm@latest -g
npm install
# Set app's env vars
domain=".mybluemix.net"
case "${REGION_ID}" in
  ibm:yp:eu-gb)
    domain=".eu-gb.mybluemix.net"
  ;;
  ibm:yp:au-syd)
  domain=".au-syd.mybluemix.net"
  ;;
esac
export SOCKET_URL=https://$UI_APP_NAME$domain
npm run deploy:prod
rm -rf node_modules

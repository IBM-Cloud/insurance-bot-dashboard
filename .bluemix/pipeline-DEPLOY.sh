#!/bin/bash

# The branch may use a custom manifest
MANIFEST=manifest.yml
if [ -f ${REPO_BRANCH}-manifest.yml ]; then
  MANIFEST=${REPO_BRANCH}-manifest.yml
  PREFIX=$REPO_BRANCH"-"
fi
echo "Using manifest file: $MANIFEST"
echo "Using prefix: $PREFIX"

if [ -z "$CLOUDANT_PLAN" ]; then
  export CLOUDANT_PLAN=Lite
fi
echo "CLOUDANT_PLAN=$CLOUDANT_PLAN"

if [ -z "$TONE_PLAN" ]; then
  export TONE_PLAN=lite
fi
echo "TONE_PLAN=$TONE_PLAN"

# Create CF services
cf create-service cloudantNoSQLDB ${CLOUDANT_PLAN} ${PREFIX}insurance-bot-db
cf create-service tone_analyzer ${TONE_PLAN} insurance-tone_analyzer
if ! cf app $CF_APP; then
  cf push $CF_APP -n $CF_APP -f $MANIFEST
else
  OLD_CF_APP=${CF_APP}-OLD-$(date +"%s")
  rollback() {
    set +e
    if cf app $OLD_CF_APP; then
      cf logs $CF_APP --recent
      cf delete $CF_APP -f
      cf rename $OLD_CF_APP $CF_APP
    fi
    exit 1
  }
  set -e
  trap rollback ERR
  cf rename $CF_APP $OLD_CF_APP
  cf push $CF_APP -n $CF_APP -f $MANIFEST
  cf delete $OLD_CF_APP -f
fi

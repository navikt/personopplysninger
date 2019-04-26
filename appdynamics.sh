#!/usr/bin/env bash

if [ -z ${APPDYNAMICS+x} ]; then
    JAVA_OPTS="${JAVA_OPTS} -javaagent:/opt/appdynamics/javaagent.jar "
    JAVA_OPTS="${JAVA_OPTS} -Dappdynamics.agent.applicationName=${APP_NAME}_${FASIT_ENVIRONMENT_NAME}"
    JAVA_OPTS="${JAVA_OPTS} -Dappdynamics.agent.tierName=${FASIT_ENVIRONMENT_NAME}_${APP_NAME}"
    JAVA_OPTS="${JAVA_OPTS} -Dappdynamics.agent.reuse.nodeName=true"
    JAVA_OPTS="${JAVA_OPTS} -Dappdynamics.agent.reuse.nodeName.prefix=${FASIT_ENVIRONMENT_NAME}_${APP_NAME}_"
    JAVA_OPTS="${JAVA_OPTS} -Dappdynamics.jvm.shutdown.mark.node.as.historical=true"
    export JAVA_OPTS
fi
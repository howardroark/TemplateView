#!/bin/bash

export DISPLAY=:99.0

sh -e /etc/init.d/xvfb start

if [ ! -d chromium-source ]; then
    wget 'https://chromium.googlesource.com/chromium/src.git/+archive/52.0.2743.82.tar.gz' -O chromium-source.tar.gz;
    mkdir chromium-source;
    tar -xvf chromium-source.tar.gz -C chromium-source --strip-components=1 > /dev/null;
fi

./chromium-source/build/install-build-deps.sh

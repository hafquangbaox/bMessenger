#!/bin/bash

daemon() {
    chsum1=""

    while [[ true ]]
    do
        chsum2=`find ./src/ -type f -exec md5 {} \;`
        if [[ $chsum1 != $chsum2 ]] ; then
            /bin/bash ./build.sh
            chsum1=$chsum2
        fi
        sleep 2
    done
}

daemon $*

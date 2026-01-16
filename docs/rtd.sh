#!/bin/bash

read -n 1 -s -p "Clean? [y/n]" clean_rsp
if [[ $clean_rsp -eq "y" ]]; then
    echo ""
    make clean
fi

logfile=$(find makehtml.log)
if [[ -n "$logfile" ]]; then
    rm makehtml.log
fi

warnings=$(make html >> makehtml.log && tail makehtml.log | grep -o "[[:digit:]]\+ warning")
read -ra warnings_toks <<< "$warnings"
if [[ ${#warnings_toks[@]} -eq 0 ]]; then
    echo "Opening RoboFlock documentation in Firefox..."
    firefox build/html/index.html
    exit 0
else
    echo -e "\n\033[0;31m${warnings_toks[0]} warnings when building HTML files. See "makehtml.log" for more info.\033[0m" 1>&2
    exit 1
fi

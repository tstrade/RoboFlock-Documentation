#!/bin/bash

if ! command -v git-lfs >/dev/null 2>&1; then
    echo -e "Warning: git-lfs is not installed."
    echo "This repo tracks files (.f3d, .stl, .pdf) with Git LFS."
    echo "Without it, the docs will publish broken (131-byte) downloads."
    read -n 1 -s -p "Install git-lfs now via apt? [y/n] " lfs_install_rsp
    echo ""
    if [[ "$lfs_install_rsp" == "y" ]]; then
        sudo apt update && sudo apt install -y git-lfs
        if ! command -v git-lfs >/dev/null 2>&1; then
            echo -e "Install failed. Aborting build." 1>&2
            exit 1
        fi
        git lfs install
        git lfs pull
    else
        echo -e "Aborting. Install git-lfs and run again, or accept that CAD downloads will be broken." 1>&2
        exit 1
    fi
else
    pointer_files=$(find source/_files -name "*.f3d" -size -1k 2>/dev/null)
    if [[ -n "$pointer_files" ]]; then
        echo -e "Warning: detected unresolved LFS pointer files:"
        echo "$pointer_files"
        read -n 1 -s -p "Run 'git lfs pull' now? [y/n] " lfs_pull_rsp
        echo ""
        if [[ "$lfs_pull_rsp" == "y" ]]; then
            git lfs pull
        else
            echo -e "Aborting. CAD downloads would be broken." 1>&2
            exit 1
        fi
    fi
fi

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
    echo "Opening RoboFlock documentation in Browser..."
    cd "$(dirname "$0")"
    python -m http.server 8080 --directory build/html
    exit 0
else
    echo -e "\n${warnings_toks[0]} warnings when building HTML files. See "makehtml.log" for more info." 1>&2
    exit 1
fi

#!/bin/bash
cd /Users/yetkin/Desktop/HDF_Web || exit 1
export npm_config_cache="/Users/yetkin/Desktop/HDF_Web/.npm-cache"
export LOCAL_DB_PATH="/Users/yetkin/Desktop/HDF_Web/data/local-db.json"
rm -f /Users/yetkin/Desktop/HDF_Web/.next/dev/lock
npm run dev -- --hostname 127.0.0.1 --port 3001

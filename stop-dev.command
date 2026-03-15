#!/bin/bash
pkill -f "next dev" || true
pkill -f "node.*next" || true
rm -f /Users/yetkin/Desktop/HDF_Web/.next/dev/lock

#!/usr/bin/env bash

# npm run build-host-production

echo "开始打包..."
mkdir ./.temp
tar -czvf ./.temp/dist.tar.gz dist package.json server

echo "\n开始上传..."
scp ./.temp/dist.tar.gz www@47.57.124.61:~/website/dist.tar.gz
rm -rf ./.temp

ssh www@47.57.124.161 > /dev/null 2>&1 << eeooff
cd ./website/
tar -xzvf dist.tar.gz
rm -f dist.tar.gz
exit
eeooff
# npm install
# pm2 stop server.js
# pm2 start server.js
echo "Done!"

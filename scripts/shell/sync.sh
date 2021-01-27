 #!/usr/bin/env bash
 echo "同步Git..."

# status=$(git status -z)

branch=$(git rev-parse --abbrev-ref HEAD)
# git fetch --depth=1
git pull --tags origin $branch

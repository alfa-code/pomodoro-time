#!/bin/bash
set -e # Exit with nonzero exit code if anything fails

echo "Starting deployment"
echo "Target: gh-pages branch"

SOURCE_BRANCH="master"
TARGET_BRANCH="gh-pages"

DIST_DIRECTORY="dist/"
CURRENT_COMMIT=`git rev-parse HEAD`
ORIGIN_URL=`git config --get remote.origin.url`
ORIGIN_URL_WITH_CREDENTIALS=${ORIGIN_URL/\/\/github.com/\/\/$GITHUB_TOKEN@github.com}

# Pull requests and commits to other branches shouldn't try to deploy
if [ "$TRAVIS_BRANCH" != "$SOURCE_BRANCH" ]; then
    echo "Skipping deploy - Not master branch;"
    exit 0
fi

cp .gitignore $DIST_DIRECTORY || exit 1

echo "Checking out gh-pages branch"
git checkout -B gh-pages || exit 1

echo "Removing old static content"
git rm -rf . || exit 1

echo "Copying dist content to root"
cp -r $DIST_DIRECTORY/* . || exit 1
cp $DIST_DIRECTORY/.gitignore . || exit 1

echo "Pushing new content to $ORIGIN_URL"
git config user.name "hydrock" || exit 1
git config user.email "hydrock74@gmail.com" || exit 1

git add -A . || exit 1
git commit --allow-empty -m "Regenerated static content for $CURRENT_COMMIT" || exit 1
git push --force --quiet "$ORIGIN_URL_WITH_CREDENTIALS" gh-pages > /dev/null 2>&1

echo "Cleaning up temp files"
rm -Rf $DIST_DIRECTORY

echo "Deployed successfully."
exit 0
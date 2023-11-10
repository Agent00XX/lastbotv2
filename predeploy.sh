# remove the version hash from our base javascript file for a stable URL
find build/static/js -name "main.*.js" -exec cp '{}' build/static/js/main.js \;
find build/static/css -name "main.*.css" -exec cp '{}' build/static/css/main.css \;
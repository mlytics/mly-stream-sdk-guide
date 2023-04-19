#!/bin/bash

json_path=./.rdme-deploy/meta.json
mkdir -p dist/docs

jq -c '.[]' $json_path | while read item;
do
    file_path=$(echo "$item" | jq -r '.file_path')
    title=$(echo "$item" | jq -r '.title')
    category=$(echo "$item" | jq -r '.category')
    slug=$(echo "$item" | jq -r '.slug')
    content="---
title: '${title}'
category: ${category}
slug: ${slug}
---"
    echo "$content" | cat - "$file_path" > temp && mv temp dist/docs/$category-$slug.md
done

# for item in $(echo "$json_data" | jq -c '.[]'); do
#     file_path=$(echo "$item" | jq -r '.file_path')
#     title=$(echo "$item" | jq -r '.title')
#     category=$(echo "$item" | jq -r '.category')
#     slug=$(echo "$item" | jq -r '.slug')

#     content="---
# title: '${title}'
# category: ${category}
# slug: ${slug}
# ---"
#     echo "$content" | cat - $file_path > temp && mv temp dist/docs/$category-$slug.md
# done
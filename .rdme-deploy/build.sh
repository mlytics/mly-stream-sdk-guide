#!/bin/bash

json_path=.rdme-deploy/meta.json
output=dist/docs
rm -rf $output
mkdir -p $output

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
    echo "$content" | cat - "$file_path" > temp && mv temp $output/$category-$slug.md
done

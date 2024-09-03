#!/bin/bash

branch_name=$(git symbolic-ref --short HEAD)

if [[ $branch_name =~ ^([0-9]+)- ]]; then
  branch_number=${BASH_REMATCH[1]}
else
  echo "Branch name must starts with issue number, or with 0 if issue does not exist."
  exit 1
fi

commit_message_file=$1
commit_message=$(cat "$commit_message_file")
commit_message_lower=$(echo "$commit_message" | tr '[:upper:]' '[:lower:]')
prefix="(#$branch_number)"

if [[ $commit_message_lower =~ ^"$prefix" ]]; then
  exit 0
else
  new_commit_message="$prefix $commit_message_lower"
  echo "$new_commit_message" > "$commit_message_file"
  echo "Commit message has been updated to: $new_commit_message"
  exit 0
fi
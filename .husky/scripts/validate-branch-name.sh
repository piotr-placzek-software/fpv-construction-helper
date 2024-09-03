#!/bin/bash

branch_name=$(git symbolic-ref --short HEAD)

if [[ $branch_name =~ ^([0-9]+)- ]]; then
  exit 0
else
  echo "Branch name must starts with issue number, or with 0 if issue does not exist."
  exit 1
fi

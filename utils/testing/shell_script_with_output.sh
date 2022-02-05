#!/bin/bash

for i in {1..10}; do
    echo -n Log output Nr. $i
    >&2 echo Error output Nr. $i
    sleep $1
done

exit 1
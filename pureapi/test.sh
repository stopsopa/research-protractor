#!/bin/bash


if [ "$1" = "--help" ]; then

    cat << EOF

# run all and then run only changed (selective)
    /bin/bash $0 --watch

# every time run all
    /bin/bash $0 --watchAll

# run only one or matching test
    /bin/bash $0 test/veg.test.js
    /bin/bash $0 test/*e*.test.js
    /bin/bash $0 "[^a-z]tea"
EOF

    exit 0;
fi

echo -e "\n\n ┌────────────────────────────────────────────────────────────────────┐"
echo -e " │ sequence of checking || running local selenium server before tests │ "
echo -e " └────────────────────────────────────────────────────────────────────┘\n\n"
/bin/bash local_selenium_server_ensure.sh
echo -e "\n ┌────────────────────────────────────────────────────────────────────┐"
echo -e " │ sequence of checking || running local selenium server before tests │ "
echo -e " └────────────────────────────────────────────────────────────────────┘\n\n"

node node_modules/jest/bin/jest.js $@


# Guide:

To run local (on mac) selenium server run (not always necessary if you want to work with remote server):

    cd protractor
    sudo /bin/bash server.sh
    
To stop local server run:    
    
    cd protractor
    sudo /bin/bash server.sh stop
    
To start tests:   
    
    cd protractor
    npm run protractor
    
You can also run single lub "wildcarded" tests like:
    
    cd protractor
    npm run protractor -- --specs ../tests/e2e/angular/calc-many-scenarious.spec.js
    
If you want to run browser.pause(port); in any test then run protractor directly like:
    
    node node_modules/protractor/bin/protractor conf.js "--specs" "../tests/e2e/angular/calc-many-scenarious.spec.js"
    
    
Current issues:
       
   - https://github.com/angular/protractor/issues/4298
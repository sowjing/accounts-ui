Bower is JavaScript dependency manager tool.
It can download required dependencies for your UI application.

Prerequisites:

* Install git for Windows from https://git-scm.com/download/win
* Install bower (globally): npm install -g bower (from any directory)

Setup:

* bower.json - contains name of the app and the list of dependencies and their versions
* After the above is done, type 'bower install' to download all dependencies to <application-root-dir>/bower_components directory
* Update index.html with new path for all dependencies

Extras:

* To install a particular package, use: bower install ng-storage#version --save
* To search for a package use: bower search <package-name> (e.g., bower search ngStorage)
* To lists packages: bower list


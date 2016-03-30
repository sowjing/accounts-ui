This document has steps to set up Karma and Jasmine on a Windows computer.
* Node.js is a Runtime environment for server-side web applications
* Jasmine is a BDD Test Framework for AngularJS application
* Karma is a Test Runner that would run all unit tests


1. Install node.js from nodejs.org (4.4.1 is the latest version)
2. npm install -g karma@0.13.22 (install Karma globally)
3. npm install -g karma-cli (install Karma CLI globally)
4. Go to your Angular project root directory (e.g., C:\Dev\workspace\MyProject)
5. Create a file package.json
6. npm install karma-jasmine karma-chrome-launcher --save-dev
7. Create 'test' directory for your Angular application (where unit tests reside)
8. Create a 'lib' directory (where all angular libraries/dependencies are to be installed)
9. Create a file testCtrl.test.js (a unit test for test controller)
10. Run command: karma init karma.conf.js. Enter default values for all questions except the following:
What is the location of your source and test files ?
You can use glob patterns, eg. "js/*.js" or "test/**/*Spec.js".
Enter empty string to move to the next question.
> WebContent/*.js
> test/*.test.js
11. Next, download all dependent libraries for your app (whatever is listed in index.html)
using the following command (once for each of the dependency)
curl -o lib/angular.js http://ajax.googleapis.com/ajax/libs/angularjs/1.4.8/angular.js
12. Add the following line to package.json so you can use 'npm test' command to run unit tests
  scripts: {
    "test": "karma start karma.conf.js"
  }

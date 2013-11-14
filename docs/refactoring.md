# refactoring notes

The transitioner is performing too many roles. It redirects to the loader if the app is still not loaded.
That should be done by the AppController


## todo
- including fonts
x compass
x .gitignore
- baseView with enter/out
x add new versions of all libraries
- add .editorconfig
- add 404 page to backbone
- .jshintrc (not for the moment. sublimelinter seems to be broken)
- convert to our mvc
     - AppModel still a singleton ?
- unify case, single-quotes, spacing...
x remove node-modules
- remove unneeded createjs
- refactor
- add tweenmax/tweenlite
- split into loader/main modules. that would encourage
	- fast preloader
	- reading current language and other variables that might be needed *before* we set up our app

- gruntfile
     x compass
     x grunt connect
     x remove flash
     - add watch tasks
     - add ability to test dist locally (vagrant?)


- integrate deploy config. for ftp, rsync, amazon...
- test cdn fonts
- jenkins/bamboo

## maybe
- add vagrant?




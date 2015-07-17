## Movie Info

An app which fetches movie info from IMDB, and stores favorites.

Mainly an example project for me to try in a few different new technologies. Currently we have a vanilla JS (ES5) version, an ES5 version that uses some libraries and npm module loading with browserify, and a version that uses ES6 and uses jspm for package management and System.js for module loading, but the main one I'm still working on is the 'React' folder, which also uses jspm.

Later we'll maybe look at webpack, doing the whole thing with Rails, doing it in Clojure/ClojureScript, etc. I know not all of these things lend themselves to this project, but making the same app over and over again is a good way to learn all the things.

To run locally:

1. `cd` to the subfolder containing the version you want to run.

2. `npm install`

3. `jspm install` (if you're in one of the versions that uses jspm)

3a. Special instructions before step 3, temporarily until we make a change to the jspm library: remove the top-level npm dependencies from package.json before running jspm install, then restore them after it runs. Will prevent an error from being thrown.

4. `npm start`

5. Go to `http://localhost:3000` in a browser

### Issues ###

It's currently a work in progress. Among the issues:


- Event listeners pile up on many nodes. Should be only one, high up, listening for everything. Or at least make it so that it doesn't keep piling up event listeners whose elements have been deleted. This is actually happening now.

- Updating of textNodes needs to be something the DOM library does. Don't use innerHTML.

- Passing of errors from server to client, and the client dealing with them, needs to be made a lot more robust.

- There needs to be a way to prevent duplicate favorites from being persisted.

- We need to check the list of favorites when we do searches, so that we can mark them in the display if any of the existing favorites happen to also show up in the search display.

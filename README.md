## WDI Instructor Code Challenge

An app which fetches movie info from IMDB, and stores favorites.

Mainly an example project to try in a few different versions. The first is pure ES5 vanilla JS. Next will be adding a few libraries and client-side dependency and package management. Later we'll try changing to ES6, doing the whole thing with Rails, doing it in Clojure/ClojureScript, etc. I know not all of these things lend themselves to this project, but making the same app over and over again is a good way to learn all the things.

Currently a work in progress. Among the issues:


- needs some comments

- Event listeners pile up on many nodes. Should be only one, high up, listening for everything. Or at least make it so that it doesn't keep piling up event listeners whose elements have been deleted. This is actually happening now.

- Updating of textNodes needs to be something the DOM library does. Don't use innerHTML.

- Passing of errors from server to client, and the client dealing with them, needs to be made a lot more robust.

- There needs to be a way to prevent duplicate favorites from being persisted.

- We need to check the list of favorites when we do searches, so that we can mark them in the display if any of the existing favorites happen to also show up in the search display.

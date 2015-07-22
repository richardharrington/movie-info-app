## Movie Info

An app which fetches movie info from IMDB, and stores favorites.

Mainly an example project for me to try in a few different new technologies: jspm for package management, React for front end organization, js-csp for async, etc.

To run locally:

1. `npm install`

2. `jspm install`

3. `npm start`

### Issues ###

It's currently a work in progress. Among the issues:

- Passing of errors (including timeout errors) from server to client, and the client dealing with them, needs to be made a lot more robust.

- There are no spinners or any kind of messaging during slow dev builds and api calls.
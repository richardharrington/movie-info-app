## Movie Info

An app which fetches movie info from IMDB, and stores favorites.

Mainly an example project for me to try in a few different new technologies: jspm for package management, React for front end organization, js-csp for async, etc.

To run locally:

1. `npm install`

2. `jspm install`

3. `npm start`

### Issues ###

It's currently a work in progress. Among the issues:

- Passing of errors from server to client, and the client dealing with them, needs to be made a lot more robust.

- Display of existing favorites in new searches is buggy, probably because of my lack of understanding of React's `componentWillReceiveProps` lifecycle method.

- No spinners or any kind of messaging during slow dev builds and api calls.
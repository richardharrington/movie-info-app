## WDI Instructor Code Challenge

An app which fetches movie info from IMDB, and stores favorites.

Currently a work in progress. Among the issues:


-- needs some comments

-- needs to have another version written in React (as an exercise).

-- Event listeners pile up on many nodes. Should be only one, high up, listening for everything. Or at least make it so that it doesn't keep piling up event listeners whose elements have been deleted. This is actually happening now.

- Updating of textNodes needs to be something the DOM library does. Don't use innerHTML.

- Passing of errors from server to client, and the client dealing with them, needs to be made a lot more robust.

- There needs to be a way to prevent duplicate favorites from being persisted.

- We need to check the list of favorites when we do searches, so that we can mark them in the display if any of the existing favorites happen to also show up in the search display.
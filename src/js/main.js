import React from 'react';
import Imdb from 'js/services/imdb';
import App from 'js/components/App';

function main() {
  const postersEnabled = Imdb.isImageDownloadEnabled();
  let app = <App postersEnabled={postersEnabled} />
  let appContainer = document.querySelector('.app-container');
  React.render(app, appContainer);
}

export default main;

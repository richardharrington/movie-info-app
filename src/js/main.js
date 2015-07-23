import React from 'react';
import Imdb from 'js/services/imdb';
import App from 'js/components/App';

function main(env) {
  const postersEnabled = Imdb.isImageDownloadEnabled();
  let app = <App postersEnabled={postersEnabled} env={env} />
  let appContainer = document.querySelector('.app-container');
  React.render(app, appContainer);
}

export default main;

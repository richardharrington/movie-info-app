import React from 'react';
import Imdb from 'js/services/imdb';
import App from 'js/components/App';

const main = (env) => {
  const postersEnabled = Imdb.isImageDownloadEnabled();
  const app = <App postersEnabled={postersEnabled} env={env} />
  const appContainer = document.querySelector('.app-container');
  React.render(app, appContainer);
}

export default main;

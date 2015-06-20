import Imdb from 'js/imdb';
import App from 'js/components/App.js!jsx';

import React from 'react';

const main = (env) => {
  const postersEnabled = Imdb.isImageDownloadEnabled();
  const app = <App postersEnabled={postersEnabled} env={env} />
  const appContainer = document.querySelector('.app-container');
  React.render(app, appContainer);
}

export default main;

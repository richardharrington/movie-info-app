import Ajax from 'js/services/ajax';

const fetch = () =>
  new Promise(resolve =>
    Ajax.get('/env').then(response =>
      resolve(response.environment)));

export default { fetch }

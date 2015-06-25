import csp from 'js-csp';
import Ajax from 'js/services/ajax';

const fetch = () =>
  csp.go(function*() {
    const response = yield Ajax.get('/env');
    return response.environment;
  });

export default { fetch }

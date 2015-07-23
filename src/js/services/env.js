import csp from 'js-csp';
import Ajax from 'js/services/ajax';

function fetch() {
  return csp.go(function*() {
    const { environment } = yield Ajax.get('/env');
    return environment;
  });
}

export default { fetch }

import csp from 'js-csp';
import env from 'js/services/env';
import main from 'js/main.js!jsx';

csp.go(function*() {
  main(yield env.fetch());
});

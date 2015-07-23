import csp from 'js-csp';

function isRequestSuccessful(req) {
  return req.status >= 200 && req.status < 400;
}

function reportAjaxError(status, errorText) {
  console.error("" + status + " error: " + errorText);
}

function reportConnectionError() {
  console.error("Error connecting with the server.");
}

function responseHandler(req, outChan) {
  return () => {
    const response = JSON.parse(req.response);
    if (isRequestSuccessful(req)) {
      csp.go(function*() {
        yield csp.put(outChan, response);
        outChan.close();
      });
    }
    else {
      reportAjaxError(req.status, response.error);
    }
  }
}

function jsObjToFormBody(obj) {
  const pairs = Object.keys(obj).map(key => {
    const k = encodeURIComponent(key);
    const v = encodeURIComponent(obj[key]);
    return [k, v].join('=');
  });
  return pairs.join('&');
}

function http(verb, url, data) {
  let outChan = csp.chan();
  let req = new XMLHttpRequest();
  req.open(verb, url, true);
  req.onload = responseHandler(req, outChan);
  req.onerror = reportConnectionError;
  if (data) {
    req.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
    req.send(jsObjToFormBody(data));
  }
  else {
    req.send();
  }
  return outChan;
}

const [get, post, del] = ['GET', 'POST', 'DELETE'].map(verb => http.bind(null, verb));
function getParallel(urls) {
  const {merge, into} = csp.operations;
  let responseChans = urls.map(get);
  return into([], merge(responseChans));
}

export default { get, post, getParallel, delete: del };

import csp from 'js-csp';

const isRequestSuccessful = req => req.status >= 200 && req.status < 400;

const reportAjaxError = (status, errorText) => {
  console.error("" + status + " error: " + errorText);
}

const reportConnectionError = () => {
  console.error("Error connecting with the server.");
}

const responseHandler = (req, outChan) =>
  () => {
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

const jsObjToFormBody = obj => {
  const pairs = Object.keys(obj).map(key => {
    const k = encodeURIComponent(key);
    const v = encodeURIComponent(obj[key]);
    return [k, v].join('=');
  });
  return pairs.join('&');
}

const http = (verb, url, data) => {
  const outChan = csp.chan();
  const req = new XMLHttpRequest();
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
const getParallel = urls => {
  const {merge, into} = csp.operations;
  const responseChans = urls.map(get);
  return into([], merge(responseChans));
}

export default { get, post, getParallel, delete: del };

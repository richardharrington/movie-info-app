const isRequestSuccessful = (req) => (req.status >= 200 && req.status < 400);

const reportAjaxError = (status, errorText) => {
  console.error("" + status + " error: " + errorText);
}

const reportConnectionError = () => {
  console.error("Error connecting with the server.");
}

const responseHandler = (req, callback) =>
  () => {
    const response = JSON.parse(req.response);
    if (isRequestSuccessful(req)) {
      callback(response);
    }
    else {
      reportAjaxError(req.status, response.error);
    }
  }

const jsObjToFormBody = (obj) => {
  const pairs = Object.keys(obj).map((key) => {
    const k = encodeURIComponent(key);
    const v = encodeURIComponent(obj[key]);
    return [k, v].join('=');
  });
  return pairs.join('&');
}

const http = (verb, route, data) =>
  new Promise((resolve, reject) => {
    const req = new XMLHttpRequest();
    req.open(verb, route, true);
    req.onload = responseHandler(req, resolve);
    req.onerror = reportConnectionError;
    if (data) {
      req.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
      req.send(jsObjToFormBody(data));
    }
    else {
      req.send();
    }
  });

const get = (route) => http('GET', route);

const post = (route, data) => http('POST', route, data);

const parallelGet = (routes) => Promise.all(routes.map(get));

export default { get, post, parallelGet };

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

const jsObjToPostBody = (obj) => {
  const pairs = Object.keys(obj).map((key) => {
    const k = encodeURIComponent(key);
    const v = encodeURIComponent(obj[key]);
    return [k, v].join('=');
  });
  return pairs.join('&');
}

const get = (route) =>
  new Promise((resolve, reject) => {
    const req = new XMLHttpRequest();
    req.open('GET', route, true);
    req.onload = responseHandler(req, resolve);
    req.onerror = reportConnectionError;
    req.send();
  });

const parallelGet = (routes) =>
  new Promise((resolve, reject) => {
    let counter = routes.length;
    let responses = [];
    routes.forEach((route) => {
      get(route).then((response) => {
        responses.push(response);
        counter--;
        if (counter === 0) {
          resolve(responses);
        }
      });
    });
  });

const post = (route, data) =>
  // doesn't quite need to be a promise yet because
  // we're not doing anything with the results,
  // but this is for consistency.
  new Promise((resolve, reject) => {
    const req = new XMLHttpRequest();
    req.open('POST', route, true);
    req.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
    req.onload = responseHandler(req, resolve);
    req.onerror = reportConnectionError;

    req.send(jsObjToPostBody(data));
  });

export default { get, parallelGet, post };

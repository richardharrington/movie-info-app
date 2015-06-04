window.Ajax = (function() {

  function isRequestSuccessful(req) {
    return req.status >= 200 && req.status < 400;
  }

  function reportAjaxError(status, errorText) {
    console.error("" + status + " error: " + errorText);
  }

  function reportConnectionError() {
    console.error("Error connecting with the server.");
  }

  function responseHandler(req, callback) {
    return function() {
      var response = JSON.parse(req.response);
      if (isRequestSuccessful(req)) {
        callback(response);
      }
      else {
        reportAjaxError(req.status, response.error);
      }
    }
  }

  function jsObjToPostBody(obj) {
    var pairs = Object.keys(obj).map(function(key) {
      return key + '=' + obj[key];
    });
    return pairs.join('&');
  }

  function get(route, callback) {
    var req = new XMLHttpRequest();
    req.open('GET', route, true);
    req.onload = responseHandler(req, callback);
    req.onerror = reportConnectionError;
    req.send();
  }

  function post(route, data, callback) {
    var req = new XMLHttpRequest();
    req.open('POST', route, true);
    req.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
    req.onload = responseHandler(req, function(response) {
      console.log("Post response successful. response:");
      console.dir(response);
    });
    req.onerror = reportConnectionError;

    req.send(jsObjToPostBody(data));
  }

  return {
    get: get,
    post: post
  };

})();


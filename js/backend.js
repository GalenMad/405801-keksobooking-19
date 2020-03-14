'use strict';

(function () {

  function throwError(message) {
    throw new Error(message);
  }

  function sendXHR(method, url, onError, onSuccess, data) {
    var xhr = new XMLHttpRequest();
    xhr.timeout = 10000;
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        onSuccess(xhr.response);
        console.log(xhr.response);
      } else {
        onError('Произошла ошибка: ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });

    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + (xhr.timeout / 1000) + 'с');
    });

    xhr.open(method, url);
    xhr.send(data);
  }

  window.backend = {

    load: function (onSuccess) {
      var URL = 'https://js.dump.academy/keksobooking/data';
      sendXHR('GET', URL, throwError, onSuccess);
    },

    upload: function (data, onError, onSuccess) {
      var URL = 'https://js.dump.academy/keksobooking';
      sendXHR('POST', URL, onError, onSuccess, data);
    }

  };

})();

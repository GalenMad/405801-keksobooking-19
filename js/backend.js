'use strict';

(function () {
  var URL = 'https://js.dump.academy/keksobooking/data';
  var errorElementTemplate = document.querySelector('#error').content.querySelector('.error');

  function onSuccess(response) {
    window.insertAdPins(response);
  }

  function onError(message) {
    var errorElement = errorElementTemplate.cloneNode(true);
    var errorMessage = errorElement.querySelector('.error__message');
    var errorButton = errorElement.querySelector('.error__button');
    errorMessage.textContent = message;
    errorButton.setAttribute('tabindex', '2');

    function onErrorButtonClick() {
      errorElement.remove();
      errorButton.removeEventListener('click', onErrorButtonClick);
      window.backend.load();
    }

    errorButton.addEventListener('click', onErrorButtonClick);
    document.body.append(errorElement);
  }

  window.backend = {
    load: function () {
      var xhr = new XMLHttpRequest();
      xhr.timeout = 10000;
      xhr.responseType = 'json';

      xhr.addEventListener('load', function () {
        if (xhr.status === 200) {
          onSuccess(xhr.response);
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

      xhr.open('GET', URL);
      xhr.send();
    }
  };
})();

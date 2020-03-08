'use strict';

(function () {
  var ENTER_KEY = 'Enter';
  var map = document.querySelector('.map');
  var mainPin = map.querySelector('.map__pin--main');

  function activatePage(evt) {
    if (evt.button === 0 || evt.key === ENTER_KEY) {
      map.classList.remove('map--faded');
      window.activateForm();
      window.backend.load();
      mainPin.removeEventListener('mousedown', activatePage);
      mainPin.removeEventListener('keydown', activatePage);
    }
  }

  mainPin.addEventListener('mousedown', activatePage);
  mainPin.addEventListener('keydown', activatePage);
})();

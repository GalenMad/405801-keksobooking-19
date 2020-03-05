'use strict';

(function () {
  var ENTER_KEY = 'Enter';
  var map = document.querySelector('.map');
  var mainPin = map.querySelector('.map__pin--main');

  function activateMap() {
    map.classList.remove('map--faded');
  }

  function activatePage(evt) {
    if (evt.button === 0 || evt.key === ENTER_KEY) {
      activateMap();
      window.activateForm();
      window.insertAdPins();
      mainPin.removeEventListener('mousedown', activatePage);
      mainPin.removeEventListener('keydown', activatePage);
    }
  }

  mainPin.addEventListener('mousedown', activatePage);
  mainPin.addEventListener('keydown', activatePage);
})();

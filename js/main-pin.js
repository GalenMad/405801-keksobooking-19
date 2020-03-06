'use strict';
(function () {
  var COORDINATE_CORRECTION_X = 32;
  var COORDINATE_CORRECTION_Y = 82;
  var map = document.querySelector('.map');
  var mainPin = map.querySelector('.map__pin--main');
  var form = document.querySelector('.ad-form');
  var addressInput = form.querySelector('#address');

  function setMainPinCoordinates() {
    var coordinateX = Math.round(Number(mainPin.style.left.slice(0, -2)) + COORDINATE_CORRECTION_X);
    var coordinateY = Math.round(Number(mainPin.style.top.slice(0, -2)) + COORDINATE_CORRECTION_Y);
    addressInput.value = coordinateX + ', ' + coordinateY;
  }

  mainPin.addEventListener('mousedown', function (evt) {
    if (evt.button === 0) {
      evt.preventDefault();
      setMainPinCoordinates();
      var startCoords = {
        x: evt.clientX,
        y: evt.clientY
      };

      var onMouseMove = function (moveEvt) {
        moveEvt.preventDefault();
        var shift = {
          x: startCoords.x - moveEvt.clientX,
          y: startCoords.y - moveEvt.clientY
        };

        startCoords = {
          x: moveEvt.clientX,
          y: moveEvt.clientY
        };

        mainPin.style.top = (mainPin.offsetTop - shift.y) + 'px';
        mainPin.style.left = (mainPin.offsetLeft - shift.x) + 'px';
      };

      var onMouseUp = function (upEvt) {
        upEvt.preventDefault();
        setMainPinCoordinates();
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
      };

      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
    }
  });

  setMainPinCoordinates();
})();

'use strict';

(function () {
  var COORDINATE_CORRECTION_X = 32;
  var COORDINATE_CORRECTION_Y = 84;
  var COORDINATES_RANGE_X = [(0 - COORDINATE_CORRECTION_X), (1200 - COORDINATE_CORRECTION_X)];
  var COORDINATES_RANGE_Y = [(130 - COORDINATE_CORRECTION_Y), (630 - COORDINATE_CORRECTION_Y)];
  var map = document.querySelector('.map');
  var mainPin = map.querySelector('.map__pin--main');
  var form = document.querySelector('.ad-form');
  var addressInput = form.querySelector('#address');
  mainPin.setAttribute('tabindex', '1');

  function setCoordinates() {
    var coordinateX = Math.round(Number(mainPin.style.left.slice(0, -2)) + COORDINATE_CORRECTION_X);
    var coordinateY = Math.round(Number(mainPin.style.top.slice(0, -2)) + COORDINATE_CORRECTION_Y);
    addressInput.value = coordinateX + ', ' + coordinateY;
  }

  function moveMainPin(evt) {
    evt.preventDefault();
    var start = {
      x: evt.clientX,
      y: evt.clientY
    };

    function onMouseMove(moveEvt) {
      moveEvt.preventDefault();
      var shift = {
        x: start.x - moveEvt.clientX,
        y: start.y - moveEvt.clientY
      };

      start = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      function getFinishCoords(axis) {
        var axisShift;
        var range;
        var offset;
        if (axis === 'x') {
          axisShift = shift.x;
          range = COORDINATES_RANGE_X;
          offset = mainPin.offsetLeft;
        } else {
          axisShift = shift.y;
          range = COORDINATES_RANGE_Y;
          offset = mainPin.offsetTop;
        }
        if (offset - axisShift < range[0]) {
          return range[0];
        } else if (offset - axisShift > range[1]) {
          return range[1];
        } else {
          return offset - axisShift;
        }
      }

      mainPin.style.left = (getFinishCoords('x')) + 'px';
      mainPin.style.top = (getFinishCoords('y')) + 'px';
    }

    function onMouseUp(upEvt) {
      upEvt.preventDefault();
      setCoordinates();
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    }

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  }

  mainPin.addEventListener('mousedown', function (evt) {
    if (evt.button === 0) {
      moveMainPin(evt);
    }
  });

  window.mainPin = {
    resetCoordinates: function () {
      mainPin.style.left = '570px';
      mainPin.style.top = '375px';
      setCoordinates();
    }
  };

  setCoordinates();
})();

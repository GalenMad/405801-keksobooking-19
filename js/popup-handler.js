'use strict';

(function () {
  var ENTER_KEY = 'Enter';
  var ESC_KEY = 'Escape';

  window.handlerPopup = function (element, isButton, callback) {
    function onPopupClick(evt) {
      if (evt.button === 0 || evt.key === ENTER_KEY) {
        closePopup();
      }
    }

    function closePopup() {
      if (isButton) {
        element.parentElement.remove();
        callback();
      } else {
        element.remove();
      }
      document.removeEventListener('keydown', onEscPress);
    }

    function onEscPress(evt) {
      if (evt.key === ESC_KEY) {
        closePopup();
      }
    }

    document.addEventListener('keydown', onEscPress);
    element.addEventListener('click', onPopupClick);
  };
})();

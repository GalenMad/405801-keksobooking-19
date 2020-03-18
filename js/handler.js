'use strict';

(function () {
  var ENTER_KEY = 'Enter';
  var ESC_KEY = 'Escape';

  function setCheckboxesFieldsetHandler(fieldset) {
    fieldset.forEach(function (input) {
      input.addEventListener('keypress', function (evt) {
        evt.preventDefault();
        if (evt.key === ENTER_KEY) {
          evt.target.click();
        }
      });
    });
  }

  function setPopupHandler(element, isButton, callback) {
    function onPopupCloseElementClick(evt) {
      if (evt.button === 0) {
        closePopup();
      }
    }

    function onPopupEnterPress(evt) {
      if (evt.key === ENTER_KEY) {
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
    element.addEventListener('click', onPopupCloseElementClick);
    element.addEventListener('keypress', onPopupEnterPress);
  }

  window.handler = {
    checkboxesFieldset: setCheckboxesFieldsetHandler,
    popup: setPopupHandler
  };
})();

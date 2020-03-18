'use strict';

(function () {
  var ENTER_KEY = 'Enter';
  var form = document.querySelector('.ad-form');
  var formReset = document.querySelector('.ad-form__reset');
  var formFieldsets = form.querySelectorAll('fieldset');
  var errorTemplate = document.querySelector('#error').content.querySelector('.error');
  var successTemplate = document.querySelector('#success').content.querySelector('.success');
  var mainContent = document.querySelector('main');
  var map = document.querySelector('.map');
  var mainPin = map.querySelector('.map__pin--main');
  var filterForm = document.querySelector('.map__filters');
  var filterFormFieldsets = filterForm.querySelectorAll('.map__filters > *');

  function onSuccessLoad(response) {
    window.ads = response;
    window.pin.insert(window.filter.trimByMax(response));
    activateMapFilterForm();
  }

  function onErrorSend(message) {
    var errorElement = errorTemplate.cloneNode(true);
    var errorMessage = errorElement.querySelector('.error__message');
    errorMessage.textContent = message;

    window.handlerPopup(errorElement);
    mainContent.append(errorElement);
  }

  function onSuccessSend() {
    var successElement = successTemplate.cloneNode(true);
    window.handlerPopup(successElement);
    mainContent.append(successElement);
    deactivatePage();
  }

  function onFormSubmit(evt) {
    evt.preventDefault();
    window.backend.upload(new FormData(form), onErrorSend, onSuccessSend);
  }

  function onFormResetClick(evt) {
    evt.preventDefault();
    deactivatePage();
  }

  function deactivateMapFilterForm() {
    filterForm.reset();
    changeFieldsetsAble(filterFormFieldsets, 'set');
  }

  function activateMapFilterForm() {
    changeFieldsetsAble(filterFormFieldsets, 'remove');
  }

  function changeFieldsetsAble(target, able) {
    target.forEach(function (item) {
      item[able + 'Attribute']('disabled', 'disabled');
    });
  }

  function deactivateForm() {
    changeFieldsetsAble(formFieldsets, 'set');
    form.classList.add('ad-form--disabled');
    form.reset();
  }

  function activateForm() {
    changeFieldsetsAble(formFieldsets, 'remove');
    form.classList.remove('ad-form--disabled');
  }

  function activatePage(evt) {
    if (evt.button === 0 || evt.key === ENTER_KEY) {
      activateForm();
      window.backend.load(onSuccessLoad);
      map.classList.remove('map--faded');
      mainPin.removeEventListener('mousedown', activatePage);
      mainPin.removeEventListener('keydown', activatePage);
    }
  }

  function deactivatePage() {
    deactivateForm();
    deactivateMapFilterForm();
    window.pin.remove();
    window.mainPin.resetCoordinates();
    map.classList.add('map--faded');
    mainPin.addEventListener('mousedown', activatePage);
    mainPin.addEventListener('keydown', activatePage);
  }

  form.addEventListener('submit', onFormSubmit);
  formReset.addEventListener('click', onFormResetClick);
  mainPin.addEventListener('mousedown', activatePage);
  mainPin.addEventListener('keydown', activatePage);
  deactivateForm();
  deactivateMapFilterForm();
})();

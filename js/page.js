'use strict';

(function () {
  var ENTER_KEY = 'Enter';
  var LEFT_MOUSE_BUTTON_CODE = 0;
  var DEFAULT_BUTTON_TITLE = 'Опубликовать';
  var PROCESSED_BUTTON_TITLE = 'Отправляем…';
  var DEFAULT_AVATAR_SRC = 'img/muffin-grey.svg';
  var form = document.querySelector('.ad-form');
  var formReset = form.querySelector('.ad-form__reset');
  var formSubmit = form.querySelector('.ad-form__submit');
  var formFieldsets = form.querySelectorAll('fieldset');
  var formFeaturesFieldset = form.querySelector('.ad-form__element.features').querySelectorAll('input');
  var previewAvatar = form.querySelector('.ad-form-header__preview img');
  var previewImages = form.querySelector('.ad-form__photo');
  var errorTemplate = document.querySelector('#error').content.querySelector('.error');
  var successTemplate = document.querySelector('#success').content.querySelector('.success');
  var mainContent = document.querySelector('main');
  var map = mainContent.querySelector('.map');
  var mainPin = map.querySelector('.map__pin--main');
  var filterForm = map.querySelector('.map__filters');
  var filterFormFieldsets = filterForm.querySelectorAll('.map__filters > *');

  function enableSubmitButton() {
    formSubmit.removeAttribute('disabled');
    formSubmit.textContent = DEFAULT_BUTTON_TITLE;
  }

  function disableSubmitButton() {
    formSubmit.setAttribute('disabled', 'disabled');
    formSubmit.textContent = PROCESSED_BUTTON_TITLE;
  }

  function onSuccessLoad(response) {
    window.ads = response;
    var ads = window.filter.trim(response);
    window.pin.insert(ads);
    activateMapFilterForm();
  }

  function onErrorSend(message) {
    var errorElement = errorTemplate.cloneNode(true);
    var errorMessage = errorElement.querySelector('.error__message');
    errorMessage.textContent = message;
    enableSubmitButton();
    window.handler.popup(errorElement);
    mainContent.append(errorElement);
  }

  function onSuccessSend() {
    var successElement = successTemplate.cloneNode(true);
    window.handler.popup(successElement);
    mainContent.append(successElement);
    enableSubmitButton();
    deactivatePage();
  }

  function onFormSubmit(evt) {
    evt.preventDefault();
    disableSubmitButton();
    window.backend.upload(new FormData(form), onErrorSend, onSuccessSend);
  }

  function onFormResetClick(evt) {
    evt.preventDefault();
    deactivatePage();
  }

  function clearInputPreviews() {
    previewAvatar.src = DEFAULT_AVATAR_SRC;
    previewImages.innerHTML = '';
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
    clearInputPreviews();
    form.classList.add('ad-form--disabled');
    form.reset();
    window.validation.activate();
  }

  function activateForm() {
    changeFieldsetsAble(formFieldsets, 'remove');
    form.classList.remove('ad-form--disabled');
  }

  function activatePage() {
    activateForm();
    window.backend.load(onSuccessLoad);
    map.classList.remove('map--faded');
    mainPin.removeEventListener('mousedown', onMainPinMousedown);
    mainPin.removeEventListener('keypress', onMainPinKeydown);
  }

  function onMainPinKeydown(evt) {
    if (evt.key === ENTER_KEY) {
      activatePage();
    }
  }

  function onMainPinMousedown(evt) {
    if (evt.button === LEFT_MOUSE_BUTTON_CODE) {
      activatePage();
    }
  }

  function deactivatePage() {
    deactivateForm();
    deactivateMapFilterForm();
    window.pin.remove();
    window.mainPin.resetCoordinates();
    map.classList.add('map--faded');
    mainPin.addEventListener('mousedown', onMainPinMousedown);
    mainPin.addEventListener('keypress', onMainPinKeydown);
  }

  form.addEventListener('submit', onFormSubmit);
  formReset.addEventListener('click', onFormResetClick);
  window.handler.checkboxesFieldset(formFeaturesFieldset);
  mainPin.addEventListener('mousedown', onMainPinMousedown);
  mainPin.addEventListener('keypress', onMainPinKeydown);
  deactivateForm();
  deactivateMapFilterForm();
})();

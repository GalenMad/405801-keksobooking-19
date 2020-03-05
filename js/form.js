'use strict';

(function () {
  var COORDINATE_CORRECTION_X = 32.5;
  var COORDINATE_CORRECTION_Y = 75;
  var map = document.querySelector('.map');
  var mainPin = map.querySelector('.map__pin--main');
  var form = document.querySelector('.ad-form');
  var formFieldsets = form.querySelectorAll('fieldset');

  function activateValidation() {
    var addressInput = form.querySelector('#address');
    var roomNumberInput = form.querySelector('#room_number');
    var capacityInput = form.querySelector('#capacity');
    var titleInput = form.querySelector('#title');
    var typeInput = form.querySelector('#type');
    var priceInput = form.querySelector('#price');
    var timeinInput = form.querySelector('#timein');
    var timeoutInput = form.querySelector('#timeout');
    var avatarInput = form.querySelector('#avatar');
    var imagesInput = form.querySelector('#images');

    var validObj = {
      title: {
        minLength: 30,
        maxLength: 100,
        short: function (currentValue) {
          return 'Заголовок объявления должен содержать не менее ' + this.minLength + ' символов, сейчас ' + currentValue;
        },
        long: function (currentValue) {
          return 'Заголовок объявления должен содержать не более ' + this.maxLength + ' символов, сейчас ' + currentValue;
        },
        empty: 'Заголовок объявления не может быть пустым',
        valid: ''
      },
      price: {
        empty: 'Введите цену',
        max: 1000000,
        maxMessage: 'Цена не может быть больше миллиона',
        valid: '',
        bungalo: {
          min: 0,
          message: 'Цена за «Бунгало» не может быть меньше нуля'
        },
        flat: {
          min: 1000,
          message: 'Цена за «Квартиру» не может быть меньше тысячи'
        },
        house: {
          min: 5000,
          message: 'Цена за «Дом» не может быть меньше пяти тысяч'
        },
        palace: {
          min: 10000,
          message: 'Цена за «Дворец» не может быть меньше десяти тысяч'
        }
      },
      capacity: {
        roomsLack: 'Для каждого гостя необходимо не менее одной комнаты',
        notIndicated: 'Укажите количество гостей',
        roomsMismatch: '100 комнат не для гостей',
        valid: ''
      },
      upload: {
        attribute: 'accept',
        value: 'image/*'
      }
    };

    function validationOfferTitle(p) {

      titleInput.setAttribute('required', 'required');

      function validation() {
        if (titleInput.validity.valueMissing) {
          titleInput.setCustomValidity(p.empty);
        } else if (titleInput.value.length < p.minLength) {
          titleInput.setCustomValidity(p.short(titleInput.value.length));
        } else if (titleInput.value.length > p.maxLength) {
          titleInput.setCustomValidity(p.long(titleInput.value.length));
        } else {
          titleInput.setCustomValidity(p.valid);
        }
      }

      validation();
      titleInput.addEventListener('input', validation);
    }

    function validationOfferType(p) {

      function validation() {
        priceInput.placeholder = p[typeInput.value].min;
      }

      validation();
      typeInput.addEventListener('input', validation);
    }

    function validationOfferCapacity(p) {

      function validation() {
        if (Number(roomNumberInput.value) === 100 && Number(capacityInput.value) !== 0) {
          capacityInput.setCustomValidity(p.roomsMismatch);
        } else if (Number(roomNumberInput.value) !== 100 && Number(capacityInput.value) === 0) {
          capacityInput.setCustomValidity(p.notIndicated);
        } else if (Number(capacityInput.value) > Number(roomNumberInput.value)) {
          capacityInput.setCustomValidity(p.roomsLack);
        } else {
          capacityInput.setCustomValidity(p.valid);
        }
      }

      validation();
      roomNumberInput.addEventListener('input', validation);
      capacityInput.addEventListener('input', validation);
    }

    function validationOfferPrice(p) {

      priceInput.setAttribute('required', 'required');
      priceInput.setAttribute('max', p.max);

      function validation() {
        if (priceInput.validity.valueMissing) {
          priceInput.setCustomValidity(p.empty);
        } else if (p[typeInput.value].min > (+priceInput.value)) {
          priceInput.setCustomValidity(p[typeInput.value].message);
        } else if ((+priceInput.value) > p.max) {
          priceInput.setCustomValidity(p.maxMessage);
        } else {
          priceInput.setCustomValidity(p.valid);
        }
      }

      validation();
      priceInput.addEventListener('input', validation);
      typeInput.addEventListener('input', validation);
    }

    function validationImageInputs(p) {
      avatarInput.setAttribute(p.attribute, p.value);
      imagesInput.setAttribute(p.attribute, p.value);
    }

    function validationOfferAddress() {
      addressInput.setAttribute('readonly', 'readonly');
    }

    function validationOfferTiming() {
      timeoutInput.addEventListener('input', function () {
        timeinInput.value = timeoutInput.value;
      });
      timeinInput.addEventListener('input', function () {
        timeoutInput.value = timeinInput.value;
      });
    }

    validationOfferTitle(validObj.title);
    validationOfferType(validObj.price);
    validationOfferCapacity(validObj.capacity);
    validationOfferPrice(validObj.price);
    validationImageInputs(validObj.upload);
    validationOfferAddress();
    validationOfferTiming();
  }

  function setMainPinCoordinates() {
    var coordinateX = Math.round(Number(mainPin.style.left.slice(0, -2)) + COORDINATE_CORRECTION_X);
    var coordinateY = Math.round(Number(mainPin.style.top.slice(0, -2)) + COORDINATE_CORRECTION_Y);
    form.querySelector('#address').value = coordinateX + ', ' + coordinateY;
  }

  function deactivateForm() {
    for (var i = formFieldsets.length - 1; i > 0; i--) {
      formFieldsets[i].setAttribute('disabled', 'disabled');
    }
    form.classList.add('ad-form--disabled');
  }

  window.activateForm = function () {
    for (var i = formFieldsets.length - 1; i > 0; i--) {
      formFieldsets[i].removeAttribute('disabled');
    }
    form.classList.remove('ad-form--disabled');
    activateValidation();
    setMainPinCoordinates();
    mainPin.addEventListener('mousedown', function (evt) {
      if (evt.button === 0) {
        setMainPinCoordinates();
      }
    });
  };

  deactivateForm();
  setMainPinCoordinates();
})();

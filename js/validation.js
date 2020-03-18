'use strict';

(function () {
  var form = document.querySelector('.ad-form');
  var addressInput = form.querySelector('#address');
  var roomNumberInput = form.querySelector('#room_number');
  var capacityInput = form.querySelector('#capacity');
  var titleInput = form.querySelector('#title');
  var typeInput = form.querySelector('#type');
  var priceInput = form.querySelector('#price');
  var timeInInput = form.querySelector('#timein');
  var timeOutInput = form.querySelector('#timeout');
  var avatarInput = form.querySelector('#avatar');
  var imagesInput = form.querySelector('#images');

  var validationList = {
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

  (function () {
    var parameter = validationList.title;

    function validation() {
      if (titleInput.validity.valueMissing) {
        titleInput.setCustomValidity(parameter.empty);
      } else if (titleInput.value.length < parameter.minLength) {
        titleInput.setCustomValidity(parameter.short(titleInput.value.length));
      } else if (titleInput.value.length > parameter.maxLength) {
        titleInput.setCustomValidity(parameter.long(titleInput.value.length));
      } else {
        titleInput.setCustomValidity(parameter.valid);
      }
    }

    validation();
    titleInput.addEventListener('input', validation);
  })();

  (function () {
    var parameter = validationList.price;

    function validation() {
      priceInput.placeholder = parameter[typeInput.value].min;
    }

    validation();
    typeInput.addEventListener('input', validation);
  })();

  (function () {
    var parameter = validationList.capacity;

    function validation() {
      if (Number(roomNumberInput.value) === 100 && Number(capacityInput.value) !== 0) {
        capacityInput.setCustomValidity(parameter.roomsMismatch);
      } else if (Number(roomNumberInput.value) !== 100 && Number(capacityInput.value) === 0) {
        capacityInput.setCustomValidity(parameter.notIndicated);
      } else if (Number(capacityInput.value) > Number(roomNumberInput.value)) {
        capacityInput.setCustomValidity(parameter.roomsLack);
      } else {
        capacityInput.setCustomValidity(parameter.valid);
      }
    }

    validation();
    roomNumberInput.addEventListener('input', validation);
    capacityInput.addEventListener('input', validation);
  })();

  (function () {
    var parameter = validationList.price;
    priceInput.setAttribute('max', parameter.max);

    function validation() {
      if (priceInput.validity.valueMissing) {
        priceInput.setCustomValidity(parameter.empty);
      } else if (parameter[typeInput.value].min > (+priceInput.value)) {
        priceInput.setCustomValidity(parameter[typeInput.value].message);
      } else if ((+priceInput.value) > parameter.max) {
        priceInput.setCustomValidity(parameter.maxMessage);
      } else {
        priceInput.setCustomValidity(parameter.valid);
      }
    }

    validation();
    priceInput.addEventListener('input', validation);
    typeInput.addEventListener('input', validation);
  })();

  (function () {
    var parameter = validationList.upload;
    avatarInput.setAttribute(parameter.attribute, parameter.value);
    imagesInput.setAttribute(parameter.attribute, parameter.value);
  })();

  addressInput.setAttribute('readonly', 'readonly');
  titleInput.setAttribute('required', 'required');
  priceInput.setAttribute('required', 'required');

  timeOutInput.addEventListener('input', function () {
    timeInInput.value = timeOutInput.value;
  });

  timeInInput.addEventListener('input', function () {
    timeOutInput.value = timeInInput.value;
  });
})();

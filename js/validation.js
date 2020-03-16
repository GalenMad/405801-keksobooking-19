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
    var p = validationList.title;

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
  })();

  (function () {
    var p = validationList.price;

    function validation() {
      priceInput.placeholder = p[typeInput.value].min;
    }

    validation();
    typeInput.addEventListener('input', validation);
  })();

  (function () {
    var p = validationList.capacity;

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
  })();

  (function () {
    var p = validationList.price;
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
  })();

  (function () {
    var p = validationList.upload;
    avatarInput.setAttribute(p.attribute, p.value);
    imagesInput.setAttribute(p.attribute, p.value);
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

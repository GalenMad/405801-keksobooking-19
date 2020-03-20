'use strict';

(function () {
  var form = document.querySelector('.ad-form');
  var titleInput = form.querySelector('#title');
  var priceInput = form.querySelector('#price');
  var typeInput = form.querySelector('#type');
  var addressInput = form.querySelector('#address');
  var roomInput = form.querySelector('#room_number');
  var capacityInput = form.querySelector('#capacity');
  var timeInInput = form.querySelector('#timein');
  var timeOutInput = form.querySelector('#timeout');
  var avatarInput = form.querySelector('#avatar');
  var imagesInput = form.querySelector('#images');

  var TitleLength = {
    MIN: 30,
    MAX: 100,
  };

  var typePricesMap = {
    limit: {
      max: 1000000,
      message: 'Цена не может быть больше миллиона',
    },
    bungalo: {
      min: 0,
      message: 'Цена за бунгало не может быть меньше или равной нулю'
    },
    flat: {
      min: 1000,
      message: 'Цена за квартиру не может быть меньше тысячи рублей'
    },
    house: {
      min: 5000,
      message: 'Цена за дом не может быть меньше пяти тысяч рублей'
    },
    palace: {
      min: 10000,
      message: 'Цена за дворец не может быть меньше десяти тысяч рублей'
    },
  };

  function titleValidation() {
    var length = titleInput.value.length;
    var message = '';
    if (titleInput.validity.valueMissing) {
      message = 'Введите заголовок предложения';
    } else if (length < TitleLength.MIN) {
      message = 'Заголовок объявления должен содержать не менее ' + TitleLength.MIN + ' символов, сейчас ' + length;
    } else if (length > TitleLength.MAX) {
      message = 'Заголовок объявления должен содержать не более ' + TitleLength.MAX + ' символов, сейчас ' + length;
    }
    titleInput.setCustomValidity(message);
  }

  function priceValidation() {
    var price = Number(priceInput.value);
    var type = typeInput.value;
    var message = '';
    if (priceInput.validity.valueMissing) {
      message = 'Введите цену предложения';
    } else if (price < typePricesMap[type].min) {
      message = typePricesMap[type].message;
    } else if (price > typePricesMap.limit.max) {
      message = typePricesMap.limit.message;
    }
    priceInput.setCustomValidity(message);
  }

  function typeValidation() {
    var type = typeInput.value;
    priceInput.placeholder = typePricesMap[type].min;
  }

  function capacityValidation() {
    var roomsCount = Number(roomInput.value);
    var guestsCount = Number(capacityInput.value);
    var message = '';
    if (roomsCount === 100 && guestsCount !== 0) {
      message = '100 комнат не для гостей';
    } else if (roomsCount !== 100 && guestsCount === 0) {
      message = 'Укажите количество гостей';
    } else if (guestsCount > roomsCount) {
      message = 'Для каждого гостя необходимо не менее одной комнаты';
    }
    capacityInput.setCustomValidity(message);
  }

  function timeOutValidation() {
    timeInInput.value = timeOutInput.value;
  }

  function timeInValidation() {
    timeOutInput.value = timeInInput.value;
  }

  addressInput.setAttribute('readonly', 'readonly');
  titleInput.setAttribute('required', 'required');
  priceInput.setAttribute('required', 'required');
  avatarInput.setAttribute('accept', 'image/*');
  imagesInput.setAttribute('accept', 'image/*');
  priceInput.setAttribute('max', typePricesMap.limit.max);
  titleInput.addEventListener('input', titleValidation);
  priceInput.addEventListener('input', priceValidation);
  capacityInput.addEventListener('input', capacityValidation);
  roomInput.addEventListener('input', capacityValidation);
  timeOutInput.addEventListener('input', timeOutValidation);
  timeInInput.addEventListener('input', timeInValidation);
  typeInput.addEventListener('input', function () {
    typeValidation();
    priceValidation();
  });

  window.validation = {
    activate: function () {
      titleValidation();
      priceValidation();
      typeValidation();
      capacityValidation();
      timeOutValidation();
      timeInValidation();
    }
  };
})();

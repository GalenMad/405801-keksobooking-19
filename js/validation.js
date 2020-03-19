'use strict';

(function () {
  var form = document.querySelector('.ad-form');
  var addressInput = form.querySelector('#address');
  var roomNumberInput = form.querySelector('#room_number');
  var capacityInput = form.querySelector('#capacity');
  // var titleInput = form.querySelector('#title');
  // var typeInput = form.querySelector('#type');
  // var priceInput = form.querySelector('#price');
  var timeInInput = form.querySelector('#timein');
  var timeOutInput = form.querySelector('#timeout');
  var avatarInput = form.querySelector('#avatar');
  var imagesInput = form.querySelector('#images');

  var validationList = {
    title: {
      element: form.querySelector('#title'),
      LengthRange: {
        MIN: 30,
        MAX: 100,
      },
      short: function (currentValue) {
        return 'Заголовок объявления должен содержать не менее ' + this.LengthRange.MIN + ' символов, сейчас ' + currentValue;
      },
      long: function (currentValue) {
        return 'Заголовок объявления должен содержать не более ' + this.LengthRange.MAX + ' символов, сейчас ' + currentValue;
      },
      validation: function () {
        var message = '';
        var length = this.element.value.length;
        if (length < this.LengthRange.MIN) {
          message = this.short(length);
        } else if (length > this.LengthRange.MAX) {
          message = this.long(length);
        }
        this.element.setCustomValidity(message);
      }
    },
    price: {
      element: form.querySelector('#price'),
      offerType: form.querySelector('#type'),
      priceRangeMap: {
        max: 1000000,
        maxMessage: 'Цена не может быть больше миллиона',
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
        },
      },
      validation: function () {
        var message = '';
        var currentPrice = Number(this.element.value);
        var currentType = this.offerType.value;
        if (currentPrice < this.priceRangeMap[currentType].min) {
          message = this.priceRangeMap[currentType].message;
        } else if (currentPrice > this.priceRangeMap.max) {
          message = this.priceRangeMap.maxMessage;
        }
        this.element.setCustomValidity(message);
      }
    },
    capacity: {
      roomsLack: 'Для каждого гостя необходимо не менее одной комнаты',
      notIndicated: 'Укажите количество гостей',
      roomsMismatch: '100 комнат не для гостей',
      validation: function () {
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
    },
    // upload: {
    //   attribute: 'accept',
    //   value: 'image/*'
    // }
  };

  function setListeners() {
    var list = Object.values(validationList);
    list.forEach(function (item) {
      item.element.addEventListener('input', item.validation.bind(item));
    });
  }

  function activateValidation() {
    var list = Object.values(validationList);
    list.forEach(function (item) {
      item.validation();
    });
  }

  activateValidation();
  setListeners();

  // (function () {
  //   var parameter = validationList.price;
  //
  //   function validation() {
  //     priceInput.placeholder = parameter[typeInput.value].min;
  //   }
  //
  //   validation();
  //   typeInput.addEventListener('change', validation);
  //   typeInput.addEventListener('reset', function (evt) {
  //     evt.preventDefault();
  //     validation();
  //   });
  // })();
  //
  // (function () {
  //   var parameter = validationList.capacity;
  //
  //   function validation() {
  //     if (Number(roomNumberInput.value) === 100 && Number(capacityInput.value) !== 0) {
  //       capacityInput.setCustomValidity(parameter.roomsMismatch);
  //     } else if (Number(roomNumberInput.value) !== 100 && Number(capacityInput.value) === 0) {
  //       capacityInput.setCustomValidity(parameter.notIndicated);
  //     } else if (Number(capacityInput.value) > Number(roomNumberInput.value)) {
  //       capacityInput.setCustomValidity(parameter.roomsLack);
  //     } else {
  //       capacityInput.setCustomValidity(parameter.valid);
  //     }
  //   }
  //
  //   validation();
  //   roomNumberInput.addEventListener('input', validation);
  //   capacityInput.addEventListener('input', validation);
  // })();
  //
  // (function () {
  //   var parameter = validationList.price;
  //   priceInput.setAttribute('max', parameter.max);
  //
  //   function validation() {
  //     if (priceInput.validity.valueMissing) {
  //       priceInput.setCustomValidity(parameter.empty);
  //     } else if (parameter[typeInput.value].min > (+priceInput.value)) {
  //       priceInput.setCustomValidity(parameter[typeInput.value].message);
  //     } else if ((+priceInput.value) > parameter.max) {
  //       priceInput.setCustomValidity(parameter.maxMessage);
  //     } else {
  //       priceInput.setCustomValidity(parameter.valid);
  //     }
  //   }
  //
  //   validation();
  //   priceInput.addEventListener('input', validation);
  //   typeInput.addEventListener('input', validation);
  // })();
  //
  // (function () {
  //   var parameter = validationList.upload;
  //   avatarInput.setAttribute(parameter.attribute, parameter.value);
  //   imagesInput.setAttribute(parameter.attribute, parameter.value);
  // })();
  //
  // addressInput.setAttribute('readonly', 'readonly');
  // titleInput.setAttribute('required', 'required');
  // priceInput.setAttribute('required', 'required');
  //
  // timeOutInput.addEventListener('input', function () {
  //   timeInInput.value = timeOutInput.value;
  // });
  //
  // timeInInput.addEventListener('input', function () {
  //   timeOutInput.value = timeInInput.value;
  // });
})();
// (function () {
//   var element = titleInput;
//   var validity = element.validity;
//   var minLength = 30;
//   var maxLength = 100;
//   var emptyMessage = 'Заголовок объявления не может быть пустым';
//   var length = element.value.length;
//
//   function validation() {
//     var message = '';
//     if (validity.valueMissing) {
//       message = emptyMessage;
//     } else if (length < minLength) {
//       message = 'Заголовок объявления должен содержать не менее ' + minLength + ' символов, сейчас ' + length;
//     } else if (length > maxLength) {
//       message = 'Заголовок объявления должен содержать не более ' + maxLength + ' символов, сейчас ' + length;
//     }
//     element.setCustomValidity(message);
//   }
// })();

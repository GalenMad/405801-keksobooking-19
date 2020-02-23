'use strict';

var ENTER_KEY = 'Enter';
var COORDINATE_CORRECTION_X = 32.5;
var COORDINATE_CORRECTION_Y = 75;
var PIN_WIDTH = 50;
var PIN_HEIGHT = 70;
var COORDINATES_RANGE_X = [0, 1200];
var COORDINATES_RANGE_Y = [130, 630];

var map = document.querySelector('.map');
var mainPin = document.querySelector('.map__pin--main');
var form = document.querySelector('.ad-form');
var formFieldsets = form.querySelectorAll('fieldset');
var addressInput = form.querySelector('#address');
var roomNumberInput = form.querySelector('#room_number');
var capacityInput = form.querySelector('#capacity');

var timingOptions = ['12:00', '13:00', '14:00'];
var hotelTypes = ['palace', 'flat', 'house', 'bungalo'];
var featuresList = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var photosList = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var adCount = 8;
var adsArray = [];
var adList = document.querySelector('.map__pins');
var adTemplateList = document.createDocumentFragment();
var adTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

function getRandomInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomSliceArray(targetArray) {
  var sliceCount = getRandomInteger(0, targetArray.length);
  var localFeaturesList = targetArray.slice(0);
  var sliceIndexes = [];
  for (var i = sliceCount; i > 0; --i) {
    do {
      var sliceIndex = getRandomInteger(0, targetArray.length - 1);
    } while (sliceIndexes.includes(sliceIndex));
    localFeaturesList.splice(sliceIndex, 1);
    sliceIndexes.push(sliceIndex);
  }
  return localFeaturesList;
}

function createAds() {
  for (var i = adCount; i > 0; i--) {
    var ad = {
      author: {
        avatar: i > 9 ? 'img/avatars/user' + i + '.png' : 'img/avatars/user0' + i + '.png'
      },
      location: {
        x: getRandomInteger(COORDINATES_RANGE_X[0], COORDINATES_RANGE_X[1]),
        y: getRandomInteger(COORDINATES_RANGE_Y[0], COORDINATES_RANGE_Y[1])
      },
      offer: {
        title: 'заголовок предложения',
        price: getRandomInteger(100, 1000),
        type: hotelTypes[getRandomInteger(0, 3)],
        rooms: getRandomInteger(1, 8),
        guests: getRandomInteger(1, 8),
        checkin: timingOptions[getRandomInteger(0, 2)],
        checkout: timingOptions[getRandomInteger(0, 2)],
        features: getRandomSliceArray(featuresList),
        description: 'строка с описанием',
        photos: getRandomSliceArray(photosList),
      }
    };
    ad.offer.address = ad.location.x + ', ' + ad.location.y;
    adsArray.push(ad);
  }
}

function renderAds() {
  createAds();
  for (var i = adCount - 1; i >= 0; --i) {
    var adElement = adTemplate.cloneNode(true);
    var adElementImage = adElement.querySelector('img');
    var adCoordinateX = adsArray[i].location.x - PIN_WIDTH / 2;
    var adCoordinateY = adsArray[i].location.y - PIN_HEIGHT;
    adElement.setAttribute('style', 'left:' + adCoordinateX + 'px; top:' + adCoordinateY + 'px;');
    adElementImage.setAttribute('src', adsArray[i].author.avatar);
    adElementImage.setAttribute('alt', adsArray[i].offer.title);
    adTemplateList.append(adElement);
  }
  adList.prepend(adTemplateList);
}

function deactivateForm() {
  for (var i = formFieldsets.length - 1; i > 0; i--) {
    formFieldsets[i].setAttribute('disabled', 'disabled');
  }
  form.classList.add('ad-form--disabled');
}

function activateForm() {
  for (var i = formFieldsets.length - 1; i > 0; i--) {
    formFieldsets[i].removeAttribute('disabled');
  }
  form.classList.remove('ad-form--disabled');
}

function activateMap() {
  map.classList.remove('map--faded');
}

function setMainPinCoordinates() {
  var coordinateX = Math.round(Number(mainPin.style.left.slice(0, -2)) + COORDINATE_CORRECTION_X);
  var coordinateY = Math.round(Number(mainPin.style.top.slice(0, -2)) + COORDINATE_CORRECTION_Y);
  addressInput.value = coordinateX + ', ' + coordinateY;
}

function activatePage(evt) {
  if (evt.button === 0 || evt.key === ENTER_KEY) {
    activateMap();
    renderAds();
    activateForm();
    setMainPinCoordinates();
    mainPin.removeEventListener('mousedown', activatePage);
    mainPin.removeEventListener('keydown', activatePage);
    mainPin.addEventListener('mousedown', function () {
      if (evt.button === 0) {
        setMainPinCoordinates();
      }
    });
  }
}

function validationRoomNumberAndCapacity() {
  var roomValue = Number(roomNumberInput.value);
  var capacityValue = Number(capacityInput.value);
  if (roomValue === 100 && capacityValue !== 0) {
    capacityInput.setCustomValidity('100 комнат не для гостей');
  } else if (roomValue !== 100 && capacityValue === 0) {
    capacityInput.setCustomValidity('Укажите количество гостей');
  } else if (capacityValue > roomValue) {
    capacityInput.setCustomValidity('Для каждого гостя необходимо не менее одной комнаты');
  } else {
    capacityInput.setCustomValidity('');
  }
}

mainPin.addEventListener('mousedown', activatePage);
mainPin.addEventListener('keydown', activatePage);
form.addEventListener('change', function (evt) {
  if (evt.target === roomNumberInput || evt.target === capacityInput) {
    validationRoomNumberAndCapacity();
  }
});

validationRoomNumberAndCapacity();
deactivateForm();
setMainPinCoordinates();

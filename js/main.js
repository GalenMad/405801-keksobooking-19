'use strict';

var ENTER_KEY = 'Enter';
var ESC_KEY = 'Escape';
var COORDINATE_CORRECTION_X = 32.5;
var COORDINATE_CORRECTION_Y = 75;
var PIN_WIDTH = 50;
var PIN_HEIGHT = 70;
var COORDINATES_RANGE_X = [0, 1200];
var COORDINATES_RANGE_Y = [130, 630];

var map = document.querySelector('.map');
var mapFilter = map.querySelector('.map__filters-container');
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
var adList = document.querySelector('.map__pins');
var adTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
var adCardTemplate = document.querySelector('#card').content.querySelector('.map__card');

var ads = [];

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

function generateRandomAds() {
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
        title: 'Заголовок предложения ' + i,
        price: getRandomInteger(100, 1000),
        type: hotelTypes[getRandomInteger(0, 3)],
        rooms: getRandomInteger(1, 8),
        guests: getRandomInteger(1, 8),
        checkin: timingOptions[getRandomInteger(0, 2)],
        checkout: timingOptions[getRandomInteger(0, 2)],
        features: getRandomSliceArray(featuresList),
        description: 'Описание предложения ' + i,
        photos: getRandomSliceArray(photosList),
      }
    };
    ad.offer.address = ad.location.x + ', ' + ad.location.y;
    ads.push(ad);
  }
}

function renderAdCard(offerId) {

  function declOfNum(number, titles) {
    var cases = [2, 0, 1, 1, 1, 2];
    return titles[(number % 100 > 4 && number % 100 < 20) ? 2 : cases[(number % 10 < 5) ? number % 10 : 5]];
  }

  function checkData(key, element, callback) {
    if (key) {
      callback(element, key);
    } else {
      element.remove();
    }
  }

  function getOfferType() {
    if (adOffer.type === 'bungalo') {
      return 'Бунгало';
    } else if (adOffer.type === 'house') {
      return 'Дом';
    } else if (adOffer.type === 'flat') {
      return 'Квартира';
    } else if (adOffer.type === 'palace') {
      return 'Дворец';
    } else {
      return null;
    }
  }

  function createPhotos() {
    if (adOffer.photos.length) {
      var photos = document.createDocumentFragment();
      for (var k = adOffer.photos.length - 1; k >= 0; k--) {
        var photo = templatePhoto.cloneNode(false);
        photo.src = adOffer.photos[k];
        photos.prepend(photo);
      }
      return photos;
    } else {
      return null;
    }
  }

  function createFeatures() {
    if (adOffer.features.length) {
      var features = document.createDocumentFragment();
      for (var t = adOffer.features.length - 1; t >= 0; t--) {
        var feature = document.createElement('li');
        feature.className = 'popup__feature popup__feature--' + adOffer.features[t];
        features.prepend(feature);
      }
      return features;
    } else {
      return null;
    }
  }

  function setOfferAvatar(element, key) {
    element.src = key;
  }

  function setOfferTitle(element, key) {
    element.textContent = key;
  }

  function setOfferAddress(element, key) {
    element.textContent = key;
  }

  function setOfferPrice(element, key) {
    element.textContent = key + '₽/ночь';
  }

  function setOfferType(element, key) {
    element.textContent = key;
  }

  function setOfferRooms(element, key) {
    element.textContent = key + ' ' + declOfNum(key, ['комната', 'комнаты', 'комнат']);
  }

  function setOfferCapacity(element, key) {
    element.textContent += ' для ' + key + ' ' + declOfNum(key, ['гостя', 'гостей', 'гостей']);
  }

  function setOfferCheckIn(element, key) {
    element.textContent = 'Заезд после ' + key;
  }

  function setOfferCheckOut(element, key) {
    element.textContent += ', выезд до ' + key;
  }

  function setOfferDescription(element, key) {
    element.textContent = key;
  }

  function setOfferFeatures(element, key) {
    element.append(key);
  }

  function setOfferPhotos(element, key) {
    element.append(key);
  }

  var ad = ads[offerId];
  var adOffer = ad.offer;
  var offerCard = adCardTemplate.cloneNode(true);
  var offerAvatar = offerCard.querySelector('.popup__avatar');
  var offerTitle = offerCard.querySelector('.popup__title');
  var offerAddress = offerCard.querySelector('.popup__text--address');
  var offerPrice = offerCard.querySelector('.popup__text--price');
  var offerType = offerCard.querySelector('.popup__type');
  var offerCapacity = offerCard.querySelector('.popup__text--capacity');
  var offerTiming = offerCard.querySelector('.popup__text--time');
  var offerFeatures = offerCard.querySelector('.popup__features');
  var offerDescription = offerCard.querySelector('.popup__description');
  var offerPhotos = offerCard.querySelector('.popup__photos');
  var templatePhoto = offerPhotos.querySelector('.popup__photo');

  offerFeatures.innerHTML = '';
  templatePhoto.remove();

  checkData(ad.author.avatar, offerAvatar, setOfferAvatar);
  checkData(adOffer.title, offerTitle, setOfferTitle);
  checkData(adOffer.address, offerAddress, setOfferAddress);
  checkData(adOffer.price, offerPrice, setOfferPrice);
  checkData(getOfferType(), offerType, setOfferType);
  checkData(adOffer.rooms, offerCapacity, setOfferRooms);
  checkData(adOffer.guests, offerCapacity, setOfferCapacity);
  checkData(adOffer.checkin, offerTiming, setOfferCheckIn);
  checkData(adOffer.checkout, offerTiming, setOfferCheckOut);
  checkData(adOffer.description, offerDescription, setOfferDescription);
  checkData(createFeatures(), offerFeatures, setOfferFeatures);
  checkData(createPhotos(), offerPhotos, setOfferPhotos);

  var currentCardClose = offerCard.querySelector('.popup__close');

  var closePopup = function () {
    offerCard.remove();
    document.removeEventListener('keydown', onPopupEscPress);
  };

  var onPopupEscPress = function (evt) {
    if (evt.key === ESC_KEY) {
      closePopup();
    }
  };

  currentCardClose.addEventListener('click', closePopup);
  document.addEventListener('keydown', onPopupEscPress);

  map.insertBefore(offerCard, mapFilter);
}

function renderAdPins() {
  var templateList = document.createDocumentFragment();
  for (var i = ads.length - 1; i >= 0; --i) {
    var offerPin = adTemplate.cloneNode(true);
    offerPin.setAttribute('data-offer-id', i);
    var adElementImage = offerPin.querySelector('img');
    var adCoordinateX = ads[i].location.x - PIN_WIDTH / 2;
    var adCoordinateY = ads[i].location.y - PIN_HEIGHT;
    offerPin.setAttribute('style', 'left:' + adCoordinateX + 'px; top:' + adCoordinateY + 'px;');
    adElementImage.setAttribute('src', ads[i].author.avatar);
    adElementImage.setAttribute('alt', ads[i].offer.title);

    offerPin.addEventListener('click', function (evt) {
      var openPopup = map.querySelector('.map__card');
      if (openPopup) {
        openPopup.remove();
      }
      var pinId = evt.currentTarget.getAttribute('data-offer-id');
      renderAdCard(pinId);
    });

    templateList.append(offerPin);
  }
  adList.prepend(templateList);
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
    generateRandomAds();
    renderAdPins();
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

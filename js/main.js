'use strict';

var PIN_WIDTH = 50;
var PIN_HEIGHT = 70;
var COORDINATES_RANGE_X = [0, 1200];
var COORDINATES_RANGE_Y = [130, 630];
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

function createAd() {
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

function renderAd() {
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

createAd();
renderAd();

document.querySelector('.map').classList.remove('map--faded');

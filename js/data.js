'use strict';
(function () {
  var AD_COUNT = 8;
  var COORDINATES_RANGE_X = [0, 1200];
  var COORDINATES_RANGE_Y = [130, 630];
  var timingOptions = ['12:00', '13:00', '14:00'];
  var hotelTypes = ['palace', 'flat', 'house', 'bungalo'];
  var featuresList = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  var photosList = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
  window.ads = [];

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

  for (var i = AD_COUNT; i > 0; i--) {
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
    window.ads.push(ad);
  }
})();

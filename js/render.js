'use strict';

(function () {

  var ESC_KEY = 'Escape';
  var PIN_WIDTH = 50;
  var PIN_HEIGHT = 70;
  var ads = window.ads;

  var map = document.querySelector('.map');
  var mapFilter = map.querySelector('.map__filters-container');

  var adList = document.querySelector('.map__pins');
  var adTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
  var adCardTemplate = document.querySelector('#card').content.querySelector('.map__card');

  function declOfNum(number, titles) {
    var cases = [2, 0, 1, 1, 1, 2];
    return titles[(number % 100 > 4 && number % 100 < 20) ? 2 : cases[(number % 10 < 5) ? number % 10 : 5]];
  }

  function renderAdCard(offerId) {

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
    offerCard.setAttribute('data-offer-id', offerId);

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
        var pinId = evt.currentTarget.getAttribute('data-offer-id');
        if (openPopup && openPopup.getAttribute('data-offer-id') !== pinId) {
          openPopup.remove();
          renderAdCard(pinId);
        } else if (!openPopup) {
          renderAdCard(pinId);
        }
      });

      templateList.append(offerPin);
    }
    return templateList;
  }

  window.insertAdPins = function () {
    adList.prepend(renderAdPins());
  };

})();


'use strict';

(function () {
  var map = document.querySelector('.map');
  var mapFilter = map.querySelector('.map__filters-container');
  var adCardTemplate = document.querySelector('#card').content.querySelector('.map__card');
  var adPinList = document.querySelector('.map__pins');

  function declOfNum(number, titles) {
    var cases = [2, 0, 1, 1, 1, 2];
    return titles[(number % 100 > 4 && number % 100 < 20) ? 2 : cases[(number % 10 < 5) ? number % 10 : 5]];
  }

  function closeCurrentPopup() {
    var currentOpenCard = map.querySelector('.map__card.popup');
    if (currentOpenCard) {
      currentOpenCard.remove();
    }
  }

  function deselectPin() {
    var selectedPin = adPinList.querySelector('.map__pin--active');
    if (selectedPin) {
      selectedPin.classList.remove('map__pin--active');
    }
  }

  function renderAdCard(ads, offerId) {

    var ad = ads[offerId];
    var adOffer = ad.offer;
    var card = adCardTemplate.cloneNode(true);
    var avatar = card.querySelector('.popup__avatar');
    var title = card.querySelector('.popup__title');
    var address = card.querySelector('.popup__text--address');
    var price = card.querySelector('.popup__text--price');
    var type = card.querySelector('.popup__type');
    var capacity = card.querySelector('.popup__text--capacity');
    var timing = card.querySelector('.popup__text--time');
    var features = card.querySelector('.popup__features');
    var description = card.querySelector('.popup__description');
    var photos = card.querySelector('.popup__photos');
    var defaultPhoto = photos.querySelector('.popup__photo');
    var currentCardClose = card.querySelector('.popup__close');

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
        var cardPhotos = document.createDocumentFragment();
        for (var k = adOffer.photos.length - 1; k >= 0; k--) {
          var photo = defaultPhoto.cloneNode(false);
          photo.src = adOffer.photos[k];
          cardPhotos.prepend(photo);
        }
        return cardPhotos;
      } else {
        return null;
      }
    }

    function createFeatures() {
      if (adOffer.features.length) {
        var cardFeatures = document.createDocumentFragment();
        for (var t = adOffer.features.length - 1; t >= 0; t--) {
          var feature = document.createElement('li');
          feature.className = 'popup__feature popup__feature--' + adOffer.features[t];
          cardFeatures.prepend(feature);
        }
        return cardFeatures;
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

    features.innerHTML = '';
    defaultPhoto.remove();
    checkData(ad.author.avatar, avatar, setOfferAvatar);
    checkData(adOffer.title, title, setOfferTitle);
    checkData(adOffer.address, address, setOfferAddress);
    checkData(adOffer.price, price, setOfferPrice);
    checkData(getOfferType(), type, setOfferType);
    checkData(adOffer.rooms, capacity, setOfferRooms);
    checkData(adOffer.guests, capacity, setOfferCapacity);
    checkData(adOffer.checkin, timing, setOfferCheckIn);
    checkData(adOffer.checkout, timing, setOfferCheckOut);
    checkData(adOffer.description, description, setOfferDescription);
    checkData(createFeatures(), features, setOfferFeatures);
    checkData(createPhotos(), photos, setOfferPhotos);
    window.handlerPopup(currentCardClose, true, deselectPin);
    return card;
  }

  window.card = {
    insertAdCard: function (ads, offerId) {
      deselectPin();
      closeCurrentPopup();
      map.insertBefore(renderAdCard(ads, offerId), mapFilter);
    }
  };
})();


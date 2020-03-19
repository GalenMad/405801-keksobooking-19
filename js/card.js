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

  function setTextContent(element, key) {
    element.textContent = key;
  }

  function appendElement(element, key) {
    element.append(key);
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

    var offerTypeMap = {
      'bungalo': 'Бунгало',
      'house': 'Дом',
      'flat': 'Квартира',
      'palace': 'Дворец'
    };

    var checkList = [
      {
        key: ad.author.avatar,
        element: avatar,
        callback: function (element, key) {
          element.src = key;
        }
      },
      {
        key: ad.offer.title,
        element: title,
        callback: setTextContent
      },
      {
        key: offerTypeMap[ad.offer.type],
        element: type,
        callback: setTextContent
      },
      {
        key: ad.offer.address,
        element: address,
        callback: setTextContent
      },
      {
        key: ad.offer.description,
        element: description,
        callback: setTextContent
      },
      {
        key: ad.offer.price,
        element: price,
        callback: function (element, key) {
          element.textContent = key + ' ₽/ночь';
        }
      },
      {
        key: ad.offer.rooms,
        element: capacity,
        callback: function (element, key) {
          element.textContent = key + ' ' + declOfNum(key, ['комната', 'комнаты', 'комнат']);
        }
      },
      {
        key: ad.offer.guests,
        element: capacity,
        callback: function (element, key) {
          element.textContent += ' для ' + key + ' ' + declOfNum(key, ['гостя', 'гостей', 'гостей']);
        }
      },
      {
        key: ad.offer.checkin,
        element: timing,
        callback: function (element, key) {
          element.textContent = 'Заезд после ' + key;
        }
      },
      {
        key: ad.offer.checkout,
        element: timing,
        callback: function (element, key) {
          element.textContent += ', выезд до ' + key;
        }
      },
      {
        key: createFeatures(),
        element: features,
        callback: appendElement
      },
      {
        key: createPhotos(),
        element: photos,
        callback: appendElement
      },
    ];

    function createPhotos() {
      if (ad.offer.photos.length) {
        var cardPhotos = document.createDocumentFragment();
        ad.offer.photos.forEach(function (src) {
          var img = defaultPhoto.cloneNode(false);
          img.src = src;
          cardPhotos.prepend(img);
        });
        return cardPhotos;
      } else {
        return null;
      }
    }

    function createFeatures() {
      if (ad.offer.features.length) {
        var cardFeatures = document.createDocumentFragment();
        ad.offer.features.forEach(function (item) {
          var feature = document.createElement('li');
          feature.className = 'popup__feature popup__feature--' + item;
          cardFeatures.prepend(feature);
        });
        return cardFeatures;
      } else {
        return null;
      }
    }

    function checkData(key, element, callback) {
      if (key) {
        callback(element, key);
      } else {
        element.remove();
      }
    }

    features.innerHTML = '';
    defaultPhoto.remove();

    checkList.forEach(function (item) {
      checkData(item.key, item.element, item.callback);
    });

    window.handler.popup(currentCardClose, true, deselectPin);
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


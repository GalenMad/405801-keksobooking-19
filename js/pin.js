'use strict';

(function () {
  var PIN_WIDTH = 50;
  var PIN_HEIGHT = 70;
  var adPinList = document.querySelector('.map__pins');
  var adPinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

  function renderPin(ad) {
    var offerPin = adPinTemplate.cloneNode(true);
    var adElementImage = offerPin.querySelector('img');
    var adCoordinateX = ad.location.x - PIN_WIDTH / 2;
    var adCoordinateY = ad.location.y - PIN_HEIGHT;
    offerPin.setAttribute('style', 'left:' + adCoordinateX + 'px; top:' + adCoordinateY + 'px;');
    adElementImage.setAttribute('src', ad.author.avatar);
    adElementImage.setAttribute('alt', ad.offer.title);

    offerPin.addEventListener('click', function () {
      window.card.insertAdCard(ad);
      offerPin.classList.add('map__pin--active');
    });
    return offerPin;
  }

  function renderAdPins(ads) {
    var templateList = document.createDocumentFragment();
    ads.forEach(function (ad) {
      if (ad && ad.offer) {
        templateList.append(renderPin(ad));
      }
    });
    return templateList;
  }

  function removePins() {
    var pins = document.querySelectorAll('.map__pin');
    pins.forEach(function (pin) {
      if (!(pin.classList.contains('map__pin--main'))) {
        pin.remove();
      }
    });
  }

  function removeOpenPopup() {
    var currentOpenCard = document.querySelector('.map__card.popup');
    if (currentOpenCard) {
      currentOpenCard.remove();
    }
  }

  window.pin = {
    insert: function (ads) {
      this.remove();
      adPinList.prepend(renderAdPins(ads));
    },
    remove: function () {
      removePins();
      removeOpenPopup();
    }
  };
})();


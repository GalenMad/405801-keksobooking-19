'use strict';

(function () {
  var PIN_WIDTH = 50;
  var PIN_HEIGHT = 70;
  var adPinList = document.querySelector('.map__pins');
  var adPinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

  function renderPin(ads, counter) {
    var offerPin = adPinTemplate.cloneNode(true);
    var adElementImage = offerPin.querySelector('img');
    var adCoordinateX = ads[counter].location.x - PIN_WIDTH / 2;
    var adCoordinateY = ads[counter].location.y - PIN_HEIGHT;
    offerPin.setAttribute('style', 'left:' + adCoordinateX + 'px; top:' + adCoordinateY + 'px;');
    adElementImage.setAttribute('src', ads[counter].author.avatar);
    adElementImage.setAttribute('alt', ads[counter].offer.title);

    offerPin.addEventListener('click', function () {
      window.card.insertAdCard(ads, counter);
      offerPin.classList.add('map__pin--active');
    });
    return offerPin;
  }

  function renderAdPins(ads) {
    var templateList = document.createDocumentFragment();
    for (var i = ads.length - 1; i >= 0; --i) {
      if (ads[i].offer) {
        templateList.append(renderPin(ads, i));
      }
    }
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


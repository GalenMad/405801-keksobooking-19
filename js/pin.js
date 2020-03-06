'use strict';

(function () {
  var PIN_WIDTH = 50;
  var PIN_HEIGHT = 70;
  var ads = window.ads;
  var adPinList = document.querySelector('.map__pins');
  var adPinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

  function renderPin(counter) {
    var offerPin = adPinTemplate.cloneNode(true);
    var adElementImage = offerPin.querySelector('img');
    var adCoordinateX = ads[counter].location.x - PIN_WIDTH / 2;
    var adCoordinateY = ads[counter].location.y - PIN_HEIGHT;
    offerPin.setAttribute('style', 'left:' + adCoordinateX + 'px; top:' + adCoordinateY + 'px;');
    adElementImage.setAttribute('src', ads[counter].author.avatar);
    adElementImage.setAttribute('alt', ads[counter].offer.title);

    offerPin.addEventListener('click', function () {
      window.insertAdCard(counter);
    });
    return offerPin;
  }

  function renderAdPins() {
    var templateList = document.createDocumentFragment();
    for (var i = ads.length - 1; i >= 0; --i) {
      templateList.append(renderPin(i));
    }
    return templateList;
  }

  window.insertAdPins = function () {
    adPinList.prepend(renderAdPins());
  };
})();


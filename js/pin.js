'use strict';

(function () {
  var PIN_WIDTH = 50;
  var PIN_HEIGHT = 70;
  var ads = window.ads;
  var map = document.querySelector('.map');
  var adList = document.querySelector('.map__pins');
  var adTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

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
          window.insertAdCard(pinId);
        } else if (!openPopup) {
          window.insertAdCard(pinId);
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


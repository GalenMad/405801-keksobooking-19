'use strict';

(function () {
  var MAX_ADS_COUNT = 5;
  var typeInput = document.querySelector('#housing-type');

  typeInput.addEventListener('input', function () {
    var currentType = typeInput.value;
    var filteredAds = [];

    switch (currentType) {
      case 'any':
        filteredAds = window.filter.base(window.ads);
        break;
      default:
        for (var i = 0; i < window.ads.length && filteredAds.length < MAX_ADS_COUNT; i++) {
          if (window.ads[i].offer.type === currentType) {
            filteredAds.push(window.ads[i]);
          }
        }
        break;
    }
    window.pin.insert(filteredAds);
  });

  window.filter = {
    base: function () {
      var filteredAds = [];
      for (var i = 0; i < 5; i++) {
        filteredAds.push(window.ads[i]);
      }
      return filteredAds;
    }
  };

})();

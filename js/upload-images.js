'use strict';

(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
  var inputAvatar = document.querySelector('.ad-form #avatar');
  var previewAvatar = document.querySelector('.ad-form-header__preview img');
  var inputImages = document.querySelector('.ad-form #images');
  var previewImages = document.querySelector('.ad-form__photo');

  function getImgElement(src) {
    var img = document.createElement('img');
    img.setAttribute('width', '70');
    img.setAttribute('height', '70');
    img.src = src;
    return img;
  }

  function setImages(input, preview) {
    var file = input.files[0];
    var fileName = file.name.toLowerCase();

    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    if (matches) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        var tagName = preview.tagName.toLowerCase();
        if (tagName === 'img') {
          preview.src = reader.result;
        } else {
          preview.innerHTML = '';
          var img = getImgElement(reader.result);
          preview.append(img);
        }
      });

      reader.readAsDataURL(file);
    }
  }

  inputAvatar.addEventListener('change', function () {
    setImages(inputAvatar, previewAvatar);
  });

  inputImages.addEventListener('change', function () {
    setImages(inputImages, previewImages);
  });
})();

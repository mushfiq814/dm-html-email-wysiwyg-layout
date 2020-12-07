var globalTxtBlockCount = 0;
var globalImgBlockCount = 0;
var globalImgSrcBase64Encoded = ["dummy"];

// create default text block
window.addEventListener("load", createTextBlock(), false);

// creates text box
function createTextBlock() {
  var txtBlock = document.createElement('div');
  txtBlock.id = "txtBlock-" + globalTxtBlockCount;
  globalTxtBlockCount++;
  txtBlock.classList.add('txtBlock');
  txtBlock.contentEditable = true;
  txtBlock.spellcheck = false;
  document.getElementById('blocks').appendChild(txtBlock);
}

// create image box
function createImageUploadBox() {
  // create image uploader
  var imgSelector = document.createElement('input');
  imgSelector.type = 'file';
  document.getElementById('blocks').appendChild(imgSelector);

  // listener for when image is uploaded
  imgSelector.addEventListener('change', function() {
    if (this.files && this.files[0]) {
      // create image for displaying on the editor
      var imgBlock = document.createElement('img');
      imgBlock.id = 'imgBlock-' + globalImgBlockCount;
      globalImgBlockCount++;
      imgBlock.classList.add('imgBlock');

      // save image as Base64 encoded string
      var file = this.files[0];
      var reader = new FileReader();
      reader.onloadend = function() {
        // set encoded string as image source
        imgBlock.src = reader.result;
        globalImgSrcBase64Encoded.push(reader.result)
      }
      reader.readAsDataURL(file);

      // remove selector
      document.getElementById('blocks').removeChild(imgSelector);
      // add image display
      document.getElementById('blocks').appendChild(imgBlock);
    }
  });
}

function sendEmail() {
  var url = "https://api.disciplinedmindstutoring.com/webviewerToContainer";
  var http = new XMLHttpRequest();

  http.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      var responseData = JSON.parse(this.responseText);
      if (responseData.code != 0) {
        alert(responseData.message);
      } else {
        alert(responseData.code);
      }
    }
  };
  
  var fd = new FormData();
  fd.append('htmlEmailId', !!htmlEmailId!!);
  fd.append('imageStrings', JSON.stringify(globalImgSrcBase64Encoded));
  
  http.open('POST', url, true);
  http.setRequestHeader('DM-PROJECT', 'DM_FM17_API_LOCAL');
  http.send(fd);
}



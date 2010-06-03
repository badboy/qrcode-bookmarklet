function()
{
  var d = document.getElementById('qrcode_display_image');
  if(d) d.parentNode.removeChild(d);

  var userSelection;
  if (window.getSelection) {
    userSelection = window.getSelection();
  }
  else if (document.selection) {
    userSelection = document.selection.createRange();
  }
  var selectedText;
  if(userSelection) {
    var selectedText = userSelection;
    if (userSelection.text) {
      selectedText = userSelection.text;
    }
  }

  if(selectedText && selectedText.toString().length > 0) {
    data = 'market://search?q=' + encodeURI(selectedText.toString());
  } else {
    data = location.href;
  }

  var body = document.getElementsByTagName("body")[0];
  var div = document.createElement("div");
  var img = document.createElement("img");
  var p = document.createElement("p");

  var baseUrl = "http://chart.apis.google.com/chart?";
  var params = {
    cht:  "qr",
    choe: "UTF-8",
    chld: "L|1",
    chs: "400x400"
  };

  var urlQuery = "";
  for(param in params) {
    urlQuery += param + "=" + params[param] + "&";
  };
  urlQuery += "chl=" + encodeURI(data);

  div.id = "qrcode_display_image";
  div.style.position = "fixed";
  div.style.top = "50%";
  div.style.left = "50%";
  div.style.width = "405px";
  div.style.height = "450px";
  div.style.margin = "-250px 0 0 -210px";
  div.style.border = "3px double #999999";
  div.style.padding = "5px";
  div.style.backgroundColor = "#CCCCCC";
  div.style.textAlign = "center";
  div.style.zIndex = "9999";

  body.appendChild(div);

  url = baseUrl + urlQuery;
  img.src = url;
  img.alt = url;
  img.title = "Click to close.";

  p.innerHTML = data;
  p.style.margin = "0";
  p.style.padding = "5px 0 0 0";
  p.style.fontWeight = "bold";

  div.appendChild(img);
  div.appendChild(p);

  img.onclick = function() {
    this.parentNode.parentNode.removeChild(div);
  };
}


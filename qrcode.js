function()
{
  var q = document.getElementById('qrcode_display_image'), sel, t, s;
  if(q) d.parentNode.removeChild(q);

  if (window.getSelection) {
    sel = window.getSelection();
  }
  else if (document.selection) {
    sel = document.selection.createRange();
  }
  if(sel) {
    t = sel;
    if (sel.text) {
      t = sel.text;
    }
  }

  if(t && t.toString().length > 0) {
    dt = 'market://search?q=' + encodeURI(t.toString());
  } else {
    dt = location.href;
  }

  var b = document.getElementsByTagName("body")[0],
      d = document.createElement("div"),
      i = document.createElement("img"),
      p = document.createElement("p"),
      uri = "http://chart.apis.google.com/chart?",
      prm = {
        cht:  "qr",
        choe: "UTF-8",
        chld: "L|1",
        chs: "400x400"
      },
      qry = "";
  for(x in prm) {
    qry += x + "=" + prm[x] + "&";
  };
  qry += "chl=" + encodeURI(dt);

  d.id = "qrcode_display_image";
  s = d.style;
  s.color = "black";
  s.fontSize = "12px";
  s.fontFamily = "sans-serif";
  s.position = "fixed";
  s.top = "50%";
  s.left = "50%";
  s.width = "405px";
  s.height = "450px";
  s.margin = "-250px 0 0 -210px";
  s.border = "3px double #999999";
  s.padding = "5px";
  s.backgroundColor = "#CCCCCC";
  s.textAlign = "center";
  s.zIndex = "9999";

  b.appendChild(d);

  u = uri + qry;
  i.src = u;
  i.alt = u;
  i.title = "Click to close.";

  p.innerHTML = dt;
  s = p.style;
  s.margin = "0";
  s.padding = "5px 0 0 0";
  s.fontWeight = "bold";
  s.color = "black";
  s.backgroundColor = "#CCCCCC";
  s.fontSize = "12px";
  s.fontFamily = "sans-serif";

  d.appendChild(i);
  d.appendChild(p);

  i.onclick = function() {
    this.parentNode.parentNode.removeChild(d);
  };
}


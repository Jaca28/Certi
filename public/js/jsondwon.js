var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(jsonf));
var dlAnchorElem = document.getElementById('downloadAnchorElem');
dlAnchorElem.setAttribute("href",     dataStr     );
dlAnchorElem.setAttribute("download", "keyfile.json");
dlAnchorElem.click();
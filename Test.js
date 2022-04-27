

function onPageLoad() {
    var url = document.URL;
    var baseUrl = "https://tunatam.github.io/";

    if (url.length > baseUrl.length) {
        var parameters = getJsonFromUrl(url);
    }

    if (parameters["code"] != null) {
        var code = parameters["code"]
        document.getElementById("url").innerHTML = url;
        document.getElementById("code").innerHTML = code;

        getAccessToken();
    }
}

function getJsonFromUrl(url) {
    if(!url) url = document.URL;
    var query = url.split("?");
    var result = {};
    query[1].split("&").forEach(function(part) {
        var item = part.split("=");
        result[item[0]] = decodeURIComponent(item[1]);
    });
    return result;
}

function getAccessToken() {
    var apiKey = "a744b64a7e864dd591f9770a18b5c00e";

    var xhr = new XMLHttpRequest();
    xhr.open("GET", "https://www.bungie.net/platform/Destiny/Manifest/InventoryItem/1274330687/", true);
    xhr.setRequestHeader("X-API-Key", apiKey);

    xhr.onreadystatechange = function(){
        if(this.readyState === 4 && this.status === 200){
            var json = JSON.parse(this.responseText);
            console.log(json.Response.data.inventoryItem.itemName); //Gjallarhorn
        }
    }

    xhr.send();
}


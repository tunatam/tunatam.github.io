

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

        getAccessToken(code);
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

function getAccessToken(code) {
    let xhr = new XMLHttpRequest();
    xhr.open("POST", "https://www.bungie.net/Platform/App/OAuth/Token/ HTTP/1.1");
    xhr.setRequestHeader("Accept", "application/json");
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        console.log(xhr.status);
        console.log(xhr.responseText);
      }};

    let data = `{
      "client_id": 37970,
      "grant_type": "authorization_code",
      "code": code
    }`;

    xhr.send(data);
}
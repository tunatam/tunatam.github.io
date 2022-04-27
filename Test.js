

function testLoad() {
    var url = document.URL;
    var parameters = getJsonFromUrl(url);

    if (parameters["code"] != null) {
        document.getElementById("url").innerHTML = url;
        document.getElementById("code").innerHTML = parameters["code"];
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
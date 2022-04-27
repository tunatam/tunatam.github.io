

function testLoad() {
    var url = document.URL;
    var parameters = getJsonFromUrl(url);

    if (parameters.length > 1) {
        document.getElementById("url").innerHTML = url;

        for (let i = 0; i < parameters.length; i++) {
            if (parameters[i].localeCompare("code")) {
                document.getElementById("code").innerHTML = parameters[i];
            }
        }
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
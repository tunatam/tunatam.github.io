

function testLoad() {
    var url = document.URL;
    var query = url.substring(1);
    var codeStr = query.split("?");

    document.getElementById("url").innerHTML = url;
    document.getElementById("substring").innerHTML = query;
    document.getElementById("code").innerHTML = codeStr;
}
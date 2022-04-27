

function testLoad() {
    var url = document.URL;
    var codeStr = url.searchParams.get("code");

    if (codeStr.length > 1) {
        document.getElementById("url").innerHTML = url;
        document.getElementById("code").innerHTML = codeStr;
    }
}
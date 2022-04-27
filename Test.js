

function testLoad() {
    var url = document.URL;

    if (codeStr.length > 1) {
        var codeStr = url.searchParams.get("code");

        document.getElementById("url").innerHTML = url;
        document.getElementById("code").innerHTML = codeStr;
    }
}
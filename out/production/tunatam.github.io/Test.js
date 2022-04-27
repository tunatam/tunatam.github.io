

function testButton() {
    document.getElementById("demo").innerHTML = "Hello World";
    window.open("https://www.bungie.net/en/OAuth/Authorize?client_id={client-id}&response_type=code", "_blank");

}
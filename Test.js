
function csvToArray(str, delimiter = ",") {
	const headers = str.slice(0, str.indexOf("\n")).split(delimiter);
	const rows = str.slice(str.indexOf("\n") + 1).split("\n");

	const arr = rows.map(function (row) {
		const values = row.split(delimiter);
		const el = headers.reduce(function (object, header, index) {
			object[header] = values[index];
			return object;
		}, {});
		return el;
	});

	return arr;
}

function getFile(filePath) {
	var result = null;
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.open("GET", filePath, false);
	xmlhttp.send();
	if (xmlhttp.status==200) {
		result = xmlhttp.responseXML;
	}
	return result;
}

function setupWebpage(data, userImport) {
    for (var dbGun in data) {
        var foundGun = userImport.find(o => o.Name === data[dbGun]["Name"]);

        if (typeof foundGun !== "undefined") {
            var weapHtmlShell = "<p>" + foundGun["Name"] + "</p>";
            document.getElementById('putHere').innerHTML += weapHtmlShell;
        }
    }
}

function createDatabase(userImport) {
	var srcPath = "src/Weapons/";
	//var files = ["autorifles","bows", "fusionrifles", "glaives",
	//	"handcannons", "linearfusionrifles", "pulserifles",
	//	"scoutrifles", "sidearms", "smgs", "tracerifles"];
	//var fileExt = ".xml";

    var files = ["autorifles"];
    var fileExt = ".csv";

	for (var fileName of files) {
	    var filePath = srcPath + fileName + fileExt;

	    var headerShell = "<h3 id=" + fileName + ">" + foundGun["Type"] + "</h3>";
        document.getElementById('putHere').innerHTML += headerShell;

        $.ajax({
            type: "GET",
            url: filePath,
            dataType: "text",
            success: function(data) {
                var csv = csvToArray(data);
                setupWebpage(csv, userImport);
            }
        });
	}
}

function onload() {
	const myForm = document.getElementById("myForm");
	const csvFile = document.getElementById("csvFile");

	myForm.addEventListener("submit", function (e) {
		e.preventDefault();
		const input = csvFile.files[0];
		const reader = new FileReader();

		reader.onload = function (e) {
			const text = e.target.result;
			const userImport = csvToArray(text);

			// Build the comparison database
			createDatabase(userImport);
		};
		reader.readAsText(input);
	});
}
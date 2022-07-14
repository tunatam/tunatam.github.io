
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
        var foundGuns = userImport.filter(o => o.Name === data[dbGun]["Name"]);

        if (foundGuns.length > 0) {
            var weapHtmlShell = "";

            for (var weap in foundGuns) {
                weapHtmlShell += "<p>" + foundGuns[weap]["Name"] + "</p>";
            }

            document.getElementById('putHere').innerHTML += weapHtmlShell;
        } else {
            var noUserHit = "<p>" + data[dbGun]["Name"] + ": You have none.</p>";
            document.getElementById('putHere').innerHTML += noUserHit;
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

        $.ajax({
            type: "GET",
            url: filePath,
            dataType: "text",
            success: function(data) {
                var csv = csvToArray(data);

                var headerShell = "</br><h3 id=" + fileName + ">" + csv[0]["Type"] + "</h3>";
                document.getElementById('putHere').innerHTML += headerShell;

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

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

function parseXML(xml) {
	var xmlDoc = xml.responseXML;
	console.log(xmlDoc);
}

function loadFile(filePath) {
	var result = null;
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.open("GET", filePath, false);
	xmlhttp.send();
	if (xmlhttp.status==200) {
		result = xmlhttp.responseText;
	}

	parseXML(result);

	return result;
}

function createDatabase() {
	var srcPath = "src/Weapons/";
	var files = ["autorifles.xml","bows.xml", "fusionrifles.xml", "glaives.xml",
		"handcannons.xml", "linearfusionrifles.xml", "pulserifles.xml",
		"scoutrifles.xml", "sidearms.xml", "smgs.xml", "tracerifles.xml"];

	for (var gun of files) {
		loadFile(srcPath + gun);
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
			const data = csvToArray(text);
			document.getElementById("putHere").innerHTML = data;

			for (var gun in data) {
				console.log(data[gun]["Name"]);
			}
		};
		reader.readAsText(input);
	});

	createDatabase();
}
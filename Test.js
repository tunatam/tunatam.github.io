
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

function createDatabase() {
    var weaponDatabase = {};
	var srcPath = "src/Weapons/";
	var files = ["autorifles","bows", "fusionrifles", "glaives",
		"handcannons", "linearfusionrifles", "pulserifles",
		"scoutrifles", "sidearms", "smgs", "tracerifles"];
	var fileExt = ".xml";

	for (var gun of files) {
	    var xml = getFile(srcPath + gun + fileExt);
	    var frames = xml.getElementsByTagName("frame");
	    var weapon = {weaponType:gun, frameTypes:frames}
		weaponDatabase[gun] = weapon;
		console.log(weaponDatabase[gun]);
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
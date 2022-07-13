
const ELEMENT_TYPES = ["KINETIC", "STASIS", "ARC", "SOLAR", "VOID"];

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

function getCsvFromServer(filePath) {
    var csv = null;

    $.ajax({
        type: "GET",
        url: filePath,
        dataType: "text",
        success: function(data) {
            csv = csvToArray(data);
            return csv;
        },
        error: (xhr, errmsg, err) => {
            console.log(xhr.status + ":" + xhr.responseText);
        }

    });

    return csv;
}

function createDatabase() {
    var weaponDatabase = new Map();
	var srcPath = "src/Weapons/";
	//var files = ["autorifles","bows", "fusionrifles", "glaives",
	//	"handcannons", "linearfusionrifles", "pulserifles",
	//	"scoutrifles", "sidearms", "smgs", "tracerifles"];
	//var fileExt = ".xml";

    var files = ["autorifles"];
    var fileExt = ".csv";

	for (var fileName of files) {
	    var temp = getCsvFromServer(srcPath + fileName + fileExt);
	    weaponDatabase.set(fileName, temp);
	    /*var xml = getFile(srcPath + fileName + fileExt);
	    var xmlFrameList = xml.getElementsByTagName("frame");
	    //var weapon = {weaponType:gunList, frameTypes:frames}
		//weaponDatabase[gunList] = weapon;

		for (var xmlFrame of xmlFrameList) {
		    console.log(xmlFrame);
		    var frameName = xmlFrameList.getElementsByTagName("frameType");
		    var xmlWeapons = xmlFrame.getElementsByTagName("weapon");
		    var frameList = {};

		    for (var xmlGun of xmlWeapons) {
		        var gunName = xmlGun.getElementsByTagName("name");
		        var gunElement = xmlGun.getElementsByTagName("elementType");
		        console.log(gunName + ": " + gunElement);
		        frameList[gunElement]
		    }
		}*/
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
			    if (data[gun]["Tier"] !== "Exotic") {
			        console.log(data[gun]["Name"]);
			    }
			}
		};
		reader.readAsText(input);
	});

	createDatabase();
}
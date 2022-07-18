
const ELEMENT_TYPES = ["Kinetic", "Stasis", "Arc", "Solar", "Void"];

const PERKS = ["Perks 1", "Perks 2", "Perks 3", "Perks 4", "Perks 5", "Perks 6", "Perks 7",
               "Perks 8", "Perks 9", "Perks 10", "Perks 11", "Perks 12", "Perks 13", "Perks 14",
               "Perks 15", "Perks 16"];

const BARRELS = ["Arrowhead Break", "Barrel Shroud", "Chambered Compensator", "Corkscrew Rifling", "Extended Barrel",
                 "Fluted Barrel", "Full Bore", "Full Choke", "Hammer-Forged Rifling", "Polygonal Rifling",
                 "Rifled Barrel", "Smallbore", "Smoothbore"];

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

function setupWebpage(database, userImport, weaponTypeName) {
    // Make master div element
    var masterDiv = document.createElement("div");
    masterDiv.setAttribute("id", weaponTypeName + "_MASTER_DIV");
    document.getElementById("putHere").appendChild(masterDiv);

    // Add some spacers
    var spacer1 = document.createElement("br");
    masterDiv.appendChild(spacer1);

    var spacer2 = document.createElement("br");
    masterDiv.appendChild(spacer2);

    // Make Gun header container
    var newGunTypeHeader = document.createElement("div");
    newGunTypeHeader.setAttribute("id", weaponTypeName + "_header");
    newGunTypeHeader.setAttribute("class", "gunTypeHeader");
    masterDiv.appendChild(newGunTypeHeader);

    // Make the Gun Header Label
    var newGunTypeDiv = document.createElement("div");
    newGunTypeDiv.setAttribute("id", weaponTypeName + "_gunTypeDiv");
    newGunTypeDiv.setAttribute("class", "gunTypeDiv");
    newGunTypeDiv.textContent = database[0]["Type"];
    newGunTypeHeader.appendChild(newGunTypeDiv);

    // New doc elements for new guns
    var newFrameTypeContainer = undefined;
    var newFrameTypeDiv = undefined;
    var newElementDiv = undefined;
    var newWeapListDiv = undefined;
    var newGunList = undefined;
    var newGunItem = undefined;

    for (var dbGun in database) {
        // Check the page for this gun's frameType
        var frameType = database[dbGun]["Perks 0"].replace("*","");
        var frameId = frameType + "_" + database[dbGun]["Type"].replace(" ","");
        var frameTypeContainer = document.getElementById(frameId + "_frameTypeContainer");

        if (!frameTypeContainer) {
            // Make the frameTypeContainer
            newFrameTypeContainer = document.createElement("div");
            newFrameTypeContainer.setAttribute("id", frameId + "_frameTypeContainer");
            newFrameTypeContainer.setAttribute("class", "frameTypeContainer");
            masterDiv.appendChild(newFrameTypeContainer);

            // Make the frameTypeDiv
            newFrameTypeDiv = document.createElement("div");
            newFrameTypeDiv.setAttribute("id", frameId + "_frameTypeDiv");
            newFrameTypeDiv.setAttribute("class", "frameTypeDiv");
            newFrameTypeDiv.textContent = frameType;
            newFrameTypeContainer.appendChild(newFrameTypeDiv);

            for (var ele in ELEMENT_TYPES) {
                var elementType = ELEMENT_TYPES[ele];
                var elementTypeId = frameId + elementType;
                var createElementType = "";

                switch(elementType) {
                    case "Kinetic":
                        createElementType = "kinWeapDiv";
                        break;
                    case "Stasis":
                        createElementType = "staWeapDiv";
                        break;
                    case "Arc":
                        createElementType = "arcWeapDiv";
                        break;
                    case "Solar":
                        createElementType = "solWeapDiv";
                        break;
                    case "Void":
                        createElementType = "voidWeapDiv";
                        break;
                }

                // Make the elementDiv
                newElementDiv = document.createElement("div");
                newElementDiv.setAttribute("id", elementTypeId);
                newElementDiv.setAttribute("class", "weapCell " + createElementType);
                newElementDiv.textContent = elementType;
                newFrameTypeContainer.appendChild(newElementDiv);
            }
        }

        // Check the page for this gun's element list
        var elementType = database[dbGun]["Element"];
        var elementListId = frameId + "_" + elementType + "_listDiv";
        var elementListDiv = document.getElementById(elementListId);

        if (!elementListDiv) {
            // Make the elementListDiv
            var createElementType = "";

            switch(elementType) {
                case "Kinetic":
                    createElementType = "kinWeapListDiv";
                    break;
                case "Stasis":
                    createElementType = "staWeapListDiv";
                    break;
                case "Arc":
                    createElementType = "arcWeapListDiv";
                    break;
                case "Solar":
                    createElementType = "solWeapListDiv";
                    break;
                case "Void":
                    createElementType = "voidWeapListDiv";
                    break;
            }

            // Make the elementDiv
            newWeapListDiv = document.createElement("div");
            newWeapListDiv.setAttribute("id", elementListId);
            newWeapListDiv.setAttribute("class", "listCell " + createElementType);
            newFrameTypeContainer.appendChild(newWeapListDiv);
        }

        // Check the page to see if the gun's name is already there
        var gunName = database[dbGun]["Name"];
        var gunListId = gunName.replace(" ", "") + "_list";
        var gunInPage = document.getElementById(gunListId);

        if (!gunInPage) {
            // Add the gun to the specific elementList in the specific frameTypeContainer
            newGunList = document.createElement("ul");
            newGunList.setAttribute("id", gunListId);

            var newGunListLabel = document.createElement("ll");
            newGunListLabel.setAttribute("id", gunListId + "Label");
            newGunListLabel.textContent = gunName;

            newWeapListDiv.appendChild(newGunList);
            newGunList.appendChild(newGunListLabel);
        }

        // Check the user input for dbGun
        var foundGuns = userImport.filter(o => o.Name === database[dbGun]["Name"]);
        gunListId = gunName.replace(" ", "") + "_list";
        gunInPage = document.getElementById(gunListId);

        for (var userGunNum in foundGuns) {
            var gunName = foundGuns[userGunNum]["Name"];
            var userGunId = gunName + "_" + userGunNum;
            var userGunListItem = document.createElement("li");
            userGunListItem.setAttribute("id", userGunId + "_listItem");

            var userGunButton = document.createElement("button");
            userGunButton.setAttribute("id", userGunId);
            userGunButton.setAttribute("class", "collapsible");
            userGunButton.innerHTML = "Roll " + userGunNum;

            var userGunContent = document.createElement("div");
            userGunContent.setAttribute("id", userGunId + "_content");
            userGunContent.setAttribute("class", "content");
            userGunContent.innerHTML = "TEMP TEXT";

            userGunButton.addEventListener("click", function() {
                this.classList.toggle("active");
                var content = document.getElementById(this.getAttribute("id") + "_content");
                if (content.style.display === "block") {
                    content.style.display = "none";
                } else {
                    content.style.display = "block";
                }
            });

            gunInPage.appendChild(userGunListItem);
            userGunListItem.appendChild(userGunButton);
            userGunListItem.appendChild(userGunContent);
        }
    }
}

function createDatabase(userImport) {
	var srcPath = "src/Weapons/";
	//var files = ["autorifles","bows", "fusionrifles", "glaives",
	//	"handcannons", "linearfusionrifles", "pulserifles",
	//	"scoutrifles", "sidearms", "smgs", "tracerifles"];

    var files = ["autorifles","bows","fusionrifles"];
    var fileExt = ".csv";

	for (var fileName of files) {
	    var filePath = srcPath + fileName + fileExt;

        $.ajax({
            type: "GET",
            url: filePath,
            dataType: "text",
            success: function(data) {
                var csv = csvToArray(data);
                setupWebpage(csv, userImport, fileName);
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
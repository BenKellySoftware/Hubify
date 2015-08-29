//Universal Code

//Server side stuff
var socket = io();

var DATA;

$(document).ready(function(){
	$.getJSON("DATA.json", function (json) {
		DATA = json;
		//needs to run rest of code after DATA loaded
		startPage();
	}).fail(function( jqxhr, textStatus, error ) {
		var err = textStatus + ', ' + error;
		console.log( "Request Failed: " + err);
	});
});

function enterPage (Email, Password) {
	//Checks if user credentials are valid on page enter

	var i = findUser(Email);
	if (i == undefined || DATA.Users[i].Password != Password) {
		return undefined;
	}
	else {
		$.cookie('login', '{"Email": "'+Email+'", "Password": "'+Password+'"}', {expires: 365});
		return DATA.Users[i];
	}
}

function findUser (Email) {
	//Runs binary search to find user based on Email

	var min = 0;
	var max = DATA.Users.length - 1;
	var Found = false;
	//Set variable Modified Email so you dont have to run the toLowerCase() function more than once, saving time.
	var ModEmail = Email.toLowerCase();
	while (min <= max && !Found) {
		i = Math.ceil((min + max) / 2);
		if (DATA.Users[i].Email < ModEmail) {
			min = i + 1;
		}
		else if (DATA.Users[i].Email > ModEmail) {
			max = i - 1;
		}
		else {
			Found = true;
		}
	}
	if (Found) {
		return i;
	}
	else {
		return undefined;
	}
}

function getAge (date) {
	//Compares current date and birthday to find age
	var DOB = new Date(date);
	var today = new Date();
	var year = today.getFullYear() - DOB.getFullYear();
	var month = today.getMonth() - DOB.getMonth();
	var day = today.getDay() - DOB.getDay();
	//Change year based on if before or after date in year
	if(month < 0 || (month == 0 && day < 0)) {
		year -= 1;
	}
	return year;
}

function uploadImage(file, location) {
	//Reads file content as binary and sends to server

	var reader = new FileReader();
	reader.onload = function(e) {
		//get all content
		var buffer = e.target.result;
		//send the content via socket
		socket.emit('Upload Image', file.name, buffer, location);
	};
	reader.readAsBinaryString(file);
}
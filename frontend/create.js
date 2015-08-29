function createUser () {
	Icon = document.getElementById("ImageSubmit");
	if ($("#Name").val() == "" || $("#Email").val() == "" || $("#Sex").val() == "" || $("#Month").val() == "0" || $("#Day").val() == "0" || $("#Year").val() == "-1" ) {alert("Must fill out all required forms")}
	else if ('files' in Icon && Icon.files.length > 0) {
		var Image = Icon.files[0];
		var NewUser = {
			Name: $("#Name").val(),
			Email: $("#Email").val().toLowerCase(),
			Password: $("#Password").val(),
			Sex: $("#Sex").val(),
			DOB: $("#Month option:selected").text()+" "+$("#Day").val()+", "+$("#Year").val(),
			Photo: Image.name.replace(/\s/g, '%20'),
			Bio: $("#Bio").val(),
			Location: "GPS locations",
			Range: 100,
			Education: "",
			Work: "",
			Likes: []
		}
		if ($("#Email").val().indexOf("@")==-1) {alert("Must be a valid Email");}
		else if (findUser($("#Email").val()) != undefined) {alert("Email already taken");}
		else if (getAge(NewUser.DOB) < 13) {alert("Must be older than 13 years");}
		else {
			//Upload Image
			console.log("uploadImage");
			uploadImage(Image, 'Profile');
			//Find position of new user
			var Found = false;
			var i = 0;
			while (!Found && i < DATA.Users.length) {
				if (DATA.Users[i].Email > NewUser.Email) {Found = true;}
				else {i++;}
			}
			//splice to array at i
			socket.emit('Create User', NewUser, i);
			$.cookie('login', '{"Email": "'+$("#Email").val()+'", "Password": "'+$("#Password").val()+'"}', {expires: 365});
			$("#ButtonForm").hide();
			$("#Creating").show();
			setTimeout(function(){
				$("#Creating").text("Done!");
				$("#Redirect").show()
			}, 2000);
		}
	}
	else{alert("Must upload an image")}
}

function startPage() {
	//Add year options
	var FirstYear =  new Date().getFullYear()-13;
	for (var i = FirstYear; i >= 1900; i--) {
		var opt = new Option();
		opt.value = opt.text = i;
		document.getElementById("Year").add(opt);
	}
}

function setDay() {
	var Year = $("#Year").val(),
		Month = $("#Month").val(),
		Day = $("#Day").val();
	if (Year%4 == 0 && Month=="2") {
		var mlength = 29;
	}
	else {
		var mlength = [0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][Month];
	}
	$("#Day").empty();
	var opt = new Option("Day","0");
	document.getElementById("Day").add(opt);
	for (var i = 1; i <= mlength; i++) {
		var opt = new Option();
		opt.value = opt.text = i;
		if (i == Day) {
			opt.selected = true;
		}
		document.getElementById("Day").add(opt);
	}
}
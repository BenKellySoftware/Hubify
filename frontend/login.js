function startPage() {
	if ($.cookie("login") != null) {
		window.location.replace("index.html");
	}

	$('#Password').bind('keypress', function(e) {
		if(e.keyCode==13){
			login();
		}
	});
}

function login () {
	Found = enterPage($('#Email').val(), $('#Password').val());
	if (Found == undefined) {
		alert("Incorrect Email or Password");
	}
	else {
		window.location.replace("index.html");
	}
}
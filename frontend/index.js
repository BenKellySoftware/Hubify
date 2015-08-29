// set global variables
var User;
var SelectedHub;

function cancelPost() {
	$('#InputTitle').val("");
	$('#InputText').children().val("");
	$('#InputCaption').children().val("");
	$("#ImageSubmit").siblings("input").val("");
	$('#ImageSubmit').replaceWith($('#ImageSubmit').val("").clone(true));
	$('#Posts').animate({top: 30});
	$('#PostForm').animate({height: 0}, function() {
		$('#PostBar').animate({borderBottomLeftRadius: 10, borderBottomRightRadius: 10}, 200);
	});
}

function loadHub (Position) {
	//Set selected hub for later use
	$("#Like").hide();
	$("#Unlike").hide();
	SelectedHub = Position;
	var Found = false
	for (var i = 0; i < User.Likes.length; i++) {
		if (User.Likes[i] == Position) {
			$("#Unlike").show();
			Found = true;
		}
	}
	if (!Found) {$("#Like").show();}
	//Empty all posts and load new posts
	$("#Posts").empty();
	for (var i in DATA.Likes[Position].Posts) {
		var Author = DATA.Users[findUser(DATA.Likes[Position].Posts[i].Author)].Name;
		if (DATA.Likes[Position].Posts[i].Type == "T") {
			$("#Posts").append('<div class="Post"><div class="PostTitle">'+DATA.Likes[Position].Posts[i].Title+'</div><div class="PostText">'+DATA.Likes[Position].Posts[i].Text+'</div><div class="PostAuthor">Author: '+Author+'</div></div>');
		}
		else {
			$("#Posts").append('<div class="Post"><div class="PostTitle">'+DATA.Likes[Position].Posts[i].Title+'</div><img class="PostImage" src="Images/Likes/'+DATA.Likes[Position].Name+'/'+DATA.Likes[Position].Posts[i].Image+'"><div class="PostCaption">'+DATA.Likes[Position].Posts[i].Caption+'</div><div class="PostAuthor">Author: '+Author+'</div></div>');
		}
	}
}

function loadProfile () {
	// Loads all user info into profile
	$('#HubList').children().empty();
	$('#ProfileLikes').children('ul').empty();
	$('#ProfileIcon').css('background-image', 'url(Images/Profile/' + User.Photo + ')');
	$('#ProfileName').text(User.Name);
	$('#ProfileAge').children('div').text(getAge(User.DOB));
	if (User.Sex == "M") {
		$('#ProfileSex').children('div').text("Male");
	}
	else if (User.Sex == "F") {
		$('#ProfileSex').children('div').text("Female");
	}
	else {
		$('#ProfileSex').children('div').text("Other");
	}
	if (User.Bio != "") {
		$('#ProfileBio').show();
		$('#ProfileBio').children('div').text(User.Bio);
	}
	$('#HubList').children().append('<li onClick="sortList()">Sort Alphabetically</li>');
	for (var i = 0; i < Math.min(4, User.Likes.length); i++) {
		$('#ProfileLikes').children('ul').append('<li><div>'+DATA.Likes[User.Likes[i]].Name+'</div><img src="Images/Likes/'+DATA.Likes[User.Likes[i]].Name+'/'+DATA.Likes[User.Likes[i]].Photo+'"></li>');
	}
	for (var i = 0; i < User.Likes.length; i++) {
		$('#HubList').children().append('<li onclick="tabSwitch(\'Hubs\', this); loadHub('+User.Likes[i]+'); $(\'#HubList\').addClass(\'active\');">'+DATA.Likes[User.Likes[i]].Name+'</li>');
	}
	$("#TabName").text(User.Name);
}

function logout () {
	//Remove cookie and redirect

	$.removeCookie('login');
	window.location.replace('login.html');
}

function sortList() {
	//Selection sort of users likes

	for (var i = 0; i < User.Likes.length; i++) {
		var MinLike = i;
		for (var j = i+1; j < User.Likes.length; j++) {
			if (DATA.Likes[User.Likes[j]].Name < DATA.Likes[User.Likes[MinLike]].Name) {
				MinLike = j;
			}
		}
		var temp = User.Likes[i];
		User.Likes[i] = User.Likes[MinLike];
		User.Likes[MinLike] = temp;
	}
	$('#HubList').children().empty();
	for (var i = 0; i < User.Likes.length; i++) {
		$('#HubList').children().append('<li onclick="tabSwitch(\'Hubs\', this); loadHub('+User.Likes[i]+'); $(\'#HubList\').addClass(\'active\');">'+DATA.Likes[User.Likes[i]].Name+'</li>');
	}
}

function startPage() {
	//Create local user data

	if ($.cookie("login") == null) {logout()}
	else {
		var UserInfo = JSON.parse($.cookie("login"));
		User = enterPage(UserInfo.Email, UserInfo.Password);
		if (User == undefined) {logout()};
		loadProfile();
	}
	//Search Bar function call
	$("#SearchBar").children().children('input').keyup(function() {
		$("#SearchBar").children("ul").empty();
		if ($("#SearchBar").children().children('input').val() != "") {
			for (var i = 0; i < DATA.Likes.length; i++) {
				if (DATA.Likes[i].Name.toLowerCase().indexOf($("#SearchBar").children().children('input').val().toLowerCase()) > -1) {
					$("#SearchBar").children("ul").append('<li onclick="loadHub('+i+'); tabSwitch(\'Hubs\', \'#HubList\'); $(\'#SearchBar\').children(\'ul\').empty(); $(\'#SearchBar\').children().children(\'input\').val(\'\');">'+DATA.Likes[i].Name+'</li>');
				}
			}
		}
	});
}

function submitPost () {
	//Get post values and upload new post to file, as well as image if selected

	//Check if Title filled
	if ($('#InputTitle').val() != "") {
		if ($("input[type='radio']:checked").val() == "T") {
			var NewPost = {
				Title: $('#InputTitle').val(),
				Type: "T",
				Text: $('#InputText').children('input').val(),
				Author: User.Email
			};
		}
		else {
			InputImage = document.getElementById("ImageSubmit");
			if ('files' in InputImage && InputImage.files.length > 0) {
				//Upload Image
				var Image = InputImage.files[0];
				uploadImage(Image, 'Likes/'+DATA.Likes[SelectedHub].Name);
				var NewPost = {
					Title: $('#InputTitle').val(),
					Type: "I",
					Image: Image.name,
					Caption: $('#InputCaption').children('input').val(),
					Author: User.Email
				};
			}
			else{alert("Must upload an image")}
		}
		if (NewPost != undefined) {
			//Local Update
			DATA.Likes[SelectedHub].Posts.push(NewPost);
			//Upload Post
			socket.emit('Post', NewPost, SelectedHub);
			//Reset Box
			cancelPost();
			loadHub(SelectedHub);
		}
	}
	else {alert("All posts must have a title")}
}

function tabSwitch(Tab, Selector) {
	//Hide all tabs and show selected one

	$('.Tab').each(function() {
		$(this).hide();
	});
	$('#Tab'+Tab).show();
	$("#TabSelector").children().removeClass('active');
	$("#HubList").children().children().removeClass('active');
	$(Selector).addClass('active');
}

function toggleHub (State) {
	//Local change

	if (State) {
		User.Likes.push(SelectedHub);
	}
	else {
		i = User.Likes.indexOf(SelectedHub);
		User.Likes.splice(i,1);
	}
	//Server change
	socket.emit('Toggle Hub', findUser(User.Email), SelectedHub, State);	
	$("#Like").toggle();
	$("#Unlike").toggle();
	loadProfile();
}
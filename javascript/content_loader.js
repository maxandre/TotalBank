var topMenuContent;
var topMenuButtons = [];
var topMenuButtonsLeft = [];
var leftMenuContent;
var mainContent1;
var mainContent2;
var mainContent3;
var rightContent1;
var rightContent2;
var rightContent3;
var footerContent;
var lastTopMenuButtonPressed = 0;


var topMenuClicked = 0;
var topMenuLinks = [];
topMenuLinks[0] = new topMenuLink("Forsiden");
topMenuLinks[1] = new topMenuLink("Oversikt");
topMenuLinks[2] = new topMenuLink("Budsjett");
topMenuLinks[3] = new topMenuLink("Regnskap");
topMenuLinks[4] = new topMenuLink("Betaling");
topMenuLinks[5] = new topMenuLink("Kort");
topMenuLinks[6] = new topMenuLink("Lån");
topMenuLinks[7] = new topMenuLink("Sparing");
topMenuLinks[8] = new topMenuLink("Fond");
topMenuLinks[9] = new topMenuLink("Aksjer");

function update(uri, effect, time) {
	targetElement = getElement(uri);
	loadContent(targetElement, uri, effect, time);
}


function writeTopMenu() {
	$('#top_menu').addClass('btn-group').attr('data-toggle', 'buttons-radio');
	var menu = document.getElementById('top_menu');

	for (var i = 0; i < topMenuLinks.length; i++) {
		button = document.createElement('button');
		button.setAttribute('class', 'btn');
		button.setAttribute('id', i);
		button.innerHTML = topMenuLinks[i].title;
		menu.appendChild(button);
		topMenuButtons[topMenuButtons.length] = button;
		$(button).on('click', function() {
			lastTopMenuButtonPressed = parseInt(this.id);
		});
	}
	$(menu).button();
}

function writeFooter() {
	var now = new Date();
	document.getElementById("footer").innerHTML = lang_time + " " + now.toLocaleTimeString() + ", " + now.toLocaleDateString();
}


//* Updates the div 'targetElement' with the content of the uri.
//* Displaying the content is done the the 'effect' in the 'optionalTime', or 800ms.
//* Possible values of 'effect' are: blind, bounce, clip, drop, explode, fold, highlight, puff,
//*		pulsate, scale, shake, and slide
function loadContent(targetElement, uri, effect, time) {
	if (debug) {
		startMethod("showContent()");
	}

	var options = {};

	$('#' + targetElement).load(uri, function(responseText, textStatus, XMLHttpRequest){
		if (textStatus == "error") {
			var msg = "Sorry but there was an error. Please try again";
			alert(msg);
		} else {
			// some effects have required parameters
			if (effect === "scale") {
				options = { percent: 100 };
			} 

			if (effect === "none") {
				$(this).show(time);
			} 

			else {
				$(this).show(effect, options, time);
			}
			setContent(targetElement, uri);
		}
	});

	if (debug) {
		endMethod("showContent()");
	}
}

function unLoadContent(targetElement, effect, time) {
	var options = {};
	if (effect === "scale") {
		options = { percent: 100 };
	} else if (effect === "size") {
		options = { to: { width: 280, height: 185 } };
	}

	$('#' + targetElement).hide(effect, options, time, function() {
		$(this).html("");
	}).delay(delay);
	setContent(targetElement, "");		 
}


function setContent(targetElement, content) {
	switch(targetElement) {
	case 'top_menu':
		topMenuContent = content;
		break;
	case 'left_menu':
		leftMenuContent = content;
	case 'main_content_1':
		mainContent1 = content;
		break;
	case 'main_content_2':
		mainContent2 = content;
		break;
	case 'main_content_3':
		mainContent3 = content;
		break;
	case 'right_content_1':
		rightContent1 = content;
		break;
	case 'right_content_2':
		rightContent2 = content;
		break;
	case 'right_content_3':
		rightContent3 = content;
		break;
	case 'footer':
		footerContent = content;
		break;
	default:
		addCode("Tried to write content to non-existing <div>");
	alert("Tried to write content to non-existing <div>");
	}
}

function getElement(content) {
	var result = "";
	switch(content) {
	case topMenuContent:
		result = 'top_menu';
		break;
	case leftMenuContent:
		result = 'left_menu';
		break;
	case mainContent1:
		result = 'main_content_1';
		break;
	case mainContent2:
		result = 'main_content_2';
		break;
	case mainContent3:
		result = 'main_content_3';
		break;
	case rightContent1:
		result = 'right_content_1';
		break;
	case rightContent2:
		result = 'right_content_2';
		break;
	case rightContent3:
		result = 'right_content_3';
		break;
	case footerContent:
		result = 'footer';
		break;
	default:
		alert("Tried to update non-existing content.");
	}
	return result;
}

function topMenuLink(title) {
	this.title = title;
}

var content_loaderJSLoaded = true;
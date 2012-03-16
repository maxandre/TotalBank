/*jslint browser: true, white: true, evil: true, devel: true*/
var debug = false, standardJSinnrykk = "";

function scriptError(location, message) {
	addCode("ERROR in: " + location + " MESSAGE: " + message);
}

function writeCode(message) {
	document.getElementById("code").value = message;
}

function addCode(message) {
	var prev = document.getElementById("code").value;
	if (prev == 'undefined') {
		prev = "";
	}
	document.getElementById("code").value = prev + standardJSinnrykk + message + "\n";
}

function startMethod(metode) {
	addCode("Starter metode: " + metode);
	standardJSinnrykk += "    ";
}

function endMethod(metode) {
	standardJSinnrykk = standardJSinnrykk.substring(0, standardJSinnrykk.length-4);
	addCode("Avslutter metode: " + metode);
	
}

function runningMethod(metode) {
	addCode("Kjører metode: " + metode);
}

var debuggingJSLoaded = true;
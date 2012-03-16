var currencyPrefix = "kr.";
var currencyCode = "NOK";

function addThousandSeparator(amount) {
	var result = 0;
	try{
		result = amount.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
	}
	catch(TypeError) {
		scriptError("locale_no.js > addThousandSeparator()", "Method was given an input that was not a number.");
	}
		return result;
}

var locale_settings_defaultJSLoaded = true;
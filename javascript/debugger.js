
define(function() {
	
	function Debugger() {
		this.debug = false;
		this.standardJSinnrykk = "";

		this.scriptError = function(location, message) {
			addCode("ERROR in: " + location + " MESSAGE: " + message);
		};

		this.writeCode = function(message) {
			document.getElementById("code").value = message;
		};

		this.addCode = function(message) {
			var prev = document.getElementById("code").value;
			if (prev == 'undefined') {
				prev = "";
			}
			document.getElementById("code").value = prev + standardJSinnrykk + message + "\n";
		};

		this.startMethod = function(metode) {
			addCode("Starter metode: " + metode);
			standardJSinnrykk += "    ";
		};

		this.endMethod = function(metode) {
			standardJSinnrykk = standardJSinnrykk.substring(0, standardJSinnrykk.length-4);
			addCode("Avslutter metode: " + metode);
			
		};

		this.runningMethod = function(metode) {
			addCode("Kjører metode: " + metode);
		};

	};
	
	return new Debugger();
	
});

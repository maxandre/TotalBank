define(function() {
	
	function BankYear(year) {

	this.year = year;
	this.month = 0;
	this.day = 0;
	this.equals = function (otherYear) {
		if (debug) startMethod("bankYearEquals()");
		var result =false;
		if (this.year == otherYear.year) result =true;
		if (debug) endMethod("bankYearEquals()");
		return result;
	};
	
	this.compareTo = function (otherYear) {
		if (debug) startMethod("bankYearCompareTo()");
		var result = 0;
		if (this.year < otherYear.year) result = -1;
		else if (this.year > otherYear.year) result = 1;
		if (debug) endMethod("bankYearCompareTo()");
		return result;
	};
	
	this.toString = function () {
		if (debug) runningMethod("bankYearToString");
		return "" + this.year;
	};
	
	this.toShortString = function() {return this.year;};
	
	this.inRange = function (startDate, endDate) {
		if (debug) {
			startMethod("BankDate.js > inRange()");
		}

		var result = false;
		if (this.compareTo(startDate) >= 0  && this.compareTo(endDate) <= 0) {
			result = true;
		}
		if (debug) {
			endMethod("BankDate.js > inRange()");
		}

		return result;
	};

	};
	
	return BankYear;
	
});
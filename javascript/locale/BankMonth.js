
define(function() {

	function BankMonth(year, month) {
		this.year = year;
		this.month = month;
		this.day = 0;
		this.equals = function bankMonthEquals(otherMonth) {
			var result =false;
			if (debug) startMethod("bankMonthEquals()");
						
			if (this.year == otherMonth.year && this.month == otherMonth.month) result =true;
			if (debug) endMethod("bankMonthEquals():");
			return result;
		};
		
		this.compareTo = function (otherMonth) {
			if (debug) startMethod("bankMonthCompareTo()");
			var result = 0;
			if (this.year < otherMonth.year) result = -1;
			else if (this.year > otherMonth.year) result = 1;
			else {
				if (this.month < otherMonth.month) result = -1;
				else if (this.month > otherMonth.month) result = 1;
			}
			if (debug) endMethod("bankMonthCompareTo()");
			return result;
		};
		
		this.toString = function () {
			if (debug) runningMethod("bankMonthToString");
			return getNameOfMonth(this.month) + ", " + this.year;
		};
		
		this.toShortString = function () {
			if (debug) runningMethod("bankMonthToShortString");
			var result = this.month + "/" + this.year;
			return result;
		};
		
		this.inRange = function inRange(startDate, endDate) {
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
	
	return BankMonth();

});

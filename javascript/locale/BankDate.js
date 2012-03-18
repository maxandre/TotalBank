
define(function() {
	
	function BankDate(year, month, day) {

		if (year && month && day) {
			this.year = year;
			this.month = month;
			this.day = day;

		} else if (year){
			try {
				this.day = parseInt(year.substring(0,2));
				this.month = parseInt(year.substring(3,5));
				this.year = parseInt(year.substring(6));
			} catch(e) {
				throw "DateParseError";
			}
			var t = new Date();
			if (this.year > t.getFullYear() || this.year < 1900 ||
					this.month < 1 || this.month > 12 || this.day < 1 || this.day > getDaysInMonth(this.month)) {
				throw "DateParseError";
			}
		} else{
			var t = new Date();
			this.day = t.getDate();
			this.month = t.getMonth()+1;
			this.year = t.getFullYear();
		}
		this.equals = 	function (otherDay) {
			if (debug) startMethod("bankDateEquals()");
			var result =false;
			if (this.year == otherDay.year && this.month == otherDay.month && this.day == otherDay.day) result =true;
			if (debug) endMethod("bankDateEquals()");
			return result;
		};
		
		this.compareTo = function (otherDate) {
			if (debug) startMethod("bankDateCompareTo()");
			var result = 0;
			if (this.year < otherDate.year) result = -1;
			else if (this.year > otherDate.year) result = 1;
			else {
				if (this.month > 0 && this.month < otherDate.month) result = -1;
				else if (this.month > otherDate.month && otherDate.month > 0) result = 1;
				else if (this.month == otherDate.month) {
					if (this.day > 0 && this.day < otherDate.day) result = -1;
					else if (this.day > otherDate.day && otherDate.day > 0) result = 1;
				}
			}
			if (debug) endMethod("bankDateCompareTo()");
			return result;
		};
		
		this.toString = function () {
			if (debug) runningMethod("bankDateToString");
			var result = this.day + ". " + getNameOfMonth(this.month) + ", " + this.year;
			return result;
		};
		
		this.toShortString = function () {
			if (debug) runningMethod("bankDateToShortString");
			var result =this.year + "/" + this.month + "/" + this.day;
			return result;
		};
		
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
	
	return BankDate;
	
});











	







	



	



	function getJSdateAsBankDate(date) {
		return new BankDate(date.getFullYear(), date.getMonth()+1, date.getDate());
	}



	function getDaysInMonth(month) {
		var days = 0, date = new Date();

		switch(month){
		case 1:
			days = 31;
			break;
		case 2:
			days = 28;
			date.setDate(date.getDate+1);
			if (date.getMonth()+1 === month) {
				days = 29;
			}
			break;
		case 3:
			days = 31;
			break;
		case 4:
			days = 30;
			break;
		case 5:
			days = 31;
			break;
		case 6:
			days = 30;
			break;
		case 7:
			days = 31;
			break;
		case 8:
			days = 31;
			break;
		case 9:
			days = 30;
			break;
		case 10:
			days = 31;
			break;
		case 11:
			days = 30;
			break;
		case 12:
			days = 31;
			break;
		}
		return days;
	}

	function getNameOfMonth(month) {
		return nameOfMonths[month-1];
	}

	function prepare() {
		nameOfMonths = [];
		nameOfMonths[0] = "Januar";
		nameOfMonths[1] = "Februar";
		nameOfMonths[2] = "Mars";
		nameOfMonths[3] = "April";
		nameOfMonths[4] = "Mai";
		nameOfMonths[5] = "Juni";
		nameOfMonths[6] = "Juli";
		nameOfMonths[7] = "August";
		nameOfMonths[8] = "September";
		nameOfMonths[9] = "Oktober";
		nameOfMonths[10] = "November";
		nameOfMonths[11] = "Desember";

		shortNameOfMonths = [];
		shortNameOfMonths[0] = "Jan";
		shortNameOfMonths[1] = "Feb";
		shortNameOfMonths[2] = "Mars";
		shortNameOfMonths[3] = "Apr";
		shortNameOfMonths[4] = "Mai";
		shortNameOfMonths[5] = "Juni";
		shortNameOfMonths[6] = "Juli";
		shortNameOfMonths[7] = "Aug";
		shortNameOfMonths[8] = "Sept";
		shortNameOfMonths[9] = "Okt";
		shortNameOfMonths[10] = "Nov";
		shortNameOfMonths[11] = "Des";

		minNameOfMonths = [];
		minNameOfMonths[0] = "Ja";
		minNameOfMonths[1] = "Fe";
		minNameOfMonths[2] = "Ma";
		minNameOfMonths[3] = "Ap";
		minNameOfMonths[4] = "Ma";
		minNameOfMonths[5] = "Ju";
		minNameOfMonths[6] = "Ju";
		minNameOfMonths[7] = "Au";
		minNameOfMonths[8] = "Se";
		minNameOfMonths[9] = "Okr";
		minNameOfMonths[10] = "No";
		minNameOfMonths[11] = "Der";

		allMonths = [{ label: "Januar", value: 1 },{label: "Februar", value: 2}, {label: "Mars", value: 3 },
		             {label: "April", value: 4}, {label: "Mai", value: 5}, {label: "Juni", value: 6},
		             {label: "Juli", value: 7}, {label: "August", value: 8}, {label: "September", value: 9},
		             {label: "Oktober", value: 10}, {label: "November", value: 11}, {label: "Desember", value: 12}];
	}



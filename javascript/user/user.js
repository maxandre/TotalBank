
define(["$", "locale/BankDate"], function($, BankDate) {

	var User = (function() {
		"use strict";
		//Private Property
		var person = null;
		var selectedDate = new BankDate();
		var selectedRange = {
				start: new BankDate(),
				end: new BankDate(),
		};
		var datePickerForm = null;
		var rangePickerForm = null;

		var services = [];

		function createRangePickerForm() {
			"use strict";
			var heading, form, fieldset, label1, label2, input1, input2, result = document.createElement('div');

			if (Debugger) Debugger.startMethod("User.createRangePickerForm()");


			result.setAttribute('id', 'date-picker-form');
			result.setAttribute('title', lang_chooseStatementDate);
			heading = document.createElement('p');
			heading.setAttribute('class', 'validateTips');
			heading.innerHTML = lang_info_chooseDateRange;
			result.appendChild(heading);
			form = document.createElement('form');
			fieldset = document.createElement('fieldset');
			label1 = document.createElement('label');
			label2 = document.createElement('label');
			input1 = document.createElement('input');
			input2 = document.createElement('input');
			label1.setAttribute('for', 'fromDate');		
			label2.setAttribute('for', 'toDate');
			label1.innerHTML = lang_fromDate + ": ";
			label2.innerHTML = lang_toDate + ": ";
			input1.setAttribute('type', 'text');
			input1.setAttribute('name', 'fromDate');
			input1.setAttribute('id', 'fromDate');
			input2.setAttribute('type', 'text');
			input2.setAttribute('name', 'toDate');
			input2.setAttribute('id', 'toDate');

			fieldset.appendChild(label1);
			fieldset.appendChild(input1);
			fieldset.appendChild(label2);
			fieldset.appendChild(input2);
			form.appendChild(fieldset);
			result.appendChild(form);

			$(input1).datepicker({
				showOn: "button",
				buttonImage: "../img/calendar.gif",
				buttonImageOnly: true,
				dateFormat: "dd/mm/yy",
				onClose: function(text, inst) {
					$(input2).datepicker('option', 'defaultDate', text );
					$(input2).datepicker('option', 'minDate', text );
				},
				firstDay: 1,
				maxDate: 0,
				changeMonth: true,
				changeYear: true,
			});

			$(input2).datepicker({
				showOn: "button",
				buttonImage: "../img/calendar.gif",
				buttonImageOnly: true,
				firstDay: 1,
				changeMonth: true,
				changeYear: true,
				onClose: function(text, inst) {
					TotalBank.rangeEndSelected = true;
				},
				dateFormat: "dd/mm/yy",
			});

			$(result).dialog({
				height: 300,
				width: 350,
				modal: true,
				buttons: {
					"OK": function() {
						var startDate = null, endDate = null, rangeSelected = true, close = false;
						try{
							startDate = new BankDate(input1.value);
						} catch(e) {
							heading.innerHTML = "-- " + lang_error_incorrectDateFormat + " --";
							heading.setAttribute('style', 'color: red;');
							rangeSelected = false;
							return false;
						}
						try{
							endDate = new BankDate(input2.value);
						} catch(e) {
							rangeSelected = false;
						}

						if (rangeSelected == true && startDate.compareTo(endDate) <= 0 && TotalBank.rangeEndSelected) {
							TotalBank.setCurrentRange(startDate, endDate);
							TotalBank.rangeEndSelected = false;
							close = true;
						} else if (rangeSelected == true && TotalBank.rangeEndSelected) {
							heading.innerHTML = "-- " + lang_error_incorrectDateRange + " --";
							heading.setAttribute('style', 'color: red;');
							TotalBank.rangeEndSelected = false;
							return false;
						} else {
							console.log("kom hit");
							var range = getRangeFromDate(startDate);
							TotalBank.setCurrentRange(range[0], range[1]);
							close = true;
							console.log(TotalBank.getCurrentRange().start.toString());
							console.log(TotalBank.getCurrentRange().end.toString());
						}
						if (close) $(this).dialog("close");
					},
					"Avbryt": function() {
						$( this ).dialog( "close" );
					}
				},
				close: function() {
				},
				autoOpen: false,
			});

			rangePickerForm = result;
			if (Debugger) Debugger.endMethod("User.createRangePickerForm()");
		};



		User.setSelectedDate = function(date) {
			selectedDate = date;
			return selectedDate;
		};

		User.getSelectedDate = function() {
			return selectedDate;
		};

		User.resetSeledtedDate = function() {
			currentDate = new BankDate();
		};

		User.setSelectedRange = function(fromDate, toDate) {
			if (!selectedRange) selectedRange = new Object();
			selectedRange.start = fromDate;
			selectedRange.end = toDate;
			return selectedRange;
		};

		User.setSelectedRangeStart = function(startDate) {
			if (!selectedRange) selectedRange = new Object();
			selectedRange.start = startDate;
		};

		User.setSelectedRangeEnd = function(endDate) {
			if (!selectedRange) selectedRange = new Object();
			selectedRange.end = endDate;
		};

		User.resetSelectedRange = function() {
			currentRange.start = new BankDate();
			currentRange.end = new BankDate();
		};

		User.getCurrentRange = function() {
			return currentRange;
		};

		User.getDatePickerForm = function() {
			if (!datePickerForm) {
				createDatePickerForm();
			}
			return datePickerForm;
		};

		User.getRangePickerForm = function() {
			if (!rangePickerForm) {
				createRangePickerForm();
			}
			return rangePickerForm;
		};

		User.registerService = function(service) {
			services[services.length] = service;
			service.serviceId = services.length;
			return services.length;
		};

		User.unregiserService = function(service) {
			if (service.serviceId) {
				services.slice(service.serviceId, 1);
				delete service.serviceId;

			}
		};

		User.getService = function(id) {
			return services[i];
		};

		User.setPerson = function(p) {
			person = p;
			return person;
		};

		User.getPerson = function() {
			return person;
		};
		
		User.getRangeFromDate = function (date) {
			if (debug) {
				startMethod("BankDate.js > getRangeFromDate()");
			}

			var result = [], startDate, endDate;
			if (date.day > 0) {
				startDate = date;
				endDate = new BankDate(date.year, date.month, getDaysInMonth(date.month));
			}
			else if (date.month > 0) {
				startDate = new BankDate(date.Year, date.month, 1);
				endDate = new BankDate(date.Year, date.mont, getDaysInMonth(date));
			} else {
				startDate = new BankDate(date.year, 1, 1);
				endDate = new BankDate(date.year, 12, 31);
			}

			result[0] = startDate, result[1] = endDate;

			if (debug) {
				endMethod("BankDate.js > getRangeFromDate()");
			}

			return result;
		};

	});
	
	return User;
});
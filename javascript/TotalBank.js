
(function(TotalBank, $, undefined) {

	//Private Property
	var customer = null;
	var activeAccount = null;
	var activeBudget = null;
	var currentDate = null;
	var currentRange = new Object();
	currentRange.start = null;
	currentRange.end = null;
	var datePickerForm = null;
	var rangePickerForm = null;


	//Public Property
	TotalBank.name = "TotalBank";
	TotalBank.version = "1.0";
	TotalBank.debug = false;
	TotalBank.selectedDates = null;
	TotalBank.rangeStartSelected = false;
	TotalBank.rangeEndSelected = false;

	//Public Method
	TotalBank.getStatementAsHTMLTable = function() {
		if (debug) {
			startMethod("TotalBank.getStatementAsHTMLTable()");
		}

		var statement = null, body, heading, lines = null, lineNumber = 0, result;
		statement = this.activeAccount.getStatement(this.currentRange.start, this.currentRange.end);
		lines = statement.transactions;

		body = "<table class=\"table table-striped table-bordered table-condensed accountStatement\" id=\"";
		body += this.activeAccount.accountNumber + "\">";
		body += "<thead><tr>";
		body += "<th>" + lang_date + "</th>";
		body += "<th>" + lang_desc + "</th>";
		body += "<th colspan=\"2\">" + lang_amount + "</th>";
		body += "<th class=\align_right\">" + lang_budget + "</th>";
		body += "</thead><tbody>";

		for (lineNumber = 0; lineNumber < lines.length; lineNumber++) {
			body += TotalBank.getTransactionAsTableRow(lines[lineNumber]);
		}

		body += " </tbody></table>";
		heading = "<div class=\"grid_12\">" + lang_accountStatement + "</div><div class=\"grid_12 align_right\">";
		heading += lang_accountNumber + ": " + TotalBank.getActiveAccount().accountNumber + 
		" | <i class=\"icon-remove\"></i></div>";

		result = new Object();
		result.body = body;
		result.heading = heading;

		if (debug) {
			endMethod("TotalBank.getStatementAsHTMLTable()");
		}

		return result;
	};

	TotalBank.getTransactionAsTableRow = function(transaction) {
		if (debug) {
			startMethod("TotalBank.getTransactionAsTableRow()");
		}
		var result = "<tr class=\"statementLine\" id=\"" + transaction.id + "\">";
		result += "<td class=\"statementLineDate\">" + transaction.date.toShortString() + "</td>";
		result += "<td class=\"statementLineDesc\">" + transaction.desc + "</td>";
		result += "<td class=\"statementLineCurrencyPrefix\">" + currencyPrefix + "</td>";
		result += "<td class=\"statementLineAmount\">" + addThousandSeparator(transaction.amount) + "</td>";
		result += "<td class=\"statementLineChoices\">";
		//valg for hver transaksjon
		if (transaction.categoryId > 0) {
			result += "<a class=\"statementLineRemoveCategory noLink\" href=\"#\"><i class=\"icon-trash\" rel=\"tooltip\" title=\"";
			result += lang_tooltip_statementLineRemoveCategory + "\"> </i> </a>";
		} else {
			result += "<a class=\"statementLineAddCategory noLink\" href=\"#\"><i class=\"icon-share-alt\"rel=\"tooltip\" title=\"";
			result += lang_tooltip_statementLineAddCategory + "\"> </i> </a>";
		}
		result += "<a class=\"statementLineCreateRule noLink\" href=\"#\"><i class=\"icon-pencil\" rel=\"tooltip\" title=\"";
		result += lang_tooltip_statementLineCreateRule + "\"> </i> </a>";
		result += "</td>";
		result += "</tr>";
		if (debug) {
			endMethod("TotalBank.getTransactionAsTableRow()");
		}
		return result;
	};


	//SMALLBUG - Overskriften på inntekter kommer opp som en link?
	TotalBank.getBudgetAsTreeView = function (date) {
		if (debug) {
			startMethod("TotalBank.getBudgetAsTreeView()");
		}

		var result = [], i, budget, htmlHeading, htmlBody, expenseCategories, incomeCategories, catNumber, budgetCategory,
		budgeted, spent, percentage, color, minValue, maxValue, expenseBudget, expenseActual, incomeBudget, incomeActual,
		expensePercentage, incomePercentage;

		budget = this.setActiveBudget(this.getCustomer().getBudget(date));
		expenseCategories = budget.getExpenseCategories();
		incomeCategories = budget.getIncomeCategories();


		minValue = -budget.budgetedExpense();
		maxValue = budget.budgetedIncome();
		actualValue = budget.actualIncome() - budget.actualExpense();

		htmlHeading = budget.budgetTemplate.name +" : <meter value=\"" + actualValue + "\" min=\"" + minValue + "\" max=\"" + maxValue + "\"></meter>";

		expenseBudget = budget.budgetedExpense();
		expenseActual = budget.actualExpense();
		incomeBudget = budget.budgetedIncome();
		incomeActual = budget.actualIncome();
		expensePercentage = expenseActual/expenseBudget;
		incomePercentage = incomeActual/incomeBudget;


		htmlBody = "<div class=\"grid_24\" id=\"expense_heading\">";
		htmlBody += lang_expense + " : <meter value=\"" + expensePercentage + "\" min=\"0\" max=\"2\"></meter></div>";
		htmlBody += "<div class=\"grid_24\" id=\"expense_table\"><ul>";
		for (catNumber = 0; catNumber < expenseCategories.length; catNumber++) {
			budgetCategory = expenseCategories[catNumber];
			if (!budgetCategory.isSubCategory) {
				budgeted = budget.budgetTemplate.getBudgetedAmountByCategoryId(expenseCategories[catNumber].getId()).toFixed(0);
				spent = budgetCategory.getAmountIncludingSubCategories(budget.startDate, budget.endDate).toFixed(0);
				percentage = spent/budgeted;
				color = getBudgetColor(percentage);

				subCategories = budgetCategory.getSubCategories();
				if (subCategories.length == 0) {
					htmlBody += "<li><a class=\"noLink\"href=\"#\">";
				} else {
					htmlBody += "<li><a class=\"topCategory noLink\" href=\"#\">";
				}
				htmlBody += "<div class=\"grid_24 budgetCategory\" id=\"" + budgetCategory.getId() + "\" style=\"background-color:" + color + "\">" + budgetCategory.name + " : " + spent + " / " + budgeted + "</div></a>";

				for (i = 0; i < subCategories.length; i++) {
					htmlBody += this.getSubCategoryAsUL(subCategories[i]);
				}
				htmlBody += "</li>";
			}
		}
		htmlBody += "</ul></div>";
		htmlBody += "<div class=\"grid_24\" id=\"income_heading\">";
		htmlBody += lang_income + " : <meter value =\"" + incomePercentage + "\" min=\"0\" max=\"2\"></meter></div>";
		htmlBody += "<div class =\"grid_24\" id=\"income_table\"><ul>";

		for (catNumber = 0; catNumber < incomeCategories.length; catNumber++) {
			budgetCategory = incomeCategories[catNumber];
			if(!budgetCategory.isSubCategory) {
				budgeted = bankCustomer.getBudget(date).budgetTemplate.getBudgetedAmountByCategoryId(budgetCategory.getId()).toFixed(0);
				spent = budgetCategory.getAmountIncludingSubCategories(budget.startDate, budget.endDate).toFixed(0);
				percentage = spent/budgeted;
				color = getBudgetColor(percentage);

				subCategories = budgetCategory.getSubCategories();
				if (subCategories.length == 0) {
					htmlBody += "<li><a class=\"noLink\" href=\"#\">";
				} else {
					htmlBody += "<li><a class=\"topCategory noLink\" href=\"#\">";
				}

				htmlBody += "<div class=\"grid_24 budgetCategory\" id=\"" + budgetCategory.getId() + "\" style=\"background-color:" + color + "\">" + budgetCategory.name + " : " + spent + " / " + budgeted + "</div></a>";


				for (i = 0; i < subCategories.length; i++) {
					htmlBody += this.getSubCategoryAsUL(subCategories[i]);
				}

				htmlBody += "</li>";
			}
		}

		htmlBody += "</ul></div>";

		result[0] = htmlHeading;
		result[1] = htmlBody;

		if (debug) {
			endMethod("TotalBank.getBudgetAsTreeView()");
		}

		return result;
	};


	TotalBank.getSubCategoryAsUL = function(subCategory) {
		if (debug) {
			startMethod("TotalBank.getSubCategoryAsUL()");
		}

		var html = "<ul>", i, budgeted, spent, percentage, color, subs;

		budgeted = this.activeBudget.budgetTemplate.getBudgetedAmountByCategoryId(subCategory.getId()).toFixed(0);
		spent = subCategory.getAmountIncludingSubCategories(this.getActiveBudget().startDate, this.getActiveBudget().endDate).toFixed(0);
		percentage = spent/budgeted;
		color = getBudgetColor(percentage);

		subs = subCategory.getSubCategories();
		if (subs.length == 0) {
			html += "<li><a class=\"noLink\" href=\"#\">";
		} else {
			html += "<li><a class=\"subCategory noLink\" href=\"#\">";
		}
		html += "<div class=\"grid_24 budgetCategory\" id=\"" + subCategory.getId() + "\" style=\"background-color:" + color + "\">" + subCategory.name + " : " + spent + " / " + budgeted + "</div>";


		for (i = 0; i < subs.length; i++) {
			html += this.getSubCategoryAsUL(subs[i]);
		}

		html += "</li></ul>";

		if (debug) {
			endMethod("TotalBank.getSubCategoryAsUL()");
		}

		return html;
	};


	TotalBank.categorizeStatementLine = function(statementLine, budgetCategory) {
		debug = true;
		if (debug) {
			startMethod("TotalBank.categorizeStatementLine()");
		}

		if ($(statementLine).hasClass('statementLine') && $(budgetCategory).hasClass('budgetCategory')) {
			var transaction, category, completeDrop = false, oldCategory = null;

			transaction = TotalBank.getActiveAccount().getTransactionById($(statementLine).attr('id'));
			category = TotalBank.getCustomer().getBudgetCategoryById($(budgetCategory).attr('id'));
			if (transaction.categoryId > 0) {
				oldCategory = TotalBank.getCustomer().getBudgetCategoryById(transaction.categoryId);
			}

			if (category && transaction) {
				addCode("Har kategori og transaksjon");
				if (category.isIncome() === true){
					addCode("kategori er inntekt");
					if (transaction.amount < 0) {
						if (confirm(lang_confirmQuestion_1)) {
							completeDrop = true;
						}
					} else {
						addCode("Beløp var > 0.");
						completeDrop = true;
					}
				} else {
					addCode("Kategori er utgift.");
					if (transaction.amount > 0) {
						if (confirm(lang_confirmQuestion_2)) {
							completeDrop = true;
						}
					} else {
						addCode("Beløp var < 0.");
						completeDrop = true;
					}
				} 
			} else {
				if (!category) scriptError("default.js > categorizeStatementLine", "Could not find budgetCategory");
				if (!transaction) scriptError("default.js > categorizeStatementLine", "Could not find transaction.");
			}

			if (completeDrop) {
				category.addTransaction(transaction);
				addCode("Drop completed");
				TotalBank.updateBudgetCategory(category);
				TotalBank.updateTransaction(transaction);
				if (oldCategory !== null) {
					TotalBank.updateBudgetCategory(oldCategory);
				}
				var options = {};
				$('#budget_body').effect('highlight', options, 1000);

			}
		} else {
			scriptError("categorizeStatementLine(): one of the given inputs did not have the correct class.");
		}

		if (debug) {
			endMethod("TotalBank.categorizeStatementLine()");
		}

	};

	TotalBank.updateBudgetCategory = function(category) {
		if (debug) {
			startMethod("TotalBank.updateBudgetCategory()");
		}

		var budgeted, spent, percentage, newContent, color;

		budgeted = this.getActiveBudget().budgetTemplate.getBudgetedAmountByCategoryId(category.getId()).toFixed(0);
		spent = category.getAmountIncludingSubCategories(this.getActiveBudget().startDate, this.getActiveBudget().endDate).toFixed(0);
		percentage = spent/budgeted;
		color = getBudgetColor(percentage);
		newContent = "<div class=\"grid_24 budgetCategory\" id=\"" + category.getId() + "\" style=\"background-color:" + color + "\">" + category.name + " : " + spent + " / " + budgeted + "</div>";
		$('#budget_body #' + category.getId()).replaceWith(newContent);
		if(category.isSubCategory) {
			this.updateBudgetCategory(category.parentCategory);
		}
		if (debug) {
			endMethod("TotalBank.updateBudgetCategory()");
		}

	};

	TotalBank.updateTransaction = function(transaction) {
		if (debug) {
			startMethod("TotalBank.updateTransaction()");
		}

		$('.statementLine[id="' + transaction.id + '"]').replaceWith(TotalBank.getTransactionAsTableRow(transaction));

		if (debug) {
			endMethod("TotalBank.updateTransaction()");
		}

	};

	// initialDate - BankDate - The Initial date marked on the date-picker.
	// range - boolean - indicates wheter one or two dates should be selected.
	TotalBank.createRangePickerForm = function() {
		var heading, form, fieldset, label1, label2, input1, input2, result = document.createElement('div');

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
			dateFormat: "dd/mm/yy",
			firstDay: 1,
			changeMonth: true,
			changeYear: true,
			onClose: function(text, inst) {
				TotalBank.rangeEndSelected = true;
			}
		});

		$(result).dialog({
			autoOpen: false,
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
			}
		});

		this.rangePickerForm = result;
	};



	TotalBank.setCustomer = function(customer) {
		this.customer = customer;
		return this.customer;
	};

	TotalBank.getCustomer = function() {
		return this.customer;
	};

	TotalBank.setActiveAccount = function(account) {
		this.activeAccount = account;
		return this.activeAccount;
	};

	TotalBank.getActiveAccount = function() {
		return this.activeAccount;
	};

	TotalBank.getActiveBudget = function() {
		return this.activeBudget;
	};

	TotalBank.setActiveBudget = function(budget) {
		this.activeBudget = budget;
		return this.activeBudget;
	};

	TotalBank.setCurrentDate = function(date) {
		this.currentDate = date;
		return this.currentDate;
	};

	TotalBank.getCurrentDate = function() {
		return this.currentDate;
	};

	TotalBank.resetCurrentDate = function() {
		this.currentDate = null;
	};

	TotalBank.setCurrentRange = function(fromDate, toDate) {
		if (!this.currentRange) this.currentRange = new Object();
		this.currentRange.start = fromDate;
		this.currentRange.end = toDate;
		return this.currentRange;
	};

	TotalBank.setCurrentRangeStart = function(startDate) {
		if (!this.currentRange) this.currentRange = new Object();
		this.currentRange.start = startDate;
	};

	TotalBank.setCurrentRangeEnd = function(endDate) {
		if (!this.currentRange) this.currentRange = new Object();
		this.currentRange.end = endDate;
	};

	TotalBank.resetCurrentRange = function() {
		this.currentRange.start = null;
		this.currentRange.end = null;
	};

	TotalBank.getCurrentRange = function() {
		return this.currentRange;
	};

	TotalBank.getDatePickerForm = function() {
		if (!this.datePickerForm) {
			this.createDatePickerForm();
		}
		return this.datePickerForm;
	};

	TotalBank.getRangePickerForm = function() {
		if (!this.rangePickerForm) {
			this.createRangePickerForm();
		}
		return this.rangePickerForm;
	};

	//Private Method
	function addItem( item ) {
		if ( item !== undefined ) {
			console.log( "Adding " + $.trim(item) );
		}
	};
}(window.TotalBank = window.TotalBank || {}, jQuery));

console.log( TotalBank.name + " version " + TotalBank.version); 


/*   ---     Documentation     ---
 * Public Methods
 *
 *		TotalBank.getStatementAsHTMLTable(); //Adding Butter & Fraying Bacon Strips
 *
 * Adding a Public Property
 *		TotalBank.quantity = "12";
 *		console.log( skillet.quantity ); //12
 *
 * Adding New Functionality to TotalBank
 *		(function( TotalBank, $, undefined ) {
 *			//Private Property
 *			var amountOfGrease = "1 Cup";
 *
 *			//Public Method
 * 			skillet.toString = function() {
 *				console.log( skillet.quantity + " " + skillet.ingredient + " & " + 
 *				     	amountOfGrease + " of Grease" );
 *				console.log( isHot ? "Hot" : "Cold" );
 *			};    
 *		}( window.skillet = window.skillet || {}, jQuery ));
 *
 *	try {
 * 		//12 Bacon Strips & 1 Cup of Grease
 *		skillet.toString(); //Throws Exception
 *	} catch( e ) {
 *		console.log( e.message ); //isHot is not defined
 *	}
     ---     End of Documentation     ---     */ 		
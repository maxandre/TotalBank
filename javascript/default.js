includeJS("javascript/jquery/jquery-1.7.1.min.js");
includeJS("javascript/jquery/jquery-ui-1.8.18.custom.min.js");
includeJS("javascript/jquery/jquery.hoverIntent.js");
includeJS("javascript/bootstrap/bootstrap.min.js");
includeJS("javascript/bootstrap/bootstrap-tooltip.js");
includeJS("javascript/bootstrap/bootstrap-alert.js");
includeJS("javascript/bootstrap/bootstrap-button.js");
includeJS("javascript/debugging.js");
includeJS("javascript/locale/BankDate.js");
includeJS("javascript/locale/language_default.js");
includeJS("javascript/locale/locale_settings_default.js");
includeJS("javascript/content_loader.js");
includeJS("javascript/customer/customer_default.js");
includeJS("javascript/customer/Account.js");
includeJS("javascript/customer/Address.js");
includeJS("javascript/customer/BankStatement.js");
includeJS("javascript/customer/Budget.js");
includeJS("javascript/customer/BudgetCategory.js");
includeJS("javascript/customer/budgetStatics.js");
includeJS("javascript/customer/BudgetTemplate.js");
includeJS("javascript/customer/Customer.js");
includeJS("javascript/customer/dragNdrop.js");
includeJS("javascript/customer/Person.js");
includeJS("javascript/customer/Transaction.js");
includeJS("javascript/TotalBank.js");


var loadingMessage = "Loading ";
var standardJSidCounter = 1;

var bankCustomer, address, dob, person, exampleMonth1, exampleStartDate1, exampelEndDate1, exampleAccountNumber,
		otherExampleAccountNumber, exampleAccount, otherExampleAccount, exampleMonth2, exampleStartDate2, exampleEndDate2,
		exampleBudgetCategories, exampleBudgetTemplate, exampleBudget1, exampleBudget2;

function includeJS(jsFile) {
	"use strict";
    var script = document.createElement("script");
    script.src = jsFile; // change file to your jQuery library
    script.type = "text/javascript";        
    script.charset = "UTF-8";
    document.getElementsByTagName("head")[0].appendChild(script);
}

function loadTotalBank() {
	if (isJSLoaded() === true) {
		prepareJavascript();
		prepareExampleCustomer();
		writeTopMenu();
		loadContent("left_menu", "meny_forsiden.html", "none", 1000);
		loadContent("main_content_1", "accounts.html", "scale", 1000);
		loadContent("main_content_2", "statement.html", "none", 0);
		loadContent("right_content_2", "budget.html", "none", 0);
		writeFooter();
		setTimeout("document.body.style.cursor = 'default';", 1000);
		
		$(document).delegate('.statementLineRemoveCategory', 'click.slrc', function(event) {
			var trans = TotalBank.getCustomer().getTransactionById($(this).parent().parent().attr('id'));
			var cat = TotalBank.getCustomer().getBudgetCategoryById(trans.categoryId);
			cat.removeTransaction(trans);
			TotalBank.updateBudgetCategory(cat);
			TotalBank.updateTransaction(trans);
		});

	} else {
		document.body.style.cursor = 'wait';
		document.getElementById('main_content_1').innerHTML = loadingMessage;
		loadingMessage += ".";
		setTimeout("loadTotalBank();", 500);
	}
}

function isJSLoaded() {
	try {
		if ($ && jQuery && debuggingJSLoaded && accountJSLoaded && addressJSLoaded && bankStatementJSLoaded && budgetCategoryJSLoaded && budgetStaticsJSLoaded) {
			if (budgetTemplateJSLoaded && customerJSLoaded && dragNdropJSLoaded && personJSLoaded && transactionJSLoaded && content_loaderJSLoaded) {
				if (language_defaultJSLoaded && locale_settings_defaultJSLoaded && customer_defaultJSLoaded && TotalBank) return true;
			}
		}
	} catch (ReferenceError) {
		return false;
	}
	return false;
}

function prepareExampleCustomer() {
	address = new Address("Aolph Bergs Vei 50 D", "", 5089, "Bergen", "NO");
	dob = new BankDate(1979, 3, 22);
	person = new Person(22037930559, "Max", "Andrè", "Müller", dob, address, "max.andre.muller@gmail.com", "92842983", "", "92842983");
	exampleMonth1 = new BankMonth(2011, 5);
	exampleStartDate1 = new BankDate(2011, 5, 1);
	exampleEndDate1 = new BankDate(2011, 5, 31);
	exampleAccountNumber = 12345;
	exampleMonth2 = new BankMonth(2011, 4);
	exampleStartDate2 = new BankDate(2011, 4, 1);
	exampleEndDate2 = new BankDate(2011, 4, 30);
	otherExampleAccountNumber = 24680;
	bankCustomer = new Customer(person);
	exampleAccount = getExampleAccount(exampleAccountNumber, bankCustomer, "Lønnskonto", 15235.78, 14998.97);
	otherExampleAccount = getExampleAccount(otherExampleAccountNumber, bankCustomer, "Brukskonto", 24521.03, 24521.03);
	bankCustomer.addAccount(exampleAccount);
	bankCustomer.addAccount(otherExampleAccount);
	exampleBudgetCategories = getExampleBudgetCategories();
	exampleBudgetTemplate = getExampleBudgetTemplate(exampleBudgetCategories, true);
	exampleBudget1 = getExampleBudget(exampleBudgetTemplate, exampleStartDate1, exampleEndDate1);
	exampleBudget2 = getExampleBudget(exampleBudgetTemplate, exampleStartDate2, exampleEndDate2);
	bankCustomer.budgetCategories = exampleBudgetCategories;
	bankCustomer.addBudgetTemplate(exampleBudgetTemplate);
	bankCustomer.addBudget(exampleBudget1);
	bankCustomer.addBudget(exampleBudget2);
	TotalBank.setCustomer(bankCustomer);
	TotalBank.setActiveAccount(bankCustomer.accounts[0]);
	TotalBank.setCurrentRange(exampleStartDate1, exampleEndDate1);
}

function prepareJavascript() {
	"use strict";
	var i, j;
	standardJSinnrykk = "";
	standardJSidCounter = 1;
	if (!Array.prototype.indexOf) {
		Array.prototype.indexOf = function(obj, fromIndex) {
			if (fromIndex === null) {
				fromIndex = 0;
			} else if (fromIndex < 0) {
				fromIndex = Math.max(0, this.length + fromIndex);
			}
			for (i = fromIndex, j = this.length; i < j; i += 1) {
				if (this[i] === obj) {
					return i;
				}
			}
			return -1;
		};
	}
}
/*jslint browser: true, white: true, evil: true, devel: true, sloppy: true*/
/*global Person, Address, Browser, addCode, alert, debug, document, endMethod, getDaysInMonth, include, includeLocale, navigator, prepare, runningMethod, scriptError, standardJSidCounter, standardJSinnrykk, startMethod, writeCode*/
/*global addAccount, addBudget, getCustomerAccount, getActiveCustomerBudget, customerTotalAssets*/

function Customer(person) {
	if (debug) {
		startMethod("new Customer()");
	}
	
	this.person = person;
	this.accounts = [];
	this.budgetCategories = [];
	this.budgetTemplates = [];
	this.budgets = [];
	
	this.addAccount = function(account) {
		this.accounts[this.accounts.length] = account;
	};

	this.addBudgetCategory = function(category) {
		this.budgetCategories[this.budgetCategories.length] = category;
	};

	this.addBudgetTemplate = function(template) {
		this.budgetTemplates[this.budgetTemplates.length] = template;
	};
	
	this.addBudget = function(budget) {
		this.budgets[this.budgets.length] = budget;
	};

	this.getAccount = function(accountNumber) {
		if (debug) {
			startMethod("Customer.getAccount()");
		}
		
		var result, i;
		
		result = null;
		if (this.accounts.length > 0) {
			for (i = 0; i < this.accounts.length; i += 1) {
				if (this.accounts[i].accountNumber == accountNumber) { 
					result = this.accounts[i];
				}
			}
		}

		if (result === null) {
			scriptError("Customer.js > getAccount()", "Could not find the requested accountnumer: " + accountNumber);
		}

		if (debug) {
			endMethod("Customer.getAccount()");
		}
		
		return result;
	};
	
	this.getBudgetCategoryById = function(id) {
		if (debug) {
			startMethod("customer.getBudgetCategoryById()");
		}

		var i, result = null;
		addCode("Looking for budgetCategory with id: " + id + ", among " + this.budgetCategories.length + " categories.");
		for(i = 0; i < this.budgetCategories.length; i++) {
			addCode("matching " + id + " against " + this.budgetCategories[i].getId());
			if(this.budgetCategories[i].getId() == id) {
				result = this.budgetCategories[i];
				if (result.isIncome() === true) {
					addCode("Match found: " + result.name + " er inntekt");
				} else {
					addCode("Match found: " + result.name + " er utgift");
				}
				break;
			}
		}
		
		if (result == null) {
			scriptError("Customer.js > getBudgetCategoryById()", "Tried finding a category that was not in customer.");
		}

		if (debug) {
			endMethod("customer.getBudgetCategoryById()");
		}
		
		return result;
	};
	
	this.getTransactionById = function(id) {
		if (debug) {
			startMethod("customer.getTransactionById()");
		}

		var i, result = null;
		for(i = 0; i < accounts.length; i++) {
			result = accounts[i].getTransactionById(id);
			if (result != null) break;
		}
		if (debug) {
			endMethod("customer.getTransactionById()");
		}
		
		return result;
	};
	
	this.getBudget = function(date) {
		if (debug) {
			startMethod("customer.getBudget()");
		}
		
		var i, b, result = null;
		
		for (i = 0; i < this.budgets.length; i++) {
			b = this.budgets[i];
			if (date.inRange(b.startDate, b.endDate)) {
				result = b;
				break;
			}
		}
		
		if (result == null) {
			scriptError("Customer.js > getBudget", "Could not find a budget matching " + date.toString() + " on customer: " + this.person.id);
		}

		if (debug) {
			endMethod("customer.getBudget()");
		}
		
		return result;
	};
	

	
	this.getBudgetTemplates = function() {
		return this.budgetTemplates;
	};
	
	this.getActiveBudgetTemplate = function() {
		if (debug) {
			startMethod("customer.getActiveBudgetTemplate()");
		}

		var i, result = null;
		for (i = 0; i < this.budgetTemplates.length; i++) {
			if (this.budgetTemplates[i].isActive) {
				result = this.budgetTemplates[i];
			}
		}
		
		if (debug) {
			if (result == null) {
				scriptError("Customer.js > getActiveBudgetTemplate()", "Could not find an active budgetTemplate on customer: " + this.person.id);
			}
			endMethod("customer.getActiveBudgetTemplate()");
		}
		
		return result;
	};

	this.totalAssets = function() {
		if (debug) {
			startMethod("Customer.totalAssets()");
		}
		
		var result, i;
		
		result = 0;
		for (i = 0; i < this.accounts.length; i += 1) {
			result += this.accounts[i].available;
		}
		
		if (debug) {
			endMethod("customer.totalAssets(). Result = " + result);
		}

		return result;
	};

	this.addBudgetCategory = function(category) {
		if (this.getBudgetCategoriById(category.getId()) != null) {
			scriptError("Customer.js > addBudgetCategory()", "Tried adding a budgetCategory with an id that already existed in the customer.");
		} else {
			this.budgetCategories[this.budgetCategories.length] = category;
		}
	};
	
	this.removeBudgetCategory = function(categoryId) {
		if (debug) {
			startMethod("customer.removeBudgetCategory()");
		}

		var category = getBudgetCategoryById(categoryId), result = false, i;
		if (category.isSubCategory) {
			result = category.parentCategory.removeSubCategory(category);
		} else {
			if (confirm("This action will uncategorize all transactions" + '\n' + "previously bound to this category. Are you sure you want to remove it?")) {
				for (i = 0; i < category.transactions.length; i++) {
					category.transactions[i].category = null;
				}
				this.budgetCategories.splice(this.budgetCategoris.indexOf(category), 1);
				result = true;
			}
		}
		if (debug) {
			endMethod("customer.removeBudgetCategory()");
		}
		
		return result;
	};

	if (debug) {
		endMethod("new Customer()");
	}

}

var customerJSLoaded = true;
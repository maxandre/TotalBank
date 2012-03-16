function BudgetCategory(id, name, desc, isIncome, oldTransactions) {
	var i;

	this.getId = function() {return id;};
	this.name = name;
	this.desc = desc;
	this.isSubCategory = false;
	this.parentCategory = null;
	this.isIncome = function() {return isIncome;};
	this.subCategories = [];
	this.transactions = [];
	
	this.addSubCategory = function(category) {
		if (debug) {
			startMethod("category.addSubCategory()");
		}

		if (this.isIncome() === category.isIncome()) {
			category.parentCategory = this;
			category.isSubCategory = true;
			this.subCategories[this.subCategories.length] = category;
		} else{
			scriptError("BudgetCategory.js > addSubCategory()", "Tried adding subCategory where isIncome did not equal this.");
		}
		
		if (debug) {
			endMethod("category.addSubCategory()");
		}
	};
	
	this.getSubCategoryById = function(id) {
		if (debug) {
			startMethod("category.getSubCategoryById()");
		}

		var result = null, i;
		if (this.getId() == id) {
			result = this;
		} else if (this.subCategories.length > 0) {
			for (i = 0; i < this.subCategories.length; i++) {
				result = this.subCategories[i].getCategoryById(id);
				if (result != null) {
					break;
				}
			}
		}
		if (debug) {
			endMethod("category.getSubCategoryById()");
		}
		
		return result;
	};
	
	this.removeSubCategory = function(subCategory) {
		if (debug) {
			startMethod("category.removeSubCategory()");
		}

		var result = false, i;
		if (subCategory != null && subCategory.parentCategory == this) {
			result = true;
			category.removeAllSubCategories();
			for (i = 0; i < category.transactions.length; i++) {
				this.addTransaction(category.transactions[i]);
			}
		}
		if (debug) {
			endMethod("category.removeSubCategory()");
		}

		return result;
	};
	
	this.removeAllSubCategories = function() {
		if (debug) {
			startMethod("category.removeAllSubCategories()");
		}

		var i;
		for (i = 0; i < subCategories.length; i++) {
			this.removeSubCategory(subCategories[i].getId());
		}
		
		if (debug) {
			endMethod("category.removeAllSubCategories()");
		}

	};
	
	this.getSubCategories = function() {
		return this.subCategories;
	};
	

	this.addTransaction = function(transaction) {
		if (debug) {
			startMethod("category.addTransaction()");
		}
		if (transaction.categoryId > 0) {
			TotalBank.getCustomer().getBudgetCategoryById(transaction.categoryId).removeTransaction(transaction);
		}
		transaction.categoryId = this.getId();
		this.transactions[this.transactions.length] = transaction;
		
		if (debug) {
			endMethod("category.addTransaction()");
		}
	};
	
	this.removeTransaction = function(transaction) {
		if (debug) {
			startMethod("category.removeTransaction()");
		}
		
		if (transaction.categoryId == this.getId()) {
			this.transactions.splice(this.transactions.indexOf(transaction), 1);
			transaction.categoryId = 0;
		}
		
		if (debug) {
			endMethod("category.removeTransaction()");
		}
	};
	
	this.getAmount = function(startDate, endDate) {
		if (debug) {
			startMethod("category.getAmount()");
		}
		
		var i, result = 0;
		for (i = 0; i < this.transactions.length; i++) {
			if (this.transactions[i].date.inRange(startDate, endDate)) {
				result += this.transactions[i].getBudgetAmount();
			}
		}
		if (this.isIncome() === false) {
			result = -result;
		}
		if (debug) {
			endMethod("category.getAmount()");
		}
		
		return result;
	};
	
	this.getAmountIncludingSubCategories = function (startDate, endDate) {
		if (debug) {
			startMethod("category.getSubCategoriesAmount()");
		}

		var i, result = 0;
		
		result += this.getAmount(startDate, endDate);
		
		for (i = 0; i < this.subCategories.length; i++) {
			result += this.subCategories[i].getAmountIncludingSubCategories(startDate, endDate);
		}

		if (debug) {
			endMethod("category.getSubCategoriesAmount()");
		}
		
		return result;
	};
	
	if (oldTransactions) {
		for (i = 0; i < oldTransactions.length; i++) {
			this.addTransaction(oldTransactions[i]);
		}
	}
}

function retrieveCategories() {
	return getExampleBudgetCategories();
}

function getExampleBudgetCategories() {
	var result = [];
	result[0] = new BudgetCategory(standardJSidCounter++, "Lønn", "All lønn", true);
	result[1] = new BudgetCategory(standardJSidCounter++, "Lønn Lisa", "Lønn PC-vakt", true);
	result[2] = new BudgetCategory(standardJSidCounter++, "Lønn Lisa", "Lønn stud-ass", true);
	result[3] = new BudgetCategory(standardJSidCounter++, "Lønn Max", "Dagpenger", true);
	result[0].addSubCategory(result[1]);
	result[0].addSubCategory(result[2]);
	result[0].addSubCategory(result[3]);
	result[4] = new BudgetCategory(standardJSidCounter++, "Husleie Inn", "Husleie fra leieboer", true);
	result[5] = new BudgetCategory(standardJSidCounter++, "Annet Inn", "Diverse", true);
	result[6] = new BudgetCategory(standardJSidCounter++, "Dagligvarer", "Alle Dagligvarer", false);
	result[7] = new BudgetCategory(standardJSidCounter++, "Sunn Mat", "Frukt, grønt og fisk.", false);
	result[8] = new BudgetCategory(standardJSidCounter++, "Usunn Mat", "Alt annet", false);
	result[9] = new BudgetCategory(standardJSidCounter++, "Toalettartikler", "Personlig hygiene", false);
	result[10] = new BudgetCategory(standardJSidCounter++, "Toalettartikler, Max", "Høvelblad, skum og deo.", false);
	result[11] = new BudgetCategory(standardJSidCounter++, "Toalettartikler, Lisa", "Tannpasta", false);
	result[6].addSubCategory(result[7]);
	result[6].addSubCategory(result[8]);
	result[6].addSubCategory(result[9]);
	result[9].addSubCategory(result[10]);
	result[9].addSubCategory(result[11]);
	result[12] = new BudgetCategory(standardJSidCounter++, "Husleie Ut", "Husleie", false);
	result[13] = new BudgetCategory(standardJSidCounter++, "Annet Ut", "Diverse", false);
	result[14] = new BudgetCategory(standardJSidCounter++, "Snop", "Godterier med sukker", false);
	result[13].addSubCategory(result[14]);
	return result;
}

var budgetCategoryJSLoaded = true; 
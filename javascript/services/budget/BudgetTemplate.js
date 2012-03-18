
define(function() {

	function BudgetTemplate(id, name, desc, isActive) {
		if (debug) {
			startMethod("new BudgetTemplate()");
		}

		this.getId = function() {return id;};
		this.name = name;
		this.desc = desc;
		this.isActive = isActive;
		this.budgetLines = [];

		this.addBudgetLine = function(budgetCategory, amount) {
			if (debug) {
				startMethod("budgetTemplate.addBudgetLine()");
			}

			var i, line, newCategory = true;
			for (i = 0; i < this.budgetLines.length; i++) {
				line = this.budgetLines[i];
				if (line[0].getId() == budgetCategory.getId()) {
					newCategory = false;
				}
			}
			if (newCategory) {
				var line = [];
				line[0] = budgetCategory;
				line[1] = amount;
				this.budgetLines[this.budgetLines.length] = line;
			} else {
				scriptError("BudgetTemplate.js > addBudgetLine()", "Tried adding a budgetLine with a category that already existed.");
			}
			if (debug) {
				endMethod("budgetTemplate.addBudgetLine()");
			}

		};

		this.getBudgetLineByBudgetCategoryId = function(id) {
			if (debug) {
				startMethod("budgetTemplate.getBudgetLineByBudgetCategoryId()");
			}
			var i, line, result = null;
			for (i = 0; i < this.budgetLines.length; i++) {
				line = this.budgetLines[i];
				if (line[0].getId() == id) {
					result = line;
					break;
				}
			}
			if (debug) {
				endMethod("budgetTemplate.getBudgetLineByBudgetCategoryId()");
			}

			return result;
		};

		this.getTotalBudgetedIncome = function() {
			if (debug) {
				startMethod("budgetTemplate.getTotalBudgetedIncome()");
			}

			var i, line, result = 0;
			for (i = 0; i < this.budgetLines.length; i++) {
				line = this.budgetLines[i];
				if (line[0].isIncome() == true) {
					result += line[1];
				}
			}
			if (debug) {
				endMethod("budgetTemplate.getTotalBudgetedIncome()");
			}

			return result;
		};

		this.getTotalBudgetedExpense = function() {
			if (debug) {
				startMethod("budgetTemplate.getTotalBudgetedExpense()");
			}
			var i, line, result = 0;
			for (i = 0; i < this.budgetLines.length; i++) {
				line = this.budgetLines[i];
				if (line[0].isIncome() === false) {
					result += line[1];
				}
			}
			if (debug) {
				endMethod("budgetTemplate.getTotalBudgetedExpense()");
			}

			return result;
		};

		this.getBudgetedAmountByCategoryId = function(id) {
			if (debug) {
				startMethod("budgetTemplate.getBudgetedAmountByCategoryId()");
			}
			var line, subs, result = 0, i;

			line = this.getBudgetLineByBudgetCategoryId(id);
			result += line[1];
			subs = line[0].getSubCategories();
			for (i = 0; i < subs.length; i++) {
				result += this.getBudgetedAmountByCategoryId(subs[i].getId());
			}
			if (debug) {
				endMethod("budgetTemplate.getBudgetedAmountByCategoryId()");
			}

			return result;
		};


		this.getTotalActualIncome = function(startDate, endDate) {
			if (debug) {
				startMethod("budgetTemplate.getTotalActualIncome()");
			}
			var i, line, result = 0;;
			for (i = 0; i < this.budgetLines.length; i++) {
				line = this.budgetLines[i];
				if (line[0].isIncome() === true) {
					result += line[0].getAmount(startDate, endDate);
				}
			}
			if (debug) {
				endMethod("budgetTemplate.getTotalActualIncome()");
			}

			return result;
		};

		this.getTotalActualExpense = function(startDate, endDate) {
			if (debug) {
				startMethod("budgetTemplate.getTotalActualExpense()");
			}

			var i, line, result = 0;;
			for (i = 0; i < this.budgetLines.length; i++) {
				line = this.budgetLines[i];
				if (line[0].isIncome() === false) {
					result += line[0].getAmount(startDate, endDate);
				}
			}
			if (debug) {
				endMethod("budgetTemplate.getTotalActualExpense()");
			}

			return result;
		};

		this.getActualAmountByCategoryId = function(id) {
			if (debug) {
				startMethod("budgetTemplate.getActualAmountByCategoryId()");
			}

			var line = this.getBudgetLineByBudgetCategoryId(id);
			var result = line[0].getAmount() + line[0].getSubCategoriesAmount();

			if (debug) {
				endMethod("budgetTemplate.getActualAmountByCategoryId()");
			}

			return result;
		};

		this.getIncomeCategories = function() {
			if (debug) {
				startMethod("budgetTemplate.getIncomeCategories()");
			}

			var i, line, result = [];
			for(i = 0; i < this.budgetLines.length; i++) {
				line = this.budgetLines[i];
				if (line[0].isIncome() === true) {
					result[result.length] = line[0];
				}
			}
			if (debug) {
				endMethod("budgetTemplate.getIncomeCategories()");
			}

			return result;
		};

		this.getExpenseCategories = function() {
			if (debug) {
				startMethod("budgetTemplate.getExpenseCategories()");
			}
			var i, line, result = [];
			for(i = 0; i < this.budgetLines.length; i++) {
				line = this.budgetLines[i];
				if (line[0].isIncome() === false) {
					result[result.length] = line[0];
				}
			}
			if (debug) {
				endMethod("budgetTemplate.getExpenseCategories()");
			}

			return result;
		};


		if (debug) {
			endMethod("new BudgetTemplate()");
		}


	};
	
	return BudgetTemplate;
	
});
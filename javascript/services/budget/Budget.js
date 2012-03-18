
define(function() {
	
	function Budget(id, budgetTemplate, startDate, endDate) {
		if (debug) {
			startMethod("new Budget()");
		}

		this.getId = function() {return id;};
		this.budgetTemplate = budgetTemplate;
		this.startDate = startDate;
		this.endDate = endDate;

		this.getIncomeCategories = function() {
			if (debug) {
				startMethod("budget.getIncomeCategories()");
			}

			var result = budgetTemplate.getIncomeCategories();

			if (debug) {
				endMethod("budget.getIncomeCategories()");
			}

			return result;
		};

		this.getExpenseCategories = function() {
			if (debug) {
				startMethod("budget.getIncomeCategories()");
			}

			var result = budgetTemplate.getExpenseCategories();

			if (debug) {
				endMethod("budget.getIncomeCategories()");
			}

			return result;
		};


		this.budgetedIncome = function() {
			if (debug) {
				startMethod("budget.budgetedIncome()");
			}

			var result = budgetTemplate.getTotalBudgetedIncome();

			if (debug) {
				endMethod("budget.budgetedIncome()");
			}

			return result;
		};


		this.budgetedExpense = function() {
			if (debug) {
				startMethod("budget.budgetedSpending()");
			}

			var result = budgetTemplate.getTotalBudgetedExpense();

			if (debug) {
				endMethod("budget.budgetedIncome()");
			}

			return result;
		};


		this.actualIncome = function() {
			if (debug) {
				startMethod("budgetTemplate.actualIncome()");
			}

			var result = budgetTemplate.getTotalActualIncome(startDate, endDate);

			if (debug) {
				endMethod("budgetTemplate.actualIncome()");
			}

			return result;
		};


		this.actualExpense = function() {
			if (debug) {
				startMethod("budget.actualSpending()");
			}

			var result = budgetTemplate.getTotalActualExpense(startDate, endDate);

			if (debug) {
				endMethod("budget.actualSpending()");
			}

			return result;
		};


		this.status = function() {
			if (debug) {
				startMethod("budget.status()");
			}

			var result = 0;
			result += this.budgetedIncome();
			result -= this.budgetedExpense();
			result -= this.actualIncome();
			result += this.actualExpense();

			if (debug) {
				endMethod("budget.status()");
			}

			return result;
		};

		if (debug) {
			endMethod("budget()");
		}


	};
	
	return Budget;

});
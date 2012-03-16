	this.addCategories = function(budgetCategories) {
		if (debug) {
			startMethod("budgetTemplate.addCategories()");
		}
		
		var i;
		
		for (i = 0; i < budgetCategories.length; i += 1) {
			this.addCategory(budgetCategories[i]);
		}
		
		if (debug) {
			endMethod("budgetTemplate.setCategories()");
		}
	};

	
	this.addCategory = function(category) {
		if (debug) {
			startMethod("budgetTemplate.addCategory()");
		}

		category.parentBudget = this;
		if (budgetCategory.isIncome) {
			this.incomeCategories[this.incomeCategories.length] = budgetCategory;
		
		} else if (budgetCategory.isExpense) {
			this.expenseCategories[this.expenseCategories.length] = budgetCategory;	
		}
	
		if (debug) {
			endMethod("budgetTemplate.AddCategory()");
		}
	};
	
	
	this.getCategoryById = function(id) {
		if (debug) {
			startMethod("getBudgetCategoryById()");
		}
		
		var result = null, i;
		
		for (i = 0; i < this.incomeCategories.length; i += 1) {
			if (this.incomeCategories[i].id == id) {
				result = this.incomeCategories[i];
				break;
			}
		}
		
		if (result === null) {
			for (i = 0; i < this.expenseCategories.length; i += 1) {
				if (this.expenseCategories[i].id == id) {
					result = this.expenseCategories[i];
					break;
				}
			}
		}
		
		if (debug) {
			endMethod("getBudgetCategoryById()");
		}
		
		return result;
	};
	
	
	this.removeCategory = function(id) {
		var category = this.getCategoryById(id);
		if (category.isIncome) {
			this.incomeCategories.splice(this.incomeCategories.indexOf(category), 1);
		} else if(category.isExpense) {
			this.expenseCategories.splice(this.expenseCategories.indexOf(category), 1);
		}
	};

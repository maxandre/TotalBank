
define(["$"], function($) {
	function BudgetService() {

		this.serviceName = lang_budget;
		this.budgetCategories = [];
		this.budgetTemplates = [];
		this.budgets = [];

		this.addBudgetCategory = function(category) {
			this.budgetCategories[this.budgetCategories.length] = category;
		};

		this.addBudgetTemplate = function(template) {
			this.budgetTemplates[this.budgetTemplates.length] = template;
		};

		this.addBudget = function(budget) {
			"use strict";
			var i, result = false;
			if (debug) Debugger.starthMethod("BudgetService.addBudget()");
			for (i = 0; i < budgets.length; i++) {
				if (budget.startDate.inRange(budgets[i].startDate, budgets[i].endDate)) {
					result = true;
				}
			}
			if (result) {
				budget.type = 1;
			} else {
				budget.type = 0;
			}

			this.budgets[this.budgets.length] = budget;

			if (debug) Debugger.endMethod("BudgetService.addBudget()");

			return result;
		};

		this.getBudgetCategoryById = function(id) {
			if (debug) {
				startMethod("BudgetService.getBudgetCategoryById()");
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
				scriptError("BudgetService.js > getBudgetCategoryById()", "Tried finding a category that was not in customer.");
			}

			if (debug) {
				endMethod("BudgetService.getBudgetCategoryById()");
			}

			return result;
		};

		this.getBudget = function(date) {
			if (debug) {
				startMethod("BudgetService.getBudget()");
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
				scriptError("BudgetService.js > getBudget", "Could not find a budget matching " + date.toString() + " on customer: " + this.person.id);
			}

			if (debug) {
				endMethod("BudgetService.getBudget()");
			}

			return result;
		};

		this.getBudgetTemplates = function() {
			return this.budgetTemplates;
		};

		this.getActiveBudgetTemplate = function() {
			if (debug) {
				startMethod("BudgetService.getActiveBudgetTemplate()");
			}

			var i, result = null;
			for (i = 0; i < this.budgetTemplates.length; i++) {
				if (this.budgetTemplates[i].isActive) {
					result = this.budgetTemplates[i];
				}
			}

			if (debug) {
				if (result == null) {
					scriptError("BudgetService.js > getActiveBudgetTemplate()", "Could not find an active budgetTemplate on BudgetService: " + this.person.id);
				}
				endMethod("BudgetService.getActiveBudgetTemplate()");
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
		
		this.categorizeStatementLine = function(statementLine, budgetCategory) {
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

		this.updateBudgetCategory = function(category) {
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

		this.updateTransaction = function(transaction) {
			if (debug) {
				startMethod("TotalBank.updateTransaction()");
			}

			$('.statementLine[id="' + transaction.id + '"]').replaceWith(HTMLGenerator.getTransactionAsTableRow(transaction));

			if (debug) {
				endMethod("TotalBank.updateTransaction()");
			}

		};

		this.totalAssets = function() {
			return 0;
		};

		this.load = function() {
			this.loadExampleBudgets();
			User.registerService(this);
		};

		//Matches mot tjenester som kan brukes som plugin. 
		this.plugInOwner = function() {
			return 'budget';
		};

		//Dersom en av verdiene som returneres her matcher mot this.plugInOwner() hos den som kaller, kan denne tjenesten brukes som en plugin.
		this.plugin = function() {
			return ['bank'];
		};

		this.loadAsPlugin = function(target) {


		};

		this.loadAsService = function(target) {

		};

		this.setupExampleBudgets = function() {
			exampleBudgetCategories = getExampleBudgetCategories();
			exampleBudgetTemplate = getExampleBudgetTemplate(exampleBudgetCategories, true);
			exampleBudget1 = getExampleBudget(exampleBudgetTemplate, exampleStartDate1, exampleEndDate1);
			exampleBudget2 = getExampleBudget(exampleBudgetTemplate, exampleStartDate2, exampleEndDate2);

			this.budgetCategories = exampleBudgetCategories;
			this.addBudgetTemplate(examplebudgetTemplate1);
			this.addBudget(exampleBudget1);
			this.addBudget(examplebudget2);
		};

		this.getExampleBudgetTemplate = function (lines, isActive) {
			if (debug) {
				startMethod("getExampleBudgetTemplate()");
			}

			var i, result = new BudgetTemplate(standardJSidCounter++, "Mitt Budsjett", "Måndlig oversikt over inntekter og utgifter.", isActive);
			for (i = 0; i < lines.length; i++) {
				result.addBudgetLine(lines[i], 1000);
			}

			if (debug) {
				endMethod("getExampleBudgetTemplate()");
			}

			return result;

		};

		this.getExampleBudgetCategories = function () {
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
		};

		this.getExampleBudget = function (template, startDate, endDate) {
			if (debug) {
				startMethod("getExampleBudget()");
			}

			var result;

			result = new Budget(standardJSidCounter++, template, startDate, endDate);

			if (debug) {
				endMethod("getExampleBudget()");
			}

			return result;
		};
	};
	
	return BudgetService;
});
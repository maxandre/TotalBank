
define(["$"], function($) {

	function HTMLGenerator() {

		this.getTransactionsAsTable = function(transactions) {
			var table, thead, theadTr, theadTh, tbody, i;

			if (debug) startMethod("HTMLGenerator.getStatementAsTable()");

			table = document.createElement('table');
			table.setAttribute('class', 'table table-striped table-bordered table-condensed accountStatement');
			table.setAttribute('id', statement.account.accountNumber);
			thead = document.createElement('thead');
			theadTr = document.createElement('tr');

			theadTh = document.createElement('th');
			theadTh.innerHTMl = lang_date;
			theadTr.appendChild(theadTh);

			theadTh = document.createElement('th');
			theadTh.innerHTMl = lang_desc;
			theadTr.appendChild(theadTh);

			theadTh = document.createElement('th');
			theadTh.innerHTML = lang_amount;
			theadTh.setAttribute('colspan', '2');
			theadTh.setAttribute('class', 'align_right');
			theadTr.appendChild(theadTh);

			theadTh = document.createElement('th');
			theadTh.innerHTML = lang_budget;
			theadTr.appendChild(theadTh);

			thead.appendChild(theadTr);
			table.appendChild(thead);
			tbody = document.createElement('tbody');

			for (i = 0; i < transactions.length; i++) {
				tbody.appendChild(this.getTransactionAsTableRow(transactions[i]));
			}

			table.appendChild(tbody);

			if (debug) endMethod("HTMLGenerator.getStatementAsTable()");

			return table;
		};



		this.getTransactionAsTableRow = function(transaction) {
			var row = document.createElement('tr'), date, desc, cp, amount, menu, choice, inner;

			if (debug) startMethod("HTMLGenerator.getTransactionAsTableRow()");

			row.setAttribute('class', 'statementLine');
			row.setAttribute('id', transaction.id);
			date = document.createElement('td');
			date.setAttribute('class', 'statementLineDate');
			date.innerHTML = transaction.date.toShortString();
			desc = document.createElement('td');
			desc.setAttribute('class', 'statementLineDesc');
			desc.innerHTML = transaction.desc;
			cp = document.createElement('td');
			cp.setAttribute('class', 'statementLineCurrencyPrefix');
			cp.innerHTML = currencyPrefix;
			amount = document.createElement('td');
			amount.setAttribute('class', 'statementLineAmount');
			amount.innerHTML = addThousandSeparator(transaction.amount);
			if (transaction.amount < 0) {
				$(amount).addClass('negativeAmount');
			}
			menu = document.createElement('td');
			menu.setAttribute('class', 'statementLineChoices');

			choice= document.createElement('a');
			choice.setAttribute('class', 'statementLineRemoveCategory noLink');
			choice.setAttribute('href', '#');
			inner = document.createElement('i');
			inner.setAttribute('rel', 'tooltip');		
			if(transaction.categoryId > 0) {
				inner.setAttribute('class', 'icon-trash');
				inner.setAttribute('title', lang_tooltip_statementLineRemoveCategory);
			} else {
				inner.setAttribute('class', 'icon-share-alt');
				inner.setAttribute('title', lang_tooltip_statementLineAddCategory);
			}
			choice.appendChild(inner);
			menu.appendChild(choice);

			choice = document.createElement('a');
			choice.setAttribute('class', 'statementLineCreateRule noLink');
			choice.setAttribute('href', '#');
			inner = document.createElement('i');
			inner.setAttribute('class', 'icon-pencil');
			inner.setAttribute('title', lang_tooltip_statementLineCreateRule);
			choice.appendChild(inner);
			menu.appendChild(choice);

			row.appendChild(date);
			row.appendChild(desc);
			row.appendChild(cp);
			row.appendChild(amount);
			row.appendChild(menu);

			if (debug) endMethod("HTMLGenerator.getTransactionAsTableRow()");

			return row;
		};

		this.getBudgetAsTreeView = function (date) {
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


		this.getSubCategoryAsUL = function(subCategory) {
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

	};
	
	return new HTMLGenerator();
});
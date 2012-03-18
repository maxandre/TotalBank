define(function() {

	function CashTransaction(id, date, desc, amount, categoryId) {

		if (debug) startMethod("new CashTransaction()");
		this.id = id;
		this.accountNumber = 0;
		this.fromAccount = 0;
		this.toAccount = 0;
		this.date = date;
		this.desc = desc;
		this.amount = amount;
		this.category = categoryId;
		this.bankTransaction = false;

		this.setCategoryId = function(id) {
			this.categoryId = id;
		};

		this.getCategoryId = function() {
			return this.categoryId;
		};

		this.getBudgetAmount = function() {
			return this.amount;
		};

		if (debug) endMethod("new CashTransaction()");
	};
	
	return CashTransaction;
	
});
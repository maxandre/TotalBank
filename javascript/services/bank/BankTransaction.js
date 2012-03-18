
define(function() {

	function BankTransaction(id, accountNumber, fromAccount, toAccount, date, desc, amount, categoryId) {

		if (debug) startMethod("new BankTransaction()");
		this.id = id;
		this.accountNumber = accountNumber;
		this.fromAccount = fromAccount;
		this.toAccount = toAccount;
		this.date = date;
		this.desc = desc;
		this.amount = amount;
		this.categoryId = 0;
		if (categoryId) this.categoryId = categoryId;
		this.bankTransaction = true;

		this.setCategoryId = function(id) {
			this.categoryId = id;
		};

		this.getCategoryId = function() {
			return this.categoryId;
		};

		this.getBudgetAmount = function() {
			if (debug) startMethod("bankTransaction.getBudgetAmount()");
			var result = 0;
			if (this.accountNumber == this.fromAccount) {
				if (this.amount > 0) result = -this.amount;
				else result = this.amount;
			}
			else if (this.accountNumber = this.toAccount) {
				if (this.amount > 0) result = this.amount;
				else result = -this.amount;

			}
			if (debug) endMethod("bankTransaction.getBudgetAmount()");
			return result;
		};
		if (debug) endMethod("new BankTransaction()");
	}
	
	return BankTransaction;
});
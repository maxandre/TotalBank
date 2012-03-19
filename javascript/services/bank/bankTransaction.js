
define(['BackBone', 'deBugger'], function(BackBone, deBugger) {

	deBugger.startMethdo("BankTransaction()");
	//Calls to new should inclue the following variables: id, accountNumber, fromAccount, toAccount, date, desc, amount[, categoryId]
	var BankTransaction = BackBone.Model.extend({

		setCategoryId: function(id) {
			this.categoryId = id;
		},

		getCategoryId: function() {
			return this.categoryId;
		},

		getBudgetAmount: function() {
			deBugger.startMethod("bankTransaction.getBudgetAmount()");
			var result = 0;
			if (this.accountNumber == this.fromAccount) {
				if (this.amount > 0) result = -this.amount;
				else result = this.amount;
			}
			else if (this.accountNumber = this.toAccount) {
				if (this.amount > 0) result = this.amount;
				else result = -this.amount;

			}
			deBugger.endMethod("bankTransaction.getBudgetAmount()");
			return result;
		},
		
		transactionType: 'bank',
	});
	
	return BankTransaction;
});
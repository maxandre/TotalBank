
define(function() {

	function BankStatement(account, startDate, endDate, transactions) {

		if (debug) {
			startMethod("bankStatement()");
		}

		this.account = account;
		this.startDate = startDate;
		this.endDate = endDate;

		if (transactions) {
			this.transactions = transactions;

		} else {
			this.transactions = [];
		}

		this.addTransaction = function (transaction) {
			if (debug) {
				startMethod("addTransaction()");
			}

			if (transaction.date.inRange(this.startDate, this.endDate) && transaction.accountNumber === this.account.accountNumber) {
				this.transactions[this.transactions.length] = transaction;

			} else {
				scriptError("BankStatement.js > addTransaction()", "Tried adding transaction to bankStatement with differen accountnumber or month.");
			}

			if (debug) {
				endMethod("addTransaction()");
			}
		};

		this.ingoingBalance = function () {
			return this.account.getIngoingBalance(this.startDate);
		};

		this.outgoingBalance = function () {
			return this.account.getOutgoingBalance(this.endDate);
		};

		if (debug) {
			endMethod("bankStatement()");
		}
	};
	
	return BankStatement;
});
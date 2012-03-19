
define(function() {
	
	function Account(accountNumber, owner, name, balance, available, transactions) {

		if (debug) {
			startMethod("account()");
		}

		this.accountNumber = accountNumber;
		this.owner = owner;
		this.name = name;
		this.balance = balance;
		this.available = available;

		if (transactions) {
			this.transactions = transactions;
		} else {
			this.transactions = [];
		}

		this.addTransaction = function (transaction) {
			if (debug) {
				startMethod("addTransactions()");
			}
			if (this.transactions.indexOf(transaction) < 0) {
				this.transactions[this.transactions.length] = transaction;
			} else {
				scriptError("Account.js > addTransaction()", "Tried adding a transaction to the account that already existed in the account.");
			}
			if (debug) {
				endMethod("addTransactions()");
			}

		};
		this.getTransactions = function (startDate, endDate) {
			if (debug) {
				startMethod("getTransactions()");
			}

			var result = [], optionalEndDate, i;

			if (!endDate) {
				startDate = new BankDate(startDate.year, startDate.month, 1);
				optionalEndDate = new BankDate(startDate.year, startDate.month, getDaysInMonth(startDate));
			} else {
				optionalEndDate = endDate;
			}

			for (i = 0; i < this.transactions.length; i += 1) {
				if (this.transactions[i].date.inRange(startDate, optionalEndDate)) {
					result[result.length] = this.transactions[i];
				}
			}
			if (debug) {
				endMethod("getTransactions()");
			}

			return result;
		};

		this.getTransactionById = function (id) {
			if (debug) {
				startMethod("accountGetTransactionById()");
			}

			var result = null, i = 0;
			addCode("Looking for transaction with id: " + id + " in account number: " + this.accountNumber);
			for (i = 0; i < this.transactions.length; i += 1) {
				addCode("Checking agains transaction with id: " + this.transactions[i].id);
				if (this.transactions[i].id == id) {
					result = this.transactions[i];
					break;
				} else {
					addCode(this.transactions[i].id + " did not match " + id);
				}
			}
			if (debug) {
				endMethod("accountGetTransactionById()");
			}
			addCode("Returning transaction with id: " + result.id);
			return result;
		};

		this.getStatement = function (startDate, endDate) {
			if (debug) {
				startMethod("getStatement()");
			}

			var result, trans, optionalEndDate, i;

			if (!endDate) {
				startDate = new BankDate(startDate.year, startDate.month, 1);
				optionalEndDate = new BankDate(startDate.year, startDate.month, getDaysInMonth(startDate));
			} else {
				optionalEndDate = endDate;
			}
			result = new BankStatement(this, startDate, optionalEndDate);
			trans = this.getTransactions(startDate, optionalEndDate);
			for (i = 0; i < trans.length; i += 1) {
				result.addTransaction(trans[i]);
			}
			if (debug) {
				endMethod("getStatement()");
			}

			return result;
		};

		if (debug) {
			endMethod("account()");
		}
	};
	
	return Account;
});
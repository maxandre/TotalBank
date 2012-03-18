define(function() {

	function Bank(id, name) {

		"use strict";
		if (debug) startMethod("new Customer()");

		this.getId = function(){return id;};
		this.name = name;
		this.accounts = [];

		this.addAccount = function(account) {
			"use strict";
			this.accounts[this.accounts.length] = account;
		};

		this.getAccount = function(accountNumber) {
			"use strict";
			var result = null, i;

			if (debug) startMethod("customer.getAccount()");

			result = null;
			if (this.accounts.length > 0) {
				for (i = 0; i < this.accounts.length; i += 1) {
					if (this.accounts[i].accountNumber == accountNumber) { 
						result = this.accounts[i];
					}
				}
			}

			if (result === null) {
				scriptError("Customer.js > getAccount()", "Could not find the requested accountnumer: " + accountNumber);
			}

			if (debug) endMethod("customer.getAccount()");

			return result;
		};

		this.getTransactionById = function(id) {
			if (debug) {
				startMethod("customer.getTransactionById()");
			}

			var i, result = null;
			for(i = 0; i < accounts.length; i++) {
				result = accounts[i].getTransactionById(id);
				if (result != null) break;
			}
			if (debug) {
				endMethod("customer.getTransactionById()");
			}

			return result;
		};

		this.totalAssets = function() {
			if (debug) {
				startMethod("customer.totalAssets()");
			}

			var result, i;

			result = 0;
			for (i = 0; i < this.accounts.length; i += 1) {
				result += this.accounts[i].available;
			}

			if (debug) {
				endMethod("customer.totalAssets(). Result = " + result);
			}

			return result;
		};



		if (debug) {
			endMethod("new Customer()");
		}
	}

	return Bank;
});
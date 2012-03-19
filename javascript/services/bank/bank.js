define(['BackBone', 'deBugger'], function(BackBone, deBugger) {

	deBugger.startMethod("Customer()");
	//Calls to new should inclue the following variables: id, name
	var Bank = BackBone.Model.extend({
		
		addAccount: function(account) {
			"use strict";
			this.accounts[this.accounts.length] = account;
		},

		getAccount: function(accountNumber) {
			"use strict";
			var result = null, i;

			deBugger.startMethod("customer.getAccount()");

			result = null;
			if (this.accounts.length > 0) {
				for (i = 0; i < this.accounts.length; i += 1) {
					if (this.accounts[i].accountNumber == accountNumber) { 
						result = this.accounts[i];
					}
				}
			}

			if (result === null) {
				deBugger.scriptError("Customer.js > getAccount()", "Could not find the requested accountnumer: " + accountNumber);
			}

			deBugger.endMethod("customer.getAccount()");

			return result;
		},

		getTransactionById: function(id) {
			deBugger.startMethod("customer.getTransactionById()");

			var i, result = null;
			for(i = 0; i < accounts.length; i++) {
				result = accounts[i].getTransactionById(id);
				if (result != null) break;
			}
			deBugger.endMethod("customer.getTransactionById()");
			
			return result;
		},

		totalAssets: function() {
			deBugger.startMethod("customer.totalAssets()");

			var result, i;

			result = 0;
			for (i = 0; i < this.accounts.length; i += 1) {
				result += this.accounts[i].available;
			}

			deBugger.endMethod("customer.totalAssets(). Result = " + result);

			return result;
		},

		accounts: [],

	});
	
	deBugger.endMethod("Bank()");
	return Bank;
});
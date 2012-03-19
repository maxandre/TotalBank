
define(['jQuery', 'BackBone', 'deBugger'], function($, BackBone, deBugger) {

	var BankService = BackBone.Model.extend({
		
		addBank: function(bank) {
			this.banks[this.banks.length] = bank;
		},

		getBank: function(id) {
			var result = null, i;
			for (i = 0; i < banks.length; i++) {
				if (banks[i].getId() == id) {
					result = banks[i];
					break;
				}
			}
			return result;
		},
		
		totalAssets: function() {
			"use strict";
			var result = 0, i;
			for (i = 0; i < banks.length; i++) {
				result += banks[i].totalAssets();
			}
			return result;
		},
		
		load: function() {
			this.loadExampleBanks();
			User.registerService(this);
		},

		loadAsPlugin: function(target) {
			//Does nothing as this is not a plugin.
		},

		//TODO Kode for å starte bank-tjenesten.
		loadAsService: function(target) {
			$(document).delegate('.statementLineRemoveCategory', 'click.slrc', function(event) {
				var trans = TotalBank.getCustomer().getTransactionById($(this).parent().parent().attr('id'));
				var cat = TotalBank.getCustomer().getBudgetCategoryById(trans.categoryId);
				cat.removeTransaction(trans);
				TotalBank.updateBudgetCategory(cat);
				TotalBank.updateTransaction(trans);
			});
		},


		loadExampleBanks: function () {
			// getExampleAccount(accountNumber, owner, name, balance, available) {
			if (debug) {
				startMethod("getExampleAccount()");
			}

			var result, tran, i;

			result = new Account(accountNumber, owner, name, balance, available);
			tran = getExampleBankTransactions(accountNumber);

			for (i = 0; i < tran.length; i += 1) {
				result.addTransaction(tran[i]);
			}

			if (debug) {
				endMethod("getExampleAccount()");
			}

			return result;
		},

		getExampleBankTransactions: function(accountNumber) {
			if (debug) startMethod("getExampleBankStatement()");

			var result = [];
			result[result.length] = new BankTransaction(standardJSidCounter++, accountNumber, accountNumber, 0, new BankDate(2011, 4, 3), "Rema 1000", -103.43, 0);
			result[result.length] = new BankTransaction(standardJSidCounter++, accountNumber, accountNumber, 0, new BankDate(2011, 4, 5), "Rimi", -203.43, 0);
			result[result.length] = new BankTransaction(standardJSidCounter++, accountNumber, accountNumber, 0, new BankDate(2011, 4, 6), "Frisør", -503.43, 0);
			result[result.length] = new BankTransaction(standardJSidCounter++, accountNumber, accountNumber, 0, new BankDate(2011, 4, 9), "Parkeringsbot", -703.43, 0);
			result[result.length] = new BankTransaction(standardJSidCounter++, accountNumber, accountNumber, 0, new BankDate(2011, 4, 14), "Husleie", -8000, 0);
			result[result.length] = new BankTransaction(standardJSidCounter++, accountNumber, 0, accountNumber, new BankDate(2011, 4, 21), "Husleie fra leieboer", 4000, 0);

			result[result.length] = new BankTransaction(standardJSidCounter++, accountNumber, accountNumber, 0, new BankDate(2011, 5, 3), "Rema 1001", -508.74, 0);
			result[result.length] = new BankTransaction(standardJSidCounter++, accountNumber, accountNumber, 0, new BankDate(2011, 5, 5), "Rimi 2", -736.01, 0);
			result[result.length] = new BankTransaction(standardJSidCounter++, accountNumber, accountNumber, 0, new BankDate(2011, 5, 6), "Tannlege", -5250, 0);
			result[result.length] = new BankTransaction(standardJSidCounter++, accountNumber, accountNumber, 0, new BankDate(2011, 5, 9), "Fartsbot. Hmm. Nå lurer jeg på hva som " + 
					"skjer hvis denne beskrivelsen av transaksjonen blir veldig lang. Blir den kuttet, eller vil tabellen utvide seg i høyden?" + 
					" Jeg må vist bare fortsett å skrive så den skal bli lang nok. Hva med litt mat nå? Høres bra ut!", -3000, 0);
			result[result.length] = new BankTransaction(standardJSidCounter++, accountNumber, accountNumber, 0, new BankDate(2011, 5, 14), "Husleie", -8000, 0);
			result[result.length] = new BankTransaction(standardJSidCounter++, accountNumber, 0, accountNumber, new BankDate(2011, 5, 21), "Husleie fra leieboer", 4000, 0);

			if (debug) endMethod("getExampleBankStatement()");
			return result;
		},
		
		plugInOwner: 'bank',
		plugin: [],
		banks: [],

	});
	
	return new BankService;
});
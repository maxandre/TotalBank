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
}

function getExampleBankTransactions(accountNumber) {
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
}

function getExampleCashTransactions(startDate, endDate) {
	var result = [];
	//TO-DO
	return result;
}

var transactionJSLoaded = true;
/*jslint browser: true, white: true, evil: true, devel: true, sloppy: true*/
/*global BankDate, BankStatement, Customer, Person, Address, Browser, addCode, alert, debug, document, endMethod, getDaysInMonth, include, includeLocale, navigator, prepare, runningMethod, scriptError, standardJSidCounter, standardJSinnrykk, startMethod, writeCode*/
/*global bankStatementAddTransaction, bankStatementIngoingBalance, bankStatementOutgoingBalance*/
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

	this.addTransaction = bankStatementAddTransaction;
	this.ingoingBalance = bankStatementIngoingBalance;
	this.outgoingBalance = bankStatementOutgoingBalance;

	if (debug) {
		endMethod("bankStatement()");
	}
}

function bankStatementAddTransaction(transaction) {
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
}

function bankStatementIngoingBalance() {
	return this.account.getIngoingBalance(this.startDate);
}

function bankStatementOutgoingBalance() {
	return this.account.getOutgoingBalance(this.endDate);
}

var bankStatementJSLoaded = true;
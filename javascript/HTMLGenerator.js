(function(HTMLGenerator, $, undefined) {
	
	HTMLGenerator.getTransactionsAsTable = function(transactions) {
		var table, thead, theadTr, theadTh, tbody, i;
		
		if (debug) startMethod("HTMLGenerator.getStatementAsTable()");

		table = document.createElement('table');
		table.setAttribute('class', 'table table-striped table-bordered table-condensed accountStatement');
		table.setAttribute('id', statement.account.accountNumber);
		thead = document.createElement('thead');
		theadTr = document.createElement('tr');
		
		theadTh = document.createElement('th');
		theadTh.innerHTMl = lang_date;
		theadTr.appendChild(theadTh);
		
		theadTh = document.createElement('th');
		theadTh.innerHTMl = lang_desc;
		theadTr.appendChild(theadTh);
		
		theadTh = document.createElement('th');
		theadTh.innerHTML = lang_amount;
		theadTh.setAttribute('colspan', '2');
		theadTh.setAttribute('class', 'align_right');
		theadTr.appendChild(theadTh);
		
		theadTh = document.createElement('th');
		theadTh.innerHTML = lang_budget;
		theadTr.appendChild(theadTh);
		
		thead.appendChild(theadTr);
		table.appendChild(thead);
		tbody = document.createElement('tbody');
		
		for (i = 0; i < transactions.length; i++) {
			tbody.appendChild(this.getTransactionAsTableRow(transactions[i]));
		}
		
		table.appendChild(tbody);
		
		if (debug) endMethod("HTMLGenerator.getStatementAsTable()");

		return table;
	};


	
	HTMLGenerator.getTransactionAsTableRow = function(transaction) {
		var row = document.createElement('tr'), date, desc, cp, amount, menu, choice, inner;
	
		if (debug) startMethod("HTMLGenerator.getTransactionAsTableRow()");
		
		row.setAttribute('class', 'statementLine');
		row.setAttribute('id', transaction.id);
		date = document.createElement('td');
		date.setAttribute('class', 'statementLineDate');
		date.innerHTML = transaction.date.toShortString();
		desc = document.createElement('td');
		desc.setAttribute('class', 'statementLineDesc');
		desc.innerHTML = transaction.desc;
		cp = document.createElement('td');
		cp.setAttribute('class', 'statementLineCurrencyPrefix');
		cp.innerHTML = currencyPrefix;
		amount = document.createElement('td');
		amount.setAttribute('class', 'statementLineAmount');
		amount.innerHTML = addThousandSeparator(transaction.amount);
		if (transaction.amount < 0) {
			$(amount).addClass('negativeAmount');
		}
		menu = document.createElement('td');
		menu.setAttribute('class', 'statementLineChoices');

		choice= document.createElement('a');
		choice.setAttribute('class', 'statementLineRemoveCategory noLink');
		choice.setAttribute('href', '#');
		inner = document.createElement('i');
		inner.setAttribute('rel', 'tooltip');		
		if(transaction.categoryId > 0) {
			inner.setAttribute('class', 'icon-trash');
			inner.setAttribute('title', lang_tooltip_statementLineRemoveCategory);
		} else {
			inner.setAttribute('class', 'icon-share-alt');
			inner.setAttribute('title', lang_tooltip_statementLineAddCategory);
		}
		choice.appendChild(inner);
		menu.appendChild(choice);
		
		choice = document.createElement('a');
		choice.setAttribute('class', 'statementLineCreateRule noLink');
		choice.setAttribute('href', '#');
		inner = document.createElement('i');
		inner.setAttribute('class', 'icon-pencil');
		inner.setAttribute('title', lang_tooltip_statementLineCreateRule);
		choice.appendChild(inner);
		menu.appendChild(choice);
		
		row.appendChild(date);
		row.appendChild(desc);
		row.appendChild(cp);
		row.appendChild(amount);
		row.appendChild(menu);

		if (debug) endMethod("HTMLGenerator.getTransactionAsTableRow()");
		
		return row;
	};
	
}(window.HTMLGenerator = window.HTMLGenerator || {}, jQuery));
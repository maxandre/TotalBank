function includeJS(jsFile) {
	"use strict";
    var script = document.createElement("script");
    script.src = jsFile; // change file to your jQuery library
    script.type = "text/javascript";        
    script.charset = "UTF-8";
    document.getElementsByTagName("head")[0].appendChild(script);
}

function loadUser(message) {
	document.body.style.cursor = 'wait';
	if (isJSLoaded() === true) {
		prepareJavascript();
		prepareExampleCustomer();
		writeTopMenu();
//		loadContent("left_menu", "meny_forsiden.html", "none", 1000);
//		loadContent("main_content_1", "accounts.html", "scale", 1000);
//		loadContent("main_content_2", "statement.html", "none", 0);
//		loadContent("right_content_2", "budget.html", "none", 0);
		writeFooter();



		for (var i = 0; i < topMenuButtons.length; i++) {
			addCode($(topMenuButtons[i]).width());
			addCode($(topMenuButtons[i]).offset().left);
			topMenuButtonsLeft[i] = parseInt($(topMenuButtons[i]).offset().left);
		}
		var width = topMenuButtonsLeft[1] - topMenuButtonsLeft[0];
		var offset = topMenuButtonsLeft[0];
		$('#top_menu_pill').width(width).offset({left: offset});
		$('#top_menu_container').on('mousemove.trackPillInstance', function(event) {
			TotalBank.mouseX = event.pageX;
			TotalBank.mouseY = event.pageY;
			event.stopPropagation();
		});
		TotalBank.trackPill = true;
		TotalBank.trackPillFunction();

		$('#top_menu_container').on('mouseenter.trackPill', function(event) {
			$('#top_menu_container').on('mousemove.trackPillInstance', function(event) {
				TotalBank.mouseX = event.pageX;
				TotalBank.mouseY = event.pageY;
				event.stopPropagation();
			});
			TotalBank.trackPill = true;
			TotalBank.trackPillFunction();
		});
		
		$('#top_menu_container').on('mouseleave.trackPill', function(event) {
			TotalBank.trackPill = false;
			$('#top_menu_container').off('mousemove.trackPillInstance');
		});
		setTimeout("document.body.style.cursor = 'default';", 1000);

	} else {
		document.getElementById('main_content_1').innerHTML = message;
		message += ".";
		setTimeout("loadTotalBank(" + message + ");", 500);
	}
}

function isJSLoaded() {
	try {
		if ($ && jQuery && debuggingJSLoaded && accountJSLoaded && addressJSLoaded && bankStatementJSLoaded && budgetCategoryJSLoaded && budgetStaticsJSLoaded) {
			if (budgetTemplateJSLoaded && customerJSLoaded && dragNdropJSLoaded && personJSLoaded && transactionJSLoaded && content_loaderJSLoaded) {
				if (language_defaultJSLoaded && locale_settings_defaultJSLoaded && customer_defaultJSLoaded && TotalBank && HTMLGenerator) return true;
			}
		}
	} catch (ReferenceError) {
		return false;
	}
	return false;
}



function prepareJavascript() {
	"use strict";
	var i, j;
	standardJSinnrykk = "";
	standardJSidCounter = 1;
	if (!Array.prototype.indexOf) {
		Array.prototype.indexOf = function(obj, fromIndex) {
			if (fromIndex === null) {
				fromIndex = 0;
			} else if (fromIndex < 0) {
				fromIndex = Math.max(0, this.length + fromIndex);
			}
			for (i = fromIndex, j = this.length; i < j; i += 1) {
				if (this[i] === obj) {
					return i;
				}
			}
			return -1;
		};
	}
}
/*
includeJS("javascript/jquery/jquery-1.7.1.min.js");
includeJS("javascript/jquery/jquery-ui-1.8.18.custom.min.js");
includeJS("javascript/jquery/jquery.hoverIntent.js");
includeJS("javascript/bootstrap/bootstrap.min.js");
includeJS("javascript/bootstrap/bootstrap-tooltip.js");
includeJS("javascript/bootstrap/bootstrap-alert.js");
includeJS("javascript/bootstrap/bootstrap-button.js");
includeJS("javascript/debugging.js");
includeJS("javascript/locale/BankDate.js");
includeJS("javascript/locale/language_default.js");
includeJS("javascript/locale/locale_settings_default.js");
includeJS("javascript/content_loader.js");
includeJS("javascript/customer/customer_default.js");
includeJS("javascript/customer/Account.js");
includeJS("javascript/customer/Address.js");
includeJS("javascript/customer/BankStatement.js");
includeJS("javascript/customer/Budget.js");
includeJS("javascript/customer/BudgetCategory.js");
includeJS("javascript/customer/budgetStatics.js");
includeJS("javascript/customer/BudgetTemplate.js");
includeJS("javascript/customer/Customer.js");
includeJS("javascript/customer/dragNdrop.js");
includeJS("javascript/customer/Person.js");
includeJS("javascript/customer/Transaction.js");
includeJS("javascript/TotalBank.js");
includeJS("javascript/HTMLGenerator.js");
*/
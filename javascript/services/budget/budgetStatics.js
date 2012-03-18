
var budgetBackgroundColors = [];
budgetBackgroundColors[0] = "#00FF00";
budgetBackgroundColors[1] = "#33FF00";
budgetBackgroundColors[2] ="#99FF00";
budgetBackgroundColors[3] ="#FFFF00";
budgetBackgroundColors[4] ="#FFCC00";
budgetBackgroundColors[5] ="#FF9900";
budgetBackgroundColors[6] ="#FF6600";
budgetBackgroundColors[7] ="#FF3300";
budgetBackgroundColors[8] ="#FF0000";

var budgetBackgroundHighlightColors = [];
budgetBackgroundHighlightColors[0] = "#00FF00";
budgetBackgroundHighlightColors[1] = "#33FF00";
budgetBackgroundHighlightColors[2] ="#99FF00";
budgetBackgroundHighlightColors[3] ="#FFFF00";
budgetBackgroundHighlightColors[4] ="#FFCC00";
budgetBackgroundHighlightColors[5] ="#FF9900";
budgetBackgroundHighlightColors[6] ="#FF6600";
budgetBackgroundHighlightColors[7] ="#FF3300";
budgetBackgroundHighlightColors[8] ="#FF0000";


function getBudgetColor(percentage) {
	var result = budgetBackgroundColors[0];
	if (percentage > 2) result = budgetBackgroundColors[8];
	else if (percentage > 1.9) result = budgetBackgroundColors[7];
	else if (percentage > 1.7) result = budgetBackgroundColors[6];
	else if (percentage > 1.5) result = budgetBackgroundColors[5];
	else if (percentage > 1.3) result = budgetBackgroundColors[4];
	else if (percentage > 1.1) result = budgetBackgroundColors[3];
	else if (percentage > 0.9) result = budgetBackgroundColors[2];
	else if (percentage > 0.7) result = budgetBackgroundColors[1];
	return result;
}

function getBudgetHighlightColor(normalColor) {
	index = budgetBackgroundColors.indexOf(normalColor);
	return budgetBackgroundHighlightColors[index];
}


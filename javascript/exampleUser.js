var standardJSidCounter, bankCustomer, address, dob, person, exampleMonth1, exampleStartDate1, exampelEndDate1, exampleAccountNumber,
		otherExampleAccountNumber, exampleAccount, otherExampleAccount, exampleMonth2, exampleStartDate2, exampleEndDate2,
		exampleBudgetCategories, exampleBudgetTemplate, exampleBudget1, exampleBudget2;

function prepareExampleCustomer() {
	standardJSidCounter = 1;
	address = new Address("Aolph Bergs Vei 50 D", "", 5089, "Bergen", "NO");
	dob = new BankDate(1979, 3, 22);
	person = new Person(22037930559, "Max", "Andrè", "Müller", dob, address, "max.andre.muller@gmail.com", "92842983", "", "92842983");
	exampleMonth1 = new BankMonth(2011, 5);
	exampleStartDate1 = new BankDate(2011, 5, 1);
	exampleEndDate1 = new BankDate(2011, 5, 31);
	exampleAccountNumber = 12345;
	exampleMonth2 = new BankMonth(2011, 4);
	exampleStartDate2 = new BankDate(2011, 4, 1);
	exampleEndDate2 = new BankDate(2011, 4, 30);
	otherExampleAccountNumber = 24680;
	bankCustomer = new Customer(person);
	exampleAccount = getExampleAccount(exampleAccountNumber, bankCustomer, "Lønnskonto", 15235.78, 14998.97);
	otherExampleAccount = getExampleAccount(otherExampleAccountNumber, bankCustomer, "Brukskonto", 24521.03, 24521.03);
	bankCustomer.addAccount(exampleAccount);
	bankCustomer.addAccount(otherExampleAccount);
	exampleBudgetCategories = getExampleBudgetCategories();
	exampleBudgetTemplate = getExampleBudgetTemplate(exampleBudgetCategories, true);
	exampleBudget1 = getExampleBudget(exampleBudgetTemplate, exampleStartDate1, exampleEndDate1);
	exampleBudget2 = getExampleBudget(exampleBudgetTemplate, exampleStartDate2, exampleEndDate2);
	bankCustomer.budgetCategories = exampleBudgetCategories;
	bankCustomer.addBudgetTemplate(exampleBudgetTemplate);
	bankCustomer.addBudget(exampleBudget1);
	bankCustomer.addBudget(exampleBudget2);
	TotalBank.setCustomer(bankCustomer);
	TotalBank.setActiveAccount(bankCustomer.accounts[0]);
	TotalBank.setCurrentRange(exampleStartDate1, exampleEndDate1);
}
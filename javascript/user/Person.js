
define(function() {

	function Person(id, firstName, middleName, lastName, dateOfBirth, address, email, homePhone, workPhone, cellPhone) {

		"use strict";

		if (debug) {
			startMethod("person()");
		}

		this.id = id;
		this.firstName = firstName;
		this.middleName = middleName;
		this.lastName = lastName;
		this.dateOfBirth = dateOfBirth;
		this.address = address;
		this.email = email;
		this.homePhone = homePhone;
		this.workPhone = workPhone;
		this.cellPhone = cellPhone;

		if (debug) {
			endMethod("person()");
		}
	};
	
	return Person;
});
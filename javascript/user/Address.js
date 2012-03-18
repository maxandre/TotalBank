
define(function() {

	function Address(addressLine1, addressLine2, zipCode, zipPlace, country) {

		"use strict";
		this.addressLine1 = addressLine1;
		this.addressLine2 = addressLine2;
		this.zipCode = zipCode;
		this.zipPlace = zipPlace;
		this.country = country;
	};
	
	return Address;
	
});
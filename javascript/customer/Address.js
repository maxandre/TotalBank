/*jslint browser: true, white: true, evil: true, devel: true*/
/*global Browser, addCode, alert, debug, document, endMethod, getDaysInMonth, include, includeLocale, navigator, prepare, runningMethod, scriptError, standardJSidCounter, standardJSinnrykk, startMethod, writeCode*/

function Address(addressLine1, addressLine2, zipCode, zipPlace, country) {
	"use strict";
	this.addressLine1 = addressLine1;
	this.addressLine2 = addressLine2;
	this.zipCode = zipCode;
	this.zipPlace = zipPlace;
	this.country = country;
}

var addressJSLoaded = true;
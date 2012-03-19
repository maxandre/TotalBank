
define(["$"], function($) {

	function Animation() {
		this.mouseX = -1;
		this.mouseY = -1;


		this.startTrackingMouse = function(scope, namespace) {
			"use strict";
			if (!scope || !namespace) throw "IllegalArgument - User.startTrackingMouse";
			if (debug) startMethod("User.startTrackingMouse()");
			$(scope).on('mousemove.' + namespace, function(event) {
				User.mouseX = event.pageX;
				User.mouseY = event.pageY;
			});
			if (debug) endMethod("User.startTrackingMouse()");
		};

		this.stopTrackingMouse = function(scope, namespace) {
			if (!scope || !namespace) throw "IllegalArgument - User.trackmouse";
			if (debug) startMethod("User.stopTrackingMouse()");
			$(scope).off('mousemove.' + namespace);
			if (debug) endMethod("User.stopTrackingMouse()");
		};

		this.trackTopMenuPillFunction = function() {
			var targetX = 0, targetW = 0, startX = $('#top_menu_pill').offset().left;
			if (this.trackPill) {
				if (this.mouseX < $(topMenuButtons[0]).offset().left) {
					targetX = $(topMenuButtons[0]).offset().left;
					targetW = $(topMenuButtons[1]).offset().left - targetX;
				} else if (this.mouseX > $(topMenuButtons[topMenuButtons.length-1]).offset().left) { 
					targetX = $(topMenuButtons[topMenuButtons.length-1]).offset().left;
					targetW = $(topMenuButtons[topMenuButtons.length-1]).width() + 20;
				} else {
					for (var i = topMenuButtons.length -2; i >= 0; i--) {
						if (this.mouseX > $(topMenuButtons[i]).offset().left) {
							targetX = $(topMenuButtons[i]).offset().left;
							targetW = $(topMenuButtons[i+1]).offset().left - targetX;
							i = -1;
						}
					}
				}

				if (targetX != startX) {
					$('#top_menu_pill').animate({
						left: targetX,
						width: targetW
					}, 100, 'linear', function() {
						TotalBank.trackPillFunction();
					});
				} else {
					setTimeout("TotalBank.trackPillFunction();", 100);
				}
			} else {
				if (lastTopMenuButtonPressed === topMenuButtons.length-1) {
					targetX = $(topMenuButtons[topMenuButtons.length-1]).offset().left;
					targetW = $(topMenuButtons[topMenuButtons.length-1]).width() + 20;
				} else {
					targetX = $(topMenuButtons[lastTopMenuButtonPressed]).offset().left;
					targetW = $(topMenuButtons[lastTopMenuButtonPressed + 1]).offset().left - targetX;
				}
				if (targetX != startX) {
					$('#top_menu_pill').animate({
						left: targetX,
						width: targetW
					}, 1000, 'swing');
				}
			}

		};
		var resizecounter = 0;
		var blockResize = false;
		$(window).resize(function() {
			Animation.onWindowResize();
		});
		this.onWindowResize = function() {
			var counter = ++resizecounter;
			var startX = $('#top_menu_pill').offset().left;
			addCode("resizing");
			for (var i = 0; i < topMenuButtons.length; i++) {
				topMenuButtonsLeft[i] = parseInt($(topMenuButtons[i]).offset().left);
			}
			targetX = topMenuButtonsLeft[lastTopMenuButtonPressed] - 2;
			targetW = $(topMenuButtons[lastTopMenuButtonPressed]).width() + 20;
			if (targetX != startX && counter == resizecounter && !blockResize) {
				blockResize = true;
				addCode("moving pill");
				$('#top_menu_pill').animate({
					left: targetX,
					width: targetW
				}, 1000, 'swing', function() {
					blockResize = false;
				});
			}
		};


	};
	
	return new Animation();
	
});


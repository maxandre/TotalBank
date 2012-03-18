var elementBeingDragged, elementBeingHovered, copy, elementBeingDraggedMouseOffset = new Object();

function addDragNdropToBudget(dragSelector, dropSelector, scope, onSuccessfulDrop) {
	if (debug) startMethod("addDragNdrop()");

	/* Might use this to automatically define scope. 
	 *
	 * var commonParent = $(dragSelector).parents("div").has(dropSelector).last();
	 * addCode("commom parent is " + $(commonParent).attr("id"));
	 *
	*/
	$(document).undelegate('.statementLine > td[class!=\"statementLineChoices\"]', 'mousedown.myDrag');
	$(document).delegate('.statementLine > td[class!=\"statementLineChoices\"]', 'mousedown.myDrag', function(event) {
		event.preventDefault();
		//Input
		$(scope).css('cursor', 'move');
		if (elementBeingDragged) {
			scriptError("dragNdrop.js > addDragNdrop()","There was already an elementBeingDragged. SHOULD NOT HAPPEN!");
		}
		elementBeingDragged = $(this).parent();
		if(!elementBeingDragged) {
			scriptError("dragNdrop.js > addDragNdrop()", "elementBeingDragged was null. SHOULD NOT HAPPEN!");
		}
		var pos = $(this).offset();
		elementBeingDraggedMouseOffset.x = pos.left - event.pageX;
		elementBeingDraggedMouseOffset.y = pos.top - event.pageY;
		copy = $(elementBeingDragged).clone().addClass('beingDragged').width($(this).width()).offset({ top: pos.top, left: pos.left }).appendTo(scope);
		$(copy).attr('id', 'copy');
		
		$(scope).on('mousemove.trackDrag', function(event) {
			$(copy).offset({ top: event.pageY + elementBeingDraggedMouseOffset.y, left: event.pageX + elementBeingDraggedMouseOffset.x });
		});

		$(dropSelector).on('mouseenter.myDrop', function(event) {
			if ($(elementBeingDragged).hasClass(dragSelector.substring(1)) || $(elementBeingDragged).attr('id') == dragElement.substring(1)) {
				elementBeingHovered = this;
				$(this).addClass('hover');
			} 
		});
		
		$(dropSelector).on('mouseleave.myDrop', function(event) {
			if (elementBeingHovered === this) {
				elementBeingHovered = null;
				$(this).removeClass('hover');
			}
		});
		$(document).on('mouseup.myDrop', function(event) {
			var success = false;
			if (elementBeingDragged && elementBeingHovered && ($(elementBeingHovered).hasClass(dropSelector.substring(1)) || $(elementBeingHovered).attr('id') == dropSelector.substring(1))) {
				$(copy).hide('scale', { percent: 0 }, 1000, function() {
					$(copy).remove();
					copy = null;
				});
				success = true;
			} else if (elementBeingDragged) {
				$(copy).hide('puff', {}, 1000, function() {
					$(copy).remove();
					copy = null;
				});
				
			} else {
				scriptError("Tried mouseup on a statement line while elementBeingDragged was === null. This shouldn't happen");
				$(copy).remove();
				copy = null;
			}
			$(scope).css('cursor', 'auto');
			$(scope).off('mousemove.trackDrag');
			$(document).off('mouseup.myDrop');
			$(dropSelector).off('mouseenter.myDrop');
			$(dropSelector).off('mouseleave.myDrop');
			$(elementBeingHovered).removeClass('hover');
			if (success) {
				onSuccessfulDrop(elementBeingDragged, elementBeingHovered);
			}
			elementBeingDragged = null;
			elementBeingHovered = null;
			
			//on dragStop
			$('.topCategory').off('mouseenter').off('mouseleave');
			$('.subCategory').off('mouseenter').off('mouseleave');
			$('#budget_body').off('mouseenter.myDrop');
			//end on dragStop
		});
		
		//on dragStart
		$('.topCategory').hoverIntent(function() {
			$(this).siblings('ul').show(1000).addClass('beenHovered');
		}, function() {});

		$('.subCategory').hoverIntent(function() {
			$(this).siblings('ul').show(1000).addClass('beenHovered');
		}, function() {});
		
		$('#budget_body').on('mouseenter.myDrop', function() {
			$('#budget_body').on('mouseleave.MyDrop', function() {
				$('.subCategory').siblings('.beenHovered').hide(1000).removeClass('beenHovered');
				$('.topCategory').siblings('.beenHovered').delay(1000).hide(1000).removeClass('beenHovered');	
				$(this).off('mouseleave.MyDrop');
			});
		});
	
	});
	
	if (debug) endMethod("addDragNdrop()");
}

var dragNdropJSLoaded = true;
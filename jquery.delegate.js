(function($) {

$.fn.delegate = function(type, selector, callback) {
	return this.each(function() {
		var $event = $.event,
			$add = $event.add;
		
		switch(type) {
			case "mouseenter":
			case "mouseleave":
				$add(this, type, function( event ) {
					var $elem = $(event.target).closest(selector),
						$related = $(event.relatedTarget).closest(selector, this); 
					if(!$related.length || $related[0] != $elem[0]) {
						event.currentTarget = $elem[0]; 
						return callback.apply(this, arguments);
					}
				});
				break;
			case "submit":
			case "change":
			case "select":
				// Use co-opted focusin/out event for IE
				if( typeof document.attachEvent == "object" ) {
					$add(this, "focusin."+type+"Focus", function( event ) {
						var $elem = $(event.target).closest(selector, this),
							args = arguments,
							self = this;
						if($elem.length) {
							event.currentTarget = $elem[0];
							$add(event.target, type+"."+type+"Focus", function() {
								callback.apply(self, args);
							});
						}
					});
					$add(this, "focusout."+type+"Focus", function( event ) {
						var $elem = $(event.target).closest(selector, this); 
						if($elem.length) {
							$event.remove(event.target, type, callback);
						}
					});
					break;
				// those events do bubble in other browsers
				}
			default:
				$add(this, type, function( event ) {
					var $elem = $(event.target).closest(selector, this);
					if($elem.length) {
						event.currentTarget = $elem[0];
						return callback.apply(this, arguments);
					}
				});
				break;
		}
	});
}

$.fn.undelegate = function(type, callback) {
	return this.each(function() {
		$.event.remove(this, type.replace(/(submit|change|select)/, ".$1Focus"), callback);
	});
};

})(jQuery);
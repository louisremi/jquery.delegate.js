(function($) {

$.fn.delegate = function(type, selector, callback) {
	switch(type) {
		case "mouseenter":
		case "mouseleave":
			return $(this).bind(type, function( event ) {
				var $elem = $(event.target).closest(selector),
					$related = $(event.relatedTarget).closest(selector); 
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
				return $(this).bind("focusin."+type+"Focus", function( event ) {
					var $elem = $(event.target).closest(selector),
						args = arguments,
						self = this;
					if($elem.length) {
						event.currentTarget = $elem[0];
						$(event.target).bind(type+"."+type+"Focus", function() {
							callback.apply(self, args);
						});
					}
				}).bind("focusout."+type+"Focus", function( event ) {
					var $elem = $(event.target).closest(selector); 
					if($elem.length) {
						$(event.target).unbind(type, callback);
					}
				});
				break;
			}
			// those events do bubble in other browsers
		default:
			return $(this).bind(type, function( event ) {
				var $elem = $(event.target).closest(selector);
				if($elem.length) {
					event.currentTarget = $elem[0];
					return callback.apply(this, arguments);
				}
			});
			break;
	}
}

$.fn.undelegate = function(type, callback) {
	return $(this).unbind(type.replace(/(submit|change|select)/, ".$1Focus"), callback);
};

})(jQuery);
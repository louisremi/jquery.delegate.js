(function(jQuery){

var parsedCache = [],
	_filter = jQuery.filter;

jQuery.filter = jQuery.multiFilter = function( expr, elems, not ) {
	var parsed = [], split, re, matches = [], match, l, i;
	// We are looking for simple selectors of the form "div", ".class" or "div.class"
	// We'll try to minimize the extra-processing for complex selectors
	
	// A simple way to quickly exclude many complex selectors
	if(expr.indexOf(' ') == -1) {
		// If the selector is not the last parsed one
		if (expr != parsedCache[0]) {
			split = expr.split('.');
			if (split.length < 3) {
				re = /^(?:[\w\u00c0-\uFFFF-]|\\.)*$/;
				// The selector begins with a tag (parsed[1] = tag) or with a "." (parsed[1] = true)
				if (parsed[1] = split[0] != ""? (re.test(split[0])? split[0] : false) : true) {
					// The second part of the selector is a class (parsed[2] = class) or there is no second part (parsed[2] = true)
					if(parsed[2] = split[1]? (re.test(split[1])? " " + split[1] + " " : false) : true) {
						// If we arrived that far, we found a simple selector
						parsed[0] = expr;
						parsedCache = parsed;
					}
				}
			}
		} else parsed = parsedCache;
	}
	// If we have succesfully parsed the new selector, or if it was in the cache
	if(expr == parsed[0]) {
		for(i = 0, l = elems.length; i < l; ++i) {
			match = (parsed[1] === true || jQuery.nodeName(elems[i], parsed[1])) && (parsed[2] === true || (" " + elems[i].className + " ").indexOf(parsed[2]) != -1);
			if(not? !match : match)	matches.push(elems[i]);
		}
		return matches;
	}
	return _filter(expr, elems, not);
};

})(jQuery);
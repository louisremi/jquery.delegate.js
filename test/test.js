test("delegate with click", function() {
	var count = 0;
	
	$("#test0").delegate("click", "li", function( event ) {
		count++;
		$(this).find(".display").text($(event.currentTarget).attr("class"));
	});
	
	$("#test0 a:eq(1)").click();
	
	equals(count, 1);
});

test("delegate with custom event", function() {
	var count = 0;
	
	$("#test1").delegate("smurf", "li", function( event ) {
		count++;
		$(this).find(".display").text($(event.currentTarget).attr("class"));
	});
	
	$("#test1 li:eq(1)").trigger("smurf");
	
	equals(count, 1);
});

test("delegate with focus", function() {
	var count = 0;
	
	$("#test2").delegate("focus", "li", function( event ) {
		count++;
		$(this).find(".display").text($(event.currentTarget).attr("class"));
	});
	
	$("#test2 li:eq(1)").focus();
	
	equals(count, 1);
});

test("delegate with blur", function() {
	var count = 0;
	
	$("#test3").delegate("blur", "li", function( event ) {
		count++;
		$(this).find(".display").text($(event.currentTarget).attr("class"));
	});
	
	$("#test3 li:eq(1)").blur();
	
	equals(count, 1);
});

test("delegate with submit", function() {
	var count = 0;
	
	$("#test4").delegate("submit", "li", function( event ) {
		count++;
		$(this).find(".display").text($(event.currentTarget).closest("li").attr("class"));
		return false;
	});
	
	$("#test4 :input:eq(0)").submit();
	
	equals(count, 1);
});

test("delegate with change", function() {
	var count = 0;
	
	$("#test5").delegate("change", "li", function( event ) {
		count++;
		$(this).find(".display").text($(event.currentTarget).closest("li").attr("class"));
	});
	
	$("#test5 :input:eq(1)").change();
	
	equals(count, 1);
});

test("delegate with select", function() {
	var count = 0;
	
	$("#test6").delegate("select", "li", function( event ) {
		count++;
		$(this).find(".display").text($(event.currentTarget).closest("li").attr("class"));
	});
	
	$("#test6 :input:eq(1)").select();
	
	equals(count, 1);
});
$(function() {

	$("#font-size-slider").change(function(e) {
		$(".box1 span").css("font-size", $(this).val() + "px");	
	});
	
	$(".color-slider").change(function(e) {
		$(".box1 span").css("color", "hsla(" + $("#color-slider-1").val() + ", " + $("#color-slider-2").val() + "%, " + $("#color-slider-3").val() + "%, 1)");	
	});
	
	$(".shadow-slider").change(function(e) {	
		$(".box1 span").css("text-shadow", $("#shadow-slider-1").val() + "px " + $("#shadow-slider-2").val() + "px " + $("#shadow-slider-3").val() + "px black"		);	 
	});

});
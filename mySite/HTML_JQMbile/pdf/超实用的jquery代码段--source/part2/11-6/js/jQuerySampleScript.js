$(function () {
	(function serializeValues() {
		$('div#result').text($('form').serialize());
		$(':checkbox').click(serializeValues);
		$(':select').change(serializeValues);
		$(':text').keyup(serializeValues);
	})();
});

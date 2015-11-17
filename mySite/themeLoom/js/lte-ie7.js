/* Use this script if you need to support IE 7 and IE 6. */

window.onload = function() {
	function addIcon(el, entity) {
		var html = el.innerHTML;
		el.innerHTML = '<span style="font-family: \'icomoon\'">' + entity + '</span>' + html;
	}
	var icons = {
			'icon-home' : '&#x21;',
			'icon-newspaper' : '&#x23;',
			'icon-home-2' : '&#x22;',
			'icon-home-3' : '&#x24;',
			'icon-pencil' : '&#x25;',
			'icon-pencil-2' : '&#x26;',
			'icon-droplet' : '&#x27;',
			'icon-picture' : '&#x28;',
			'icon-picture-2' : '&#x29;',
			'icon-camera' : '&#x2a;',
			'icon-music' : '&#x2b;',
			'icon-play' : '&#x2c;',
			'icon-film' : '&#x2d;',
			'icon-camera-2' : '&#x2e;',
			'icon-spades' : '&#x2f;',
			'icon-clubs' : '&#x30;',
			'icon-diamonds' : '&#x31;',
			'icon-broadcast' : '&#x32;',
			'icon-microphone' : '&#x33;',
			'icon-book' : '&#x34;'
		},
		els = document.getElementsByTagName('*'),i, attr, html, c, el;
	for (i = 0; i < els.length; i += 1) {
		el = els[i];
		attr = el.getAttribute('data-icon');
		if (attr) {
			addIcon(el, attr);
		}
		c = el.className;
		c = c.match(/icon-[^\s'"]+/);
		if (c) {
			addIcon(el, icons[c[0]]);
		}
	}
};
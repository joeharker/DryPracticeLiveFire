(function () {
	'use strict';

	getObjects('settingsService', settingsService);

	function getObjects(name, obj) {
		for (var key in obj) if (obj.hasOwnProperty(key)) (function(thatkey) {
			var value = obj[thatkey];

			//console.log([Object.prototype.toString.call(value), key, value]);
			switch (Object.prototype.toString.call(value)) {
			case '[object Array]':
				var aspan = document.createElement('span');
				aspan.innerHTML = thatkey + ' ';
				document.getElementById('settings').appendChild(aspan);

				var atext = document.createTextNode('+');
				var abutton = document.createElement('a');
				abutton.appendChild(atext);
				abutton.classList.add('button', 'cold');
				abutton.onclick = function() { console.log([thatkey,'array']); }
				document.getElementById('settings').appendChild(abutton);

				var adiv = document.createElement('div');
				document.getElementById('settings').appendChild(adiv);
				break;
			case '[object String]':
				var sinput = document.createElement('input');
				sinput.id = name + '-' + thatkey;
				sinput.type = 'text';
				sinput.value = value;
				document.getElementById('settings').appendChild(sinput);

				var sdiv = document.createElement('div');
				document.getElementById('settings').appendChild(sdiv);
				break;
			default:
			}

			if (typeof value == 'object') {
				getObjects(thatkey, value);
			}
		})(key);
	}
})();
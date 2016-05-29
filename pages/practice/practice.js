(function (settings) {
	'use strict';

	document.getElementById('idea').innerHTML = settings.getIdea() + '<br />';
})(settingsService);
'use strict';

var settingsService = (function (memory) {
	console.log([memory.get('ideas')]);

	var ideas = memory.get('ideas');
	if (ideas === null) {
		ideas = [
			'Slow down the draw just enough to guarantee perfection.',
			'Ensure a perfect grip every time.'
		];
	}

	function getIdea(){
		return this.ideas[Math.floor(Math.random() * this.ideas.length)];
	}

	//window.onhashchange = function () {
	//	var newPage = window.location.hash.replace('#', '');
	//	var settingsButtons = document.getElementsByClassName('js-page-settings');

	//	console.log(['newPage', newPage]);
	//	if (newPage.indexOf('/settings/') !== -1) {
	//		for (var n = 0; n < settingsButtons.length; n++) {
	//			settingsButtons[n].style.display = 'none';
	//		}
	//	} else {
	//		for (var n = 0; n < settingsButtons.length; n++) {
	//			settingsButtons[n].style.display = 'inline';
	//		}
	//	}
	//}

	return {
		ideas: ideas,
		getIdea: getIdea
	}
})(memoryService);

'use strict';

var settingsService = {
	ideas : [
		'Slow down the draw just enough to guarantee perfection.',
		'Ensure a perfect grip every time.'
	],

	getIdea: function () {
		return this.ideas[Math.floor(Math.random() * this.ideas.length)];
	}
};

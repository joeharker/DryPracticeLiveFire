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

	return {
		ideas: ideas,
		getIdea: getIdea
	}
})(memoryService);

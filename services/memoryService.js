'use strict';

var memoryService =  (function () {
	return {
    	set: function (key, val) {
    		window.localStorage.setItem(key, val);
    	},

    	get: function (key) {
    		return window.localStorage.getItem(key);
    	},

    	reset: function () {
    		window.localStorage.clear();
    	}
	}
})();
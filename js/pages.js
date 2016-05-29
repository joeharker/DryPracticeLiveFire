(function () {
	'use strict';

	var lastPage = '';
	var defaultPage = '';
	var lastHideClass = '';
	var queued = [];
	var ready = [];

	function httpGet(url, callback, id)
	{
		var xmlHttp = new XMLHttpRequest();
		xmlHttp.onreadystatechange = function () {
			if (xmlHttp.readyState === 4) {
				if (xmlHttp.status === 200) {
					callback(id, xmlHttp.responseText);
				} else {
					console.log(['Error: httpGet', xmlHttp]);
				}
			}
		};
		xmlHttp.open('GET', url, true); // true for asynchronous 
		xmlHttp.send(null);
	}

	function scriptGet(url, requires, count) {
		if (requires === undefined || ready.indexOf(requires) !== -1) {
			var script = document.createElement('script');
			script.async = false;
			script.src = url;
			document.getElementsByTagName('head')[0].appendChild(script);

			//track required scripts
			var regexName = new RegExp(/([^"/]+)$/, 'gi');
			var matchName = regexName.exec(url);
			if (matchName !== null) {
				var name = matchName[1];
				ready.push(name);
			}
		} else {
			if (count === undefined) {
				count = 0;
			} else {
				count++;
			}

			if (count > 10) {
				console.log([count + ' tries. ' + url + ' requires ' + requires]);
			} else {
				setTimeout(function () {
					scriptGet(url, requires, count);
				}, 100);
			}
		}
    }

    function cssGet(url) {
        var link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = url;
        document.getElementsByTagName('head')[0].appendChild(link);
    }

    function render(id, data) {
    	var styles = [];
    	var scripts = [];

    	//find the base path
    	var regexBase = new RegExp(/.+\//, 'g');
    	var matchBase = regexBase.exec(id);
    	if (matchBase !== null) {
    		var base = matchBase[0];

			//find style links and scripts
    		var regexTag = new RegExp(/<\/{0,1}(link|script)[^>]*>/, 'gi');
    		var matchTag;
    		var tags = [];

    		while (matchTag = regexTag.exec(data)) {
    			var tag = matchTag[0];
    			var tagType = matchTag[1];

				//find if the tag had a path
    			var regexPath = new RegExp(/(?:href|src)="([^"]*?)([^"/]+)"(?:.*requires="([^"]+)"){0,1}/, 'gi');
    			var matchPath = regexPath.exec(tag);
    			if (matchPath !== null) {
    				var path = matchPath[1];
    				var name = matchPath[2];
    				var requires = matchPath[3];

    				//prevent douplicates
    				if (queued.indexOf(name) === -1) {
    					queued.push(name);

    					//queue the paths by type
    					if (tagType.toLowerCase() === 'script') {
    						scripts.push({ path: base + path + name, requires: requires });
    					} else {
    						styles.push(base + path + name);
    					}
    				}
    			}

    			//remove the tags after the searches are looped through
    			tags.push(tag);
    		}

    		for (var t = 0; t < tags.length; t++) {
    			data = data.replace(tags[t], '');
    		}
    	}

		//load the data
    	document.getElementById(id).innerHTML = data;

    	//load the queued tags
    	for (var c = 0; c < styles.length; c++) {
    		cssGet(styles[c]);
    	}
    	for (var s = 0; s < scripts.length; s++) {
    		scriptGet(scripts[s].path, scripts[s].requires);
    	}
    }

    function hideCurrentPageButtons(newPage) {
    	var thisHideClass = '';
    	var regex = new RegExp(/([^/]+)\./, 'g');
    	var match = regex.exec(newPage);

    	if (match !== null) {
    		thisHideClass = 'js-page-'+ match[1];
    	}

    	var thisButtons = document.getElementsByClassName(thisHideClass);
    	for (var n = 0; n < thisButtons.length; n++) {
    		thisButtons[n].style.display = 'none';
    	}

    	var lastButtons = document.getElementsByClassName(lastHideClass);
    	for (var n = 0; n < lastButtons.length; n++) {
    		lastButtons[n].style.display = 'inline';
    	}

    	lastHideClass = thisHideClass;
    }

	//events
	window.onhashchange = function () {
		var newPage = window.location.hash.replace('#', '');

		if (newPage.length === 0) {
			newPage = defaultPage;
		}
		hideCurrentPageButtons(newPage);

		if (document.getElementById(newPage) !== null) {
			document.getElementById(lastPage).style.display = 'none';
			document.getElementById(newPage).style.display = 'inline';
			lastPage = newPage;
		} else {
			console.log('NEED: <div id="' + newPage + '" class="js-page"></div>');
		}
	};

	window.onload = function () {
		var pageType;
		var s;
		var pages = document.getElementsByClassName('js-page');

		if (pages.length > 0) {
		    defaultPage = pages[0].id;
		    lastPage = defaultPage;

			//hide all but the first js-page
		    for (s = 1; s < pages.length; s++) {
		        pages[s].style.display = 'none';
		    }

			//populate all of the js-pages based on their type
		    for (s = 0; s < pages.length; s++) {
		    	var regex = new RegExp(/\.([^.]+$)/, 'g');	//must re-var each match
		    	var match = regex.exec(pages[s].id);		//must re-var each match

		    	if (match !== null) {
		    		pageType = match[1];

		    		//TODO: lazy load high rex images until a time limit so slow networks dont get crushed
		    		switch(pageType) {
		    			case 'js':
		    				scriptGet(pages[s].id);
		    				break;
		    			case 'css':
		    				cssGet(pages[s].id);
		    				break;
		    			case 'htm':
		    			case 'html':
		    				httpGet(pages[s].id, render, pages[s].id);
		    				break;
		    			default:
		    				console.log(['Error: page type unknow', pageType]);
		    		}
		    	}
		    }
		}

	    window.onhashchange();
	};
})();
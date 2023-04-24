'use strict';

function richyAreas(dom = document) {
	const areas = dom.getElementsByTagName != null ? Array.from(dom.getElementsByTagName('textarea')) : [];

	areas.forEach((area) => {
		if (!area.closest('.CodeMirror')) {
			new SimpleMDE({element: area, autoDownloadFontAwesome: false, forceSync: true});
		}
	});
}

const observerConfig = {
	childList: true,
	subtree: true
};

function debounce(fn, ms = 500) {
	let t;

	return (...args) => {
		clearTimeout(t);
		t = setTimeout(() => fn(...args), ms);
	};
}

function startDaemon() {
	const observer = new MutationObserver(debounce((mutations) => {
		mutations.forEach((mut) => {
			if ([...mut.addedNodes].length > 0) {
				mut.addedNodes.forEach((node) => {
					richyAreas(node);
				});
			}
		});
	}));

	observer.observe(document.body, observerConfig);
}

richyAreas();
startDaemon();

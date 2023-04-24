'use strict';

/**
 * {@link https://github.com/sparksuite/simplemde-markdown-editor}
 */
const areaConfig = {
	element: area,
	spellChecker: false,
	status: false,
	autoDownloadFontAwesome: false,
	forceSync: true
}

function richyAreas(dom = document) {
	const areas = dom.getElementsByTagName != null ? Array.from(dom.getElementsByTagName('textarea')) : [];

	areas.forEach((area) => {
		if (!area.closest('.CodeMirror')) {
			const mde = new SimpleMDE(areaConfig);
			mde.codemirror.on('change', () => area.dispatchEvent(new Event('input', {bubbles: true})));
		}
	});
}

function debounce(fn, ms = 500) {
	let t;

	return (...args) => {
		clearTimeout(t);
		t = setTimeout(() => fn(...args), ms);
	};
}

function startDaemon() {
	const observerConfig = {
		childList: true,
		subtree: true
	};

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

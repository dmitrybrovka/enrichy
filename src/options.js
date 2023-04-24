(() => {
	const
		configFields = new Set(['expression']);

	let
		notificationTimeout;

	document.addEventListener('DOMContentLoaded', () => {
		chrome.storage.sync.get(Array.from(configFields), (config) => {
			Object.keys(config).forEach((key) => {
				window[`${key}Field`].value = config[key];
			});
		});
	});

	optionsForm.addEventListener('submit', (e) => {
		clearTimeout(notificationTimeout);

		saveBtn.disabled = true;

		chrome.storage.sync.set({expression: expressionField.value}, () => {
			setTimeout(() => {
				notification.classList.add('options__notification_show_true');
				saveBtn.disabled = false;

				notificationTimeout = setTimeout(() => {
					notification.classList.remove('options__notification_show_true');
				}, 800);
			}, 1000);
		});

		e.preventDefault();
	});
})();

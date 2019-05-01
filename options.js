// Saves options to chrome.storage
function save() {
	var url = document.getElementById('url').value;
	var secret = document.getElementById('secret').value;
	chrome.storage.sync.set({
		url: url,
		secret: secret
	}, function () {
		// Update status to let user know options were saved.
		var status = document.getElementById('status');
		status.textContent = 'Options saved.';
		setTimeout(function () {
			status.textContent = '';
		}, 750);
	});
}

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
function restore() {
	// Use default value color = 'red' and likesColor = true.
	chrome.storage.sync.get({
		url: "http://notif.fepi.duckdns.org",
		secret: "secret"
	}, function (items) {
		document.getElementById('url').value = items.url;
		document.getElementById('secret').value = items.secret;
	});
}

document.getElementById("save").onclick = save;

restore();
setInterval(() => {
	work();
}, 10000);

async function work() {
	var options = await getStorageDataAsync();
	var data = await fetch(options.url + "?secret=" + options.secret);
	var json = await data.json();
	var badgeText = json.length > 0 ? json.length + "" : "";
	chrome.browserAction.setBadgeText({ "text": badgeText });
	return json;
}

async function getStorageDataAsync() {
	return new Promise((res, rej) => chrome.storage.sync.get({
		url: "http://notif.fepi.duckdns.org",
		secret: "secret"
	}, res));
}
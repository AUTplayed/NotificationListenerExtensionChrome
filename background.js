setInterval(() => {
	work();
}, 10000);

async function work() {
	var options = await getStorageDataAsync();
	var json;
	try {
		var data = await fetch(options.url + "?secret=" + options.secret);
		json = await data.json();
	} catch(e) {
		chrome.browserAction.setBadgeBackgroundColor({color:"#f00"});
		chrome.browserAction.setBadgeText({ "text": "x" });
		return [];
	}
	var badgeText = json.length > 0 ? json.length + "" : "";
	chrome.browserAction.setBadgeBackgroundColor({color:[51, 103, 214, 255]});
	chrome.browserAction.setBadgeText({ "text": badgeText });
	return json;
}

async function getStorageDataAsync() {
	return new Promise((res, rej) => chrome.storage.sync.get({
		url: "http://notif.fepi.duckdns.org",
		secret: "secret"
	}, res));
}
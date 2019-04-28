setInterval(() => {
	work();
}, 10000);

async function work() {
	var data = await fetch("http://notif.fepi.duckdns.org");
	var json = await data.json();
	var badgeText = json.length > 0 ? json.length + "" : "";
	chrome.browserAction.setBadgeText({ "text": badgeText });
	return json;
}
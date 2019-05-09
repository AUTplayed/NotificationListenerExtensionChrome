var content = document.getElementById("content");
var ruler = document.getElementById("ruler");
async function open() {
	var data = await chrome.extension.getBackgroundPage().work();
	var html = "";
	content.style.width = content.style.maxWidth;
	data.forEach(entry => {
		html += buildEntry(entry);
		html += "<hr>"
	});
	ruler.style = "display:none";
	content.style.width = contentMaxWidth;
	content.innerHTML = html;
	var clears = document.getElementsByClassName("clear");
	for (var i = 0; i < clears.length; i++) {
		clears[i].onclick = clearNotif;
	}
}
open();

var contentMaxWidth = 0;

async function clearNotif(ev) {
	var key = ev.target.getAttribute("key");
	var options = await chrome.extension.getBackgroundPage().getStorageDataAsync();
	fetch(options.url + "/action" + "?secret=" + options.secret, {
		method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ clear: [key] })
	}).then(console.log("sent action"));
}

function buildEntry(data) {
	var dateFormatted = new Date(data.time).toTimeString().split(" ")[0];

	calcMaxWidth(data.content);
	var newlines = data.content.split("\n");
	newlines = newlines.filter((e)=>e != "");
	if((newlines || []).length > 3) {
		data.content = `<details><summary>${newlines.slice(0, 3).join("\n")}</summary>${newlines.slice(3).join("\n")}</details>`;
	}

	calcMaxWidth(data.title + "xxx");
	
	calcMaxWidth(data.source + " " + dateFormatted);
	return `<div style="display:flex;flex-direction:column">
			<div style="display:flex;justify-content:space-between;"><span>${data.title}</span><span style="cursor:pointer;" class="clear" key="${data.key}">✖</span></div>
			<div style="white-space: pre-line;">${data.content}</div>
			<div style="display:flex;justify-content:space-between;"><span>${data.source}</span><span>${dateFormatted}</span></div>
		</div>`;
}

function calcMaxWidth(text) {
	ruler.innerHTML = text;
	contentMaxWidth = Math.max(contentMaxWidth, ruler.offsetWidth);
}

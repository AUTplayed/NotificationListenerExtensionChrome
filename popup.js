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
}
open();

var contentMaxWidth = 0;

function buildEntry(data) {
	calcMaxWidth(data.title);
	calcMaxWidth(data.content);
	return `<div style="display:flex;flex-direction:column">
			<div>${data.title}</div>
			<div>${data.content}</div>
			<div style="display:flex;justify-content:space-between;"><span>${data.source}</span><span>${new Date(data.time).toTimeString().split(" ")[0]}</span></div>
		</div>`;
}

function calcMaxWidth(text) {
	ruler.innerHTML = text;
	contentMaxWidth = Math.max(contentMaxWidth, ruler.offsetWidth);
}
var content = document.getElementById("content");
async function open() {
	var data = await chrome.extension.getBackgroundPage().work();
	var html = "";
	data.forEach(entry => {
		html += buildEntry(entry);
		html += "<hr>"
	});
	content.innerHTML = html;
}
open();

function buildEntry(data) {
	return `<div>
			<div>${data.title}</div>
			<div>${data.content}</div>
			<div>${data.source}</div>
		</div>`;
}
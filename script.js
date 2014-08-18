function isNotNested(node) {
	//ignore if fake, or if previous is fake.
	if (node.getElementsByClassName('fakebox').length > 0 ||
		(node.parentNode.previousSibling && 
		 node.parentNode.previousSibling.getElementsByClassName('fakebox').length > 0)) {
		return false;
	}

	while (node = node.parentNode) {
		//ignore if a parent along the way has this, meaning our node is nested.
		//also test to see if we're part of a list
		if (node.classList && (node.classList.contains('userContentWrapper') || node.classList.contains('uiList'))) {
			return false;
		}
	}
	return true;
}

function randelem(items) {
	return items[Math.floor(Math.pow(Math.random(), 1/3)*items.length)];
}

function boxes()
{
	var boxes = document.getElementsByClassName('userContentWrapper');
	return Array.prototype.filter.call(boxes, isNotNested);
}

function randbox()
{
	return randelem(boxes()).parentNode;
}

function randaction()
{
	return settings.msgs[Math.floor(Math.random()*settings.msgs.length)];
}

function newbox(abox) {

	var action = randaction();
	var content = "\
	<div class='fakebox'>\
	<div class='headline'>Get off Facebook.</div>\
	<div class='action'>"+action+"</div>\
	</div>";

	box = document.createElement('div');
	box.className = abox.className
	box.innerHTML = "<div class='userContentWrapper'>"+content+"</div>";

	return box;
}

var numFakes = 0;
var settings;

function deposit() {
	var abox = randbox();
	var anewbox = newbox(abox);
	abox.parentNode.insertBefore(anewbox, abox);

	numFakes++;
}

function updateRatio() {
	console.log("settings = "+JSON.stringify(settings));

	if (!settings || !settings.msgs || !settings.freq) {
		return;
	}

	console.log("settings = "+settings+", and freq = "+settings.freq);

	var numBoxes = boxes().length;

	while ((numFakes/numBoxes) < (settings.freq/10)) {
		deposit();
	}
}

var timeout;
function watchScroll() {
    clearTimeout(timeout);
    timeout = setTimeout(updateRatio, 20);
}

chrome.storage.local.get(["msgs", "freq"],function(result){
	settings = result;
});

document.addEventListener("scroll", watchScroll);
updateRatio();

// setInterval(updateRatio, 1500);

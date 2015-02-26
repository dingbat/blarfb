var messages;
var freq;


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
	return messages[Math.floor(Math.random()*messages.length)];
}

function newbox(abox) {

	var action = randaction();
	var content = "\
	<div class='fakebox' style='padding-top: 30px; padding-bottom: 30px; text-align: center;'>\
	<div style='font-size: 2em; font-weight: 200; margin-bottom: 10px;'>Get off Facebook.</div>\
	<div style='font-size: 1.5em; font-weight: bold;'>"+action+"</div>\
	</div>";

	box = document.createElement('div');
	box.className = abox.className
	box.innerHTML = "<div class='userContentWrapper'>"+content+"</div>";

	return box;
}

var numFakes = 0;

function deposit() {
	var abox = randbox();
	var anewbox = newbox(abox);
	abox.parentNode.insertBefore(anewbox, abox);

	numFakes++;
}

function updateRatio() {
	var numBoxes = boxes().length;
	while ((numFakes/numBoxes) < (freq/10)) {
		deposit();
	}
}

var timeout;
function watchScroll() {
    clearTimeout(timeout);
    timeout = setTimeout(updateRatio, 20);
}


document.addEventListener("scroll", watchScroll);
updateRatio();

function getAnswer(e) {
    if (e.name === "messages") {
    	// console.log("messages = "+e.message);
        messages=e.message.split(",");
    }
    if (e.name === "freq") {
        freq=e.message;
    }
}

safari.self.addEventListener("message", getAnswer, false);

safari.self.tab.dispatchMessage("messages");
safari.self.tab.dispatchMessage("freq");


// setInterval(updateRatio, 1500);

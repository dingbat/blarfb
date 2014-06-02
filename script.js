function randelem(arr) {
	//return arr[0];
	var idx;
	do
	{
		idx = Math.floor(Math.random()*(Math.max(arr.length,5)));
	}
	while (arr[idx].getElementsByClassName('userContentWrapper').length > 0);

	return arr[idx];
}

var template;
function newbox()
{
	if (template)
		return template.cloneNode(true);

	var boxes = document.getElementsByClassName('userContentWrapper');
	for (var i = 0; i < boxes.length; i++) {
		if (boxes[i].getElementsByClassName('userContentWrapper').length == 0) //not a nested post
			return boxes[i].parentNode.cloneNode(true);
	}
}

function randaction()
{
	var axns = ["Read a book.", "Take a walk.", "Do some exercise.", "Meditate."];
	return axns[Math.floor(Math.random()*axns.length)];
}

window.onload = function () {

	var newbox = newbox();
	box.parentNode.insertBefore(newbox, box);

	var content = newbox.getElementsByClassName('userContentWrapper')[0];
	var action = randaction();
	content.innerHTML = "\
	<div class='fakebox'>\
	<div class='headline'>Get off Facebook.</div>\
	<div class='action'>"+action+"</div>\
	</div>";
};
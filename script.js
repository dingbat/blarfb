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
	var arr = JSON.parse(localStorage["msgs"]);
	return arr[Math.floor(Math.random()*arr.length)];
}

window.onload = function () {

	var nb = newbox();
	box.parentNode.insertBefore(nb, box);

	var content = nb.getElementsByClassName('userContentWrapper')[0];
	var action = randaction();
	content.innerHTML = "\
	<div class='fakebox'>\
	<div class='headline'>Get off Facebook.</div>\
	<div class='action'>"+action+"</div>\
	</div>";
};
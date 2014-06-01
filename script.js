function randelem(arr) {
	return arr[0];
	var idx;
	do
	{
		idx = Math.floor(Math.random()*arr.length);
	}
	while (arr[idx].getElementsByClassName('userContentWrapper').length > 0);

	return arr[idx];
}

function randaction()
{
	var axns = ["Read a book.", "Take a walk.", "Do some exercise.", "Meditate."];
	return axns[Math.floor(Math.random()*axns.length)];
}

window.onload = function () {
	var action = randaction();
	var boxes = document.getElementsByClassName('userContentWrapper');
	randelem(boxes).innerHTML = "\
	<div class='fakebox'>\
	<div class='headline'>Get off Facebook.</div>\
	<div class='action'>"+action+"</div>\
	</div>";
};
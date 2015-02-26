var newmsg;

function updateStorage()
{
	var arr = [];
	var msgs = document.getElementById('messages').childNodes;
	for (var i = 0; i < msgs.length-1; i++) { //length-1 bc last one is placeholder
		if (msgs[i].value && msgs[i].value.length > 0) {
			arr = arr.concat(msgs[i].value);
		}
	}

	chrome.storage.local.set({"msgs":arr});
}

function tryDeleteNode(node)
{
	if (node.value.length == 0)
	{
		node.parentNode.removeChild(node);
		updateStorage();
	}
}

function addMsg(txt)
{
	if (!txt && newmsg.value.length == 0) {
		return;
	}

	var br = document.createElement('br');
	var node = document.createElement('input');
	node.setAttribute("class", "msg");
	node.setAttribute("type", "text");
	node.value = txt || newmsg.value;
	newmsg.value = "";

	newmsg.parentNode.insertBefore(node, newmsg);
	newmsg.parentNode.insertBefore(node, newmsg);

	node.onblur = function ()
	{
		tryDeleteNode(node);
	}
	
	//backspace when the textfield is already clear (has to be on keydown or we wouldnt know)
	node.onkeydown = function (e)
	{
		if (e.keyCode == 8) {
			tryDeleteNode(node);
		}
	}

	node.onkeyup = function (e)
	{
		if (e.keyCode == 13) {
			tryDeleteNode(node);
		}
		updateStorage();
	}	

	//add to the array
	updateStorage();
}

window.onload = function () {
	newmsg = document.getElementById('newmsg');

	//update UI
	chrome.storage.local.get(["freq", "msgs"], function(result){
		var freq = result.freq;
		//default
		if (!freq) {
			freq = 2;
			chrome.storage.local.set({"freq":freq});
		}
		//update content to local storage
		document.getElementById('freq').value = freq


		var msgs = result.msgs;
		if (!msgs) {
			msgs = ["Read a book.", "Take a walk.", "Do some exercise.", "Do the thing you have to do."];
			chrome.storage.local.set({"msgs":msgs});
		}
		for (var i = 0; i < msgs.length; i++) {
			addMsg(msgs[i]);
		}
	});

	//handlers
	document.getElementById('freq').onchange = function () {
		chrome.storage.local.set({"freq":document.getElementById('freq').value});
	}

	newmsg.onkeyup = function (e) {
		if (e.keyCode == 13) {
			addMsg();
	    }
	}
	newmsg.onblur = function () {
		addMsg();
	}
}
window.onload = function(){
	var messages = [];
	var unames = [];
	var socket = io.connect('http://localhost:3700');
	var field = document.getElementById('field');
	var sendButton = document.getElementById("send");
	var content = document.getElementById('content');
	var name = document.getElementById('name');
	
	socket.on('message',function(data){
		if(data.message){
			messages.push(data.message);
			if(data.username == "") var uname = "Guest User";
			else var uname = data.username;
			unames.push(uname);
			var html = '';
			for(var i=0;i<messages.length;i++){
				html += '<b>' + unames[i] + ': </b>';
				html += messages[i] + '<br />';
			}
			content.innerHTML = html;
		} else {
			console.log("THERE is a problem:",data);
		}
	});

	sendButton.onclick = function(){
		if(name.value == ""){
			alert("Please type your name!");
		} else {
			var text = field.value;
			var textname = name.value;
			socket.emit('send', { message: text, username: textname });
		}
	};
}


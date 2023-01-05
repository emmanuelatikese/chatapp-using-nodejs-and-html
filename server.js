const http = require('http');
const express = require('express');
const path = require('path');
const app = express();
const socketio = require('socket.io');
const server = http.createServer(app);
const io = socketio(server)
const {RoomUser, getRoom, getCurrentUser, roomLeave} = require('./utils/user')
const userMessage = require('./utils/message');
const { on } = require('events');



app.use(express.static(path.join(__dirname,'public')));
const Port = 5000;

io.on('connection', (socket)=>{
	socket.on('JoinRoom', ({username, room})=>{
		
		const user = RoomUser()
		user.username = username;
		user.room = room;
		user.id = socket.id;
		
		socket.join(user.room);

		socket.broadcast.to(user.room).emit('message', userMessage("ADMIN", `${user.username} has join the chat!`))

	})

	socket.on('ChatMessage', (msg)=>{

		let user = getCurrentUser(socket.id)
		console.log(user, 'from chat')


		socket.emit('message', userMessage(user.username, msg))
	})

	socket.on('disconnect', ()=>{
		const user = roomLeave(socket.id)
		if(user){
			io.to(user.room).emit("message", userMessage("admin", `${user.username} has left the chat !`));
		}
		
	})

})


server.listen(Port, ()=>{
	console.log(`listening on port:${Port}`);
	

});

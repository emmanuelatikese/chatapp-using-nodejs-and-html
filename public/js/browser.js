const {username, room} = Qs.parse(location.search, {ignoreQueryPrefix:true})
console.log(username, room)



const socket = io();


socket.emit('JoinRoom', {username, room});


socket.on('message', (msg)=>{

    showText(msg);
    document.querySelector('#chatInput').value = ''

})

socket.on('userLeave', ({users,room})=>{
    ShowUser(users);
    ShowRoom(room);
})

function ShowRoom(room){
    document.querySelector('#room-name').innerHTML = `${room}` 
}


function ShowUser(users){

    document.getElementById('userList').innerHTML = `${users.map((user)=>
        `<li>${user.username}</li>`
    ).join('')}`
}



const ChatContainer = document.querySelector('.chat-message');

function showText(msg){
    
    const chat = document.createElement('div')
    chat.classList.add('chat')
    chat.innerHTML = `
        <span>${msg.username}</span> @<span>${msg.time}</span>
        <p id="text-id">${msg.text}</p>
        
    `
    ChatContainer.appendChild(chat);
    
}

const formChat = document.querySelector('#chat-form');

formChat.addEventListener('submit', (e)=>{
    e.preventDefault()

    msg = e.target.elements.chatInput.value;
    console.log(msg)

    socket.emit('ChatMessage', msg);

    

    ChatContainer.scrollTop = ChatContainer.scrollHeight;
})

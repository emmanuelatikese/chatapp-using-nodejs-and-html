
const users = []

function RoomUser(username, room , id){
    const user = {username, room, id};
    users.push(user)
    return user
}


function getCurrentUser(id){
    return (
        users.find((user)=> {return user.id === id})
    )
}

function roomLeave(id){
    const index = users.findIndex((user)=>{return user.id === id})

    if(index != -1){
       return users.splice(index, 1)[0];
    }
}


function getRoom(room){
    return users.filter((user)=>{
        return user.room === room;
    })
}


module.exports = {RoomUser, getRoom, getCurrentUser, roomLeave}
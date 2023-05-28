// Generating room rules and user information based on rooms.
const {v4:uuid4} = require("uuid");



const ROOM_MAX_CAPACITY = 2;

class Room {
    constructor() {
        this.roomstate = [];
    }
    // for joining the room depending on the max room capacity and roomstate users count
    joinRoom() {
        return new Promise((resolve)=> {
            const existedUser = "John deo old room "
            for(let i = 0;  i < this.roomstate.length;i++) {
                if(this.roomstate[i].users < ROOM_MAX_CAPACITY) {
                    this.roomstate[i].users++;
                    return resolve({newId:this.roomstate[i].id,user:existedUser});
                }
            }

            // else generate a new room id 
            const newId = uuid4();
            const user = "John deo"
            this.roomstate.push({
                id:newId,
                users:1
            });
            return resolve({newId,user});
        })
    }

    // for leaving a room 
    leaveRoom(id) {
        this.roomstate = this.roomstate.filter((room)=> {
            if(room.id === id) {
                if(room.users == 1) {
                    return false;
                }else {
                    room.users--;

                }
            }
            return true;
        })
    }
}

module.exports = Room;

///////////////
//   ROOMS   //
///////////////

var rooms;  //An array of every room that can be accessed

function setupRooms() {
    //Add all rooms to the rooms array
        //-index: a unique id for the room based on its level
        //-name: a unique name for the room
        //-backgroundImage: The image to display when this room is loaded
        //-accessableFloors: The floors that can be accessed from the current room (0 = no, 1= yes)
    rooms = [   new room(0, "floor0", "background_floor0", [1, 1, 0, 0, 0, 0, 0]),
                new room(1, "floor1", "background_floor1", [1, 1, 1, 0, 1, 0, 0]),
                new room(2, "floor2", "background_floor2", [1, 1, 1, 0, 1, 0, 0]),
                new room(3, "floor3", "background_floor3", [1, 1, 1, 1, 1, 1, 0]),
                new room(4, "floor4", "background_floor4", [1, 1, 1, 1, 1, 1, 0]),
                new room(5, "floor5", "background_floor5", [1, 1, 1, 1, 1, 1, 1]),
                new room(6, "floor6", "background_floor6", [0, 1, 1, 1, 1, 1, 1]),
                new room(7, "bossOffice", "background_bossOffice", [0, 0, 0, 0, 0, 0, 0])];
}

//Room object constructor
function room(index, name, backgroundImage, accessableFloors) {
    this.index = index;
    this.name = name;
    this.backgroundImage = backgroundImage;
    this.accessableFloors = accessableFloors;
}
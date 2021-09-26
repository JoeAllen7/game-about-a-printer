//////////////////////////////////////
// CUSTOM UI ELEMENTS AND FUNCTIONS //
//////////////////////////////////////

//These global variables are all references to UI button elements
//that are used to perform actions in the game
var buttonPlay;
var buttonPlayHover;
var buttonElevator;
var buttonOfficeDoorEnter;
var buttonOfficeDoorExit;
var buttonMenuClose;
var buttonOfficeDeskKey;
var buttonOfficeComputer;
var buttonGetKey;
var buttonComputerPrint;
var buttonMenuBack;
var buttonPrinter;
var buttonPrintOption1;
var buttonPrintOption2;
var buttonsElevatorFloors = [];
var dialogueOptionButtons = [];
var dialogueInputConfirmButton;

//Images for the print menu
var imgPrinter1 = new Image(); imgPrinter1.src = "images/menu_print1.png";
var imgPrinter2 = new Image(); imgPrinter2.src = "images/menu_print2.png";
//Create images for each elevator button and the elevator background
var imgElevatorBg = new Image(); imgElevatorBg.src = "images/evBg.png";
var imgElevator0a = new Image(); imgElevator0a.src = "images/evButton0a.png";
var imgElevator1a = new Image(); imgElevator1a.src = "images/evButton1a.png";
var imgElevator2a = new Image(); imgElevator2a.src = "images/evButton2a.png";
var imgElevator3a = new Image(); imgElevator3a.src = "images/evButton3a.png";
var imgElevator4a = new Image(); imgElevator4a.src = "images/evButton4a.png";
var imgElevator5a = new Image(); imgElevator5a.src = "images/evButton5a.png";
var imgElevator6a = new Image(); imgElevator6a.src = "images/evButton6a.png";
var imgElevator0b = new Image(); imgElevator0b.src = "images/evButton0b.png";
var imgElevator1b = new Image(); imgElevator1b.src = "images/evButton1b.png";
var imgElevator2b = new Image(); imgElevator2b.src = "images/evButton2b.png";
var imgElevator3b = new Image(); imgElevator3b.src = "images/evButton3b.png";
var imgElevator4b = new Image(); imgElevator4b.src = "images/evButton4b.png";
var imgElevator5b = new Image(); imgElevator5b.src = "images/evButton5b.png";
var imgElevator6b = new Image(); imgElevator6b.src = "images/evButton6b.png";
//Add the button images to arrays, one for disabled/off buttons and one for enabled/on ones
var imgsElevatorButtonsOff = [imgElevator0a, imgElevator1a, imgElevator2a, imgElevator3a, imgElevator4a, imgElevator5a, imgElevator6a]
var imgsElevatorButtonsOn = [imgElevator0b, imgElevator1b, imgElevator2b, imgElevator3b, imgElevator4b, imgElevator5b, imgElevator6b]

function createPlayButton() {
    //Create a customButton object for the play button
    //The parameters determine the position and size of the button
    buttonPlay = new customButton(427, 392, 425, 72);
}

function createDialogueButtons() {
    //Create buttons for dialogue options and add them to an array
    var btn1 = new customButton(26, 655, 408, 49);
    var btn2 = new customButton(436, 655, 408, 49);
    var btn3 = new customButton(846, 655, 408, 49);
    dialogueOptionButtons = [btn1, btn2, btn3];
    //Create the confirm button, used after the player has entered text
    dialogueInputConfirmButton = new customButton(552, 655, 190, 49);
}

function createActionButtons() {
    //The elevator button is used to click on the elevator itself
    buttonElevator = new customButton(499, 0, 283, 99);
    //Close button for hiding the elevator menu
    buttonMenuClose = new customButton(784, 79, 61, 61);
    //Add buttons for all of the floors to an array (index based on the respective floor numbers)
    buttonsElevatorFloors = [new customButton(582, 502, 117, 117),
        new customButton(520, 378, 117, 117),
        new customButton(643, 378, 117, 117),
        new customButton(520, 253, 117, 117),
        new customButton(643, 253, 117, 117),
        new customButton(520, 127, 117, 117),
        new customButton(643, 127, 117, 117)];
    buttonOfficeDoorEnter = new customButton(0, 208, 88, 208);
    buttonOfficeDoorExit = new customButton(1031, 245, 88, 181);
    buttonOfficeDeskKey = new customButton(372, 110, 118, 102);
    buttonOfficeComputer = new customButton(553, 110, 140, 102);
    buttonGetKey = new customButton(750, 252, 445, 320);
    buttonComputerPrint = new customButton(894, 80, 218, 70);
    buttonMenuBack = new customButton(18, 638, 388, 63);
    buttonPrinter = new customButton(880, 0, 318, 300);
    buttonPrintOption1 = new customButton(458, 325, 364, 58);
    buttonPrintOption2 = new customButton(458, 401, 364, 58);
}

function showElevatorButtons() {
    //Play the elevator sound effect
    playSoundEffect("audio/elevatorDing.mp3");
    //Change gamemode to elevator, used when showing the elevator menu UI
    gameMode = "elevator";
}

function showPrinterButtons() {
    //Play the button click sound effect
    playSoundEffect("audio/buttonClick.mp3");
    //Change gamemode to printer, used when showing the print menu UI
    gameMode = "printer";
}

function onMouseClicked() {
    //Do relevant button checks based on the current gamemode
    switch (gameMode) {
        case ("playing"):
            playingClickChecks();
            break;
        case ("elevator"):
            elevatorClickChecks();
            break;
        case ("getKey"):
            getKeyClickChecks();
            break;
        case ("computer"):
            computerClickChecks();
            break;
        case ("printer"):
            printerClickChecks();
            break;
        case ("info"):
            infoScreenClick();
            break;
        case ("mainMenu"):
            if (buttonPlay.isMouseWithinBounds()) {
                loadInfoScreen();
            }
            break;
        case ("start"):
            loadMenu();
            break;
        case ("ending"):
            //Reload the webpage to play again
            window.location.reload(true);
            break;
    }
}

function playingClickChecks() {
    if (showingDialoguePopup) {
        if (displayInput) {
            //If talking to a character and input is required, check if the input confirm button was clicked
            if (dialogueInputConfirmButton.isMouseWithinBounds()) {
                dialogueInputButtonClick();
            }
        }
        else {
            //Check if each of the dialogue option buttons were clicked.
            if (dialogueOptionButtons[0].isMouseWithinBounds()) {
                dialogueOptionButtonClick(0);
            }
            //For the 2nd and 3rd buttons, ensure that they are being used for the current interaction
            //using the length of displayOptions
            else if (dialogueOptionButtons[1].isMouseWithinBounds() && displayOptions.length > 1) {
                dialogueOptionButtonClick(1);
            }
            else if (dialogueOptionButtons[2].isMouseWithinBounds() && displayOptions.length > 2) {
                dialogueOptionButtonClick(2);
            }
        }
    }
    else {
        //If not talking to a character, check if the elevator was clicked (unless in Boss' office or Boss has not been talked to)
        if (buttonElevator.isMouseWithinBounds() && currentRoom.index != 7) {
            if (talkedToBoss) {
                //Show the buttons used to switch floors
                showElevatorButtons();
            }
            else {
                //If the player hasn't talked to a boss, show a message to tell them the elevator can't yet be used
                getCharacterWithName("Can't use Elevator").talkTo();
            }
        }
        //If clicking office door and on the correct floor, load the office room (index 7)
        else if (buttonOfficeDoorEnter.isMouseWithinBounds() && currentRoom.index == 3) {
            actionCount++;
            loadRoom(rooms[7]);
        }
        //If clicking on the printer and on the correct floor, show the printing menu
        else if (buttonPrinter.isMouseWithinBounds() && currentRoom.index == 6) {
            showPrinterButtons();
        }
        //Checks for room 7 (the office)
        else if (currentRoom.index == 7) {
            if (buttonOfficeDoorExit.isMouseWithinBounds()) {
                //If the door is clicked, go back to floor 3
                actionCount++;
                loadRoom(rooms[3]);
            }
            else if (buttonOfficeDeskKey.isMouseWithinBounds()) {
                //If the desk key is clicked, 'zoom in' by showing the key screen
                playSoundEffect("audio/buttonClick2.mp3");
                actionCount++;
                loadKeyScreen();
            }
            else if (buttonOfficeComputer.isMouseWithinBounds()) {
                //If the computer is clicked, 'zoom in' by showing the computer screen
                playSoundEffect("audio/buttonClick.mp3");
                actionCount++;
                loadComputerScreen();
            }
        }
        //Loop through all characters on the current floor
        for (var i = 0; i < currentCharacters.length; i++) {
            //If the current character was clicked...
            if (currentCharacters[i].button.isMouseWithinBounds()) {
                //Increase the action count to show an action was taken
                actionCount++;
                //Talk to the targeted character, this will show dialogue UI etc
                currentCharacters[i].talkTo();
                //If talking to the boss, update the talkedToBoss bool to reflect this
                if (currentCharacters[i].name === "Boss") {
                    talkedToBoss = true;
                }
            }
        }
    }
}

function elevatorClickChecks() {
    //If the close button was clicked, hide elevator buttons and play a click sound
    if (buttonMenuClose.isMouseWithinBounds()) {
        playSoundEffect("audio/buttonClick.mp3");
        gameMode = "playing";
    }
    //Loop through all elevator floor buttons
    for (var i = 0; i < buttonsElevatorFloors.length; i++) {
        //If the current button was clicked...
        if (buttonsElevatorFloors[i].isMouseWithinBounds()) {
            //Ensure the button doesn't lead to the floor we are already on
            //AND that the chosen floor is accessable from the current one
            if (i != currentRoom.index && currentRoom.accessableFloors[i] === 1) {
                //Only allow floor 5 to be accessed if the player has the key
                if (i != 5 || playerHasKey) {
                    //Increase action count and load the chosen room
                    actionCount++;
                    loadRoom(rooms[i]);
                    //Hide the elevator UI by returning to playing gamemode
                    gameMode = "playing";

                    //Room exit events
                    //Leaving floor 2
                    if (i != 2 && showBossBath) {
                        hasBossBathOccured = true;
                        showBossBath = false;
                    }
                }
            }
        }
    }
}

function getKeyClickChecks() {
    //If the back button is pressed while viewing the key, return to the office room and return to playing gamemode
    if (buttonMenuBack.isMouseWithinBounds()) {
        playSoundEffect("audio/buttonClick.mp3");
        gameMode = "playing"
        loadRoom(rooms[7]);
    }
    //Otherwise if the key itself is clicked (and is not already taken),
    //set the playerHasKey bool to true and load the Boss into the office room for an interaction
    else if (buttonGetKey.isMouseWithinBounds() && !playerHasKey) {
        playerHasKey = true;
        var characterBoss = getCharacterWithName("Boss");
        characterBoss.moveToFloor(7, 12, 890, 221);
        characterBoss.talkTo();
        gameMode = "playing"
        loadRoom(rooms[7]);
    }
}

function computerClickChecks() {
    //If the back button is pressed while viewing the computer, return to the office room and return to playing gamemode
    if (buttonMenuBack.isMouseWithinBounds()) {
        playSoundEffect("audio/buttonClick.mp3");
        gameMode = "playing"
        loadRoom(rooms[7]);
    }
    //Otherwise if the print button is clicked, update the printEmail bool to show this
    //and display a message by 'talking' to the printer 'character' (using character system for a message)
    else if (buttonComputerPrint.isMouseWithinBounds()) {
        printEmail = true;
        getCharacterWithName("Sent to Printer").talkTo();
        //Return to the office room and set gamemode back to playing
        gameMode = "playing"
        loadRoom(rooms[7]);
    }
}

function printerClickChecks() {
    //If the close button was clicked, hide the printer menu and play a click sound
    if (buttonMenuClose.isMouseWithinBounds()) {
        playSoundEffect("audio/buttonClick.mp3");
        gameMode = "playing";
    }
    //Depending on which print job is chosen, show a relevant ending
    else if (buttonPrintOption1.isMouseWithinBounds()) {
        printOption1Ending();
    }
    else if (printEmail && buttonPrintOption2.isMouseWithinBounds()) {
        printOption2Ending();
    }
}

function onMouseMoved(e) {
    //Get the x and y coordinates of the mouse pointer using the bounds of the canvas
    //so checks can be done to see if the pointer is inside a button
    var bound = canvas.getBoundingClientRect();
    mouseX = e.clientX - bound.left - canvas.clientLeft;
    mouseY = e.clientY - bound.top - canvas.clientTop;

    //If the menu screen is showing
    if (gameMode == "mainMenu") {
        //Do play button mouse over checks
        if (buttonPlay.isMouseWithinBounds()) {
            if (!buttonPlayHover) {
                //Toggle buttonPlayHover to keep track of whether the mouse is over the button
                buttonPlayHover = true;
                //Set the canvas background to the menu image (with hovered button)
                canvas.style.background = "url('images/background_menuPlayHover.png')";
                //Play the button hover sound to give the player some more feedback on their action
                playSoundEffect("audio/buttonHover.mp3");
            }
        }
        else {
            if (buttonPlayHover) {
                //Toggle buttonPlayHover to keep track of whether the mouse is over the button
                buttonPlayHover = false;
                //Set the canvas background to the menu image
                canvas.style.background = "url('images/background_menu.png')";
            }
        }
    }
}

function infoScreenClick() {
    //Switch gameMode from info to playing and load the start room
    gameMode = "playing"
    loadRoom(rooms[0]);
    //Play the button click sound effect
    playSoundEffect("audio/buttonClick.mp3");
}

function dialogueInputButtonClick() {
    //If the player has entered some text into the input field
    if (dialogueInputField.value.trim() != "") {
        //Set the user name to their input and respond to the current interaction
        userNameInput = dialogueInputField.value;
        interactingCharacter.interactionResponse(0);
    }
}

function dialogueOptionButtonClick(index) {
    //Respond to the current character interaction with the chosen button index depending on the player's choice
    interactingCharacter.interactionResponse(index);
}

//The customButton object constructor
function customButton(startX, startY, width, height) {
    this.startX = startX;
    this.startY = startY;
    this.width = width;
    this.height = height;
}

//isMouseWithinBounds returns a boolean value based on whether the
//mouse pointer is within the boundaries of the customButton
customButton.prototype.isMouseWithinBounds = function () {
    if (mouseX >= this.startX && mouseX <= this.startX + this.width &&
        mouseY >= this.startY && mouseY <= this.startY + this.height) {
        return true;
    }
    return false;
}
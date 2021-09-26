/////////////////////////
// MAIN GAME FUNCTIONS //
/////////////////////////

//Global variables:
//=================
var gameMode = "start";     //Used to keep track of the current game mode so appropriate code can be run
var canvas;                 //A reference to the HTML canvas object
var context;                //The context of the canvas object, used for drawing sprites/text etc.
var mouseX, mouseY;         //Used to keep track of the mouse position
var currentRoom;            //The room that is currently loaded
var currentCharacters = []; //An array of the characters in the currently loaded room
var transitionFade = 0;     //The opacity of character sprites during a screen transition
var playerHasKey = false;   //Whether or not the player has the key, used to determine if they can access floor 5
var printEmail = false;     //Whether or not the player has chosen to print the Boss' private email
var talkedToBoss = false;   //Whether or not the player has talked to the Boss, determines if they can use the elevator

var bossSatisfaction = 10;  //How satisfied the boss is with player's decisions. Updated as different choices are made.
var actionCount = 0;        //How many times the player has interacted/moved floors, used to encourage them to replay and complete the story quicker

//Create all images that will be used to display sprites in the game
var imgSatisfactionBar = new Image(); imgSatisfactionBar.src = "images/barSatisfaction.png";
var imgSatisfactionFill = new Image(); imgSatisfactionFill.src = "images/barSatisfactionFill.png";
var imgPlayer = new Image(); imgPlayer.src = "images/characterPlayer.png";
var imgBath = new Image(); imgBath.src = "images/bath.png";

function setupGame() {
    canvas = document.getElementById("canvas");                 //Create the canvas element that will be used to display game graphics
    context = canvas.getContext("2d");                          //Get the context that will be used to draw to the canvas

    dialogueInputField = document.getElementById("dialogueInput");
    dialogueInputField.style.visibility = "hidden";

    document.getElementById("muteButton").hidden = true;        //Hide the mute button as there is currently no audio to mute
    document.addEventListener("click", onMouseClicked, false);  //Register click and mousemove events. The onMouseClicked and onMouseMoved
    document.addEventListener("mousemove", onMouseMoved, false);//  functions will be called when these events occur

    loadStartScreen();      //Load the start screen by setting canvas background
    setupAudioSources();    //Create audio elements for playing music/sound effects
    setupRooms();           //Add all rooms that will be used to a rooms array
    setupCharacters();      //Add all interactable characters to a characters array

    createPlayButton();     //Create a custom play button used to start the game
    createDialogueButtons();//Create dialogue buttons so the player can make choices 
    createActionButtons();  //Create buttons that can be used to perform actions such as move between floors/print a document

    update(); //Start the update function which will be called every animation frame
}

function update() {
    //Clear the canvas so images can be redrawn for this frame
    context.clearRect(0, 0, canvas.width, canvas.height);

    //Increase the opacity at which character sprites will be shown for a 'fade in' effect when transitioning between floors
    if (transitionFade < 1) {
        transitionFade += 0.05;
    }
    //Set the alpha value of the canvas to the fade amount
    context.globalAlpha = transitionFade;

    //Check if in-game, i.e. not in a menu/start/end screen
    var inGameDraw = (gameMode === "playing" || gameMode === "elevator" || gameMode == "printer");
    //If in-game, draw character sprites
    if (inGameDraw) {
        drawCharacters();
    }

    //Set the canvas alpha back to 1 so UI is always drawn fully opaque
    context.globalAlpha = 1;
    //If in-game, draw UI elements such as satisfaction bar and dialogue box
    if (inGameDraw) {
        drawUI();
    }
    else if (gameMode === "ending") {
        //Draw some text to show the player their final action count when they reach an ending
        context.font = "22px Times New Roman";
        context.fillStyle = "#4d4c49";
        context.textAlign = "center";
        context.fillText("Final action count: " + actionCount, canvas.width / 2, 45);
    }

    //Trigger a dialogue update, which is used for animating dialogue text
    dialogueUpdate();

    //Trigger update again on the next animation frame
    requestAnimationFrame(update);
}

function drawCharacters() {
    //Draw the player sprite
    drawSprite(imgPlayer, 690, 231, 0, 1, 1);
    //Check for characters that are on this floor and draw them if they are
    for (var i = 0; i < characters.length; i++) {
        if (characterImages[i] != null && characters[i].floorNum === currentRoom.index) {
            drawSprite(characterImages[i], characters[i].xPos, characters[i].yPos, 0, 1, 1);
        }
    }

    if (showBossBath) {
        drawSprite(imgBath, 238, 315, 0, 1, 1);
    }
}

function drawUI() {
    //Draw the satisfaction bar to give the player a visual representation of boss satisfaction
    drawSprite(imgSatisfactionBar, 10, 15, 0, 1, 1);
    //Draw the satisfaction fill shape, scaled based on bossSatisfaction to show how filled the bar is
    drawSprite(imgSatisfactionFill, 83, 35, 0, (bossSatisfaction / 10), 1);
    //Also show the satisfaction value as a percentage in text to make the exact value clear
    context.font = "17px Times New Roman";
    context.fillStyle = "#e2dfd6";
    context.textAlign = "left";
    //This is the text to show, bossSatisfaction is multiplied by 10 to get a percentage value
    var satisfactionText = "Boss satisfaction: " + (bossSatisfaction * 10) + "%";
    //Text to display the action count
    var actionText = "Action count: " + actionCount;
    //Draw text with the satisfaction & action count values
    context.fillText(satisfactionText, 83, 21);
    context.fillText(actionText, 83, 88);

    //Check if we are currently talking to a character
    if (showingDialoguePopup) {
        //Get x/y position of the dialogue popup
        var popupX = 20, popupY = canvas.height - 210;
        //Draw the background of the dialogue UI
        drawSprite(imgDialogueBg, popupX, popupY, 0, 1, 1);
        if (displayInput) {
            //If the player should input text, show the input confirm button
            drawSprite(imgDialogueConfirmBtn, popupX, popupY, 0, 1, 1);
        }
        else {
            //Otherwise, draw dislogue choice buttons based on the number of options for this interaction
            drawSprite(imgDialogueOption1Btn, popupX, popupY, 0, 1, 1);
            if (displayOptions.length > 1) {
                drawSprite(imgDialogueOption2Btn, popupX, popupY, 0, 1, 1);
            }
            if (displayOptions.length > 2) {
                drawSprite(imgDialogueOption3Btn, popupX, popupY, 0, 1, 1);
            }
            //And draw the text to be displayed on these buttons
            drawOptionButtonText();
        }
        //Draw the text which will show the current dialogue of the character
        drawDialogueText();
        //Draw the name of the character to make it clear who is talking
        drawCharacterName();
    }
    //If the elevator UI should be showing, draw the elevator buttons so the player can move floors
    else if (gameMode == "elevator") {
        drawElevatorButtons();
    }
    //If the printer UI should be showing, draw the printer menu so the player can choose what to print
    else if (gameMode == "printer") {
        drawPrinterButtons();
    }
}

function drawElevatorButtons() {
    //Draw the background for the elevator UI
    drawSprite(imgElevatorBg, 0, 0, 0, 1, 1);
    //Loop through the number of floors/buttons
    for (var i = 0; i < 7; i++) {
        //If the 'i'th floor is not accessable from the current one, draw a greyed-out button
        //Also always draw a disabled button for floor 5 is the player has no key
        if (currentRoom.accessableFloors[i] === 0 || (i == 5 && !playerHasKey)) {
            drawSprite(imgsElevatorButtonsOff[i], 0, 0, 0, 1, 1);
        }
        //Otherwise, draw a lit button to show the floor is accessable
        else {
            drawSprite(imgsElevatorButtonsOn[i], 0, 0, 0, 1, 1);
        }
    }
}

function drawPrinterButtons() {
    if (printEmail) {
        drawSprite(imgPrinter2, 0, 0, 0, 1, 1);
    }
    else {
        drawSprite(imgPrinter1, 0, 0, 0, 1, 1);
    }
}

function drawSprite(imageObject, x, y, rotationDegrees, scaleX, scaleY) {
    //Get the width/height of the given image to use when drawing the sprite
    var width = imageObject.width;
    var height = imageObject.height;
    //Save the current canvas state
    context.save();
    //Translate, rotate and scale sprite so it displays correctly based on parameters
    context.translate(x, y);
    context.rotate(Math.PI / 180 * rotationDegrees);
    context.scale(scaleX, scaleY);
    //Draw the image with the correct width/height values
    context.drawImage(imageObject, 0, 0, width, height);
    //Restore the canvas state
    context.restore();
}

function loadStartScreen() {
    //Set the canvas background to the start screen image and change the gameMode
    //so the correct UI can be shown and relevant input checks can be done
    canvas.style.background = "url('images/background_start.png')";
    gameMode = "start";
}

function loadInfoScreen() {
    //Set the canvas background to the info screen image and change the gameMode
    //so the correct UI can be shown and relevant input checks can be done
    canvas.style.background = "url('images/background_info.png')";
    gameMode = "info";
    //Play the button click sound effect
    playSoundEffect("audio/buttonClick.mp3");
}

function loadMenu() {
    //Set the canvas background to the menu image and change the gameMode
    //so the correct UI can be shown and relevant input checks can be done
    canvas.style.background = "url('images/background_menu.png')";
    document.getElementById("muteButton").hidden = false;
    gameMode = "mainMenu";
    //Start playing background music
    playBackgroundMusic();
    //Play the button click sound effect
    playSoundEffect("audio/buttonClick.mp3");
}

function loadRoom(roomToLoad) {

    //Room enter events
    switch (roomToLoad.index) {
        case (2):
            //Entering floor 2
            if (!hasBossBathOccured) {
                getCharacterWithName("Boss").moveToFloor(2, 7, 300, 221);
                showBossBath = true;
            }
            break;
    }

    //Set transitionFade to 0 so that new character sprites will fade in
    transitionFade = 0;
    //Ensure we have a reference to the current room
    currentRoom = roomToLoad;
    //Set the background to the appropriate room image,
    //For the Boss' office (floor 7) this changes depending on if the player has the key to floor 5
    if (playerHasKey && roomToLoad.index == 7) {
        canvas.style.background = "url('images/" + roomToLoad.backgroundImage + "_noKey.png')";
    }
    else {
        canvas.style.background = "url('images/" + roomToLoad.backgroundImage + ".png')";
    }
    //Reset the array of characters as the characters on the previous floor are no longer needed
    currentCharacters = [];
    //Add all characters with the appropriate floor number to the currentCharacters array
    //so the correct characters for this floor will be shown
    for (var i = 0; i < characters.length; i++) {
        if (characters[i].floorNum === roomToLoad.index) {
            currentCharacters.push(characters[i]);
        }
    }
}

function loadKeyScreen() {
    //Set the canvas background to the fired image and change the gameMode
    //so the correct UI can be shown and relevant input checks can be done
    if (playerHasKey) {
        canvas.style.background = "url('images/background_letters.png')";
    }
    else {
        canvas.style.background = "url('images/background_lettersWithKey.png')";
    }
    gameMode = "getKey";
}

function loadComputerScreen() {
    //Set the canvas background to the fired image and change the gameMode
    //so the correct UI can be shown and relevant input checks can be done
    canvas.style.background = "url('images/background_computer.png')";
    gameMode = "computer";
}

function printOption1Ending() {
    //The player chose to print the Boss' private document
    if (bossSatisfaction > 6) {
        //Show the teamed up ending if satisfaction is high
        loadEndScreen("teamedUp");
    }
    else {
        //Otherwise show the royal mess ending
        loadEndScreen("aRoyalMess");
    }
}

function printOption2Ending() {
    //The player chose to expose the boss, show the correct end screen
    loadEndScreen("exposed");
}


function loadEndScreen(ending) {
    canvas.style.background = "url('images/background_" + ending + ".png')";
    gameMode = "ending";
    //Hide the mute button, the player has no reason to change audio settings now since the game had ended
    document.getElementById("muteButton").hidden = true;
    //Stop background music if it's currently playing
    bgMusicSrc.pause();
    if (ending === "fired") {
        //If getting fired, play the fired sound to give the screen more impact
        playSoundEffect("audio/fired.mp3");
    }
    else {
        playSoundEffect("audio/endJingle.mp3");
    }
}
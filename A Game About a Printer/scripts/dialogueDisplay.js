var userNameInput = "";         //Player input when prompted for their name
var animatingDialogue = false;  //Is the dialogue text currently being animated? (i.e. being drawn letter-by-letter)
var dialogueTextComplete = "";  //The complete dialogue text for the current interaction
var dialogueTextCurrent = "";   //The dialogue text that is currently being shown while animating (e.g. could be a few words out of the complete sentence)
var dialogueAnimationIndex;     //The index of the character to add to dialogueTextCurrent on the next frame of animation
var dialogueAnimationMax;       //The max length of the current dialogue text, used to determine when animating is done
var displayName;                //Name to show for the character the player is talking to
var displayOptions;             //Array of the different text options that the player can choose from
var displayInput;               //Boolean value, stores whether or not user input is required for the current interaction
var interactingCharacter;       //The character the player is currently interacting with

//Whether or not dialogue UI is being shown
var showingDialoguePopup = false;

//The HTML input element that the player will use to enter text
var dialogueInputField;

//Images for the dialogue UI - background, option buttons and input confirm button
var imgDialogueBg = new Image();
imgDialogueBg.src = "images/dialoguePopupBg.png";
var imgDialogueOption1Btn = new Image();
imgDialogueOption1Btn.src = "images/dialoguePopupBtn1.png";
var imgDialogueOption2Btn = new Image();
imgDialogueOption2Btn.src = "images/dialoguePopupBtn2.png";
var imgDialogueOption3Btn = new Image();
imgDialogueOption3Btn.src = "images/dialoguePopupBtn3.png";
var imgDialogueConfirmBtn = new Image();
imgDialogueConfirmBtn.src = "images/dialoguePopupBtn4.png";

//Register keydown event, the onKeyDown function will be called when a key is pressed
document.addEventListener("keydown", onKeyDown, true);

function dialogueUpdate() {
    if (gameMode === "playing") {
        //If in the playing gamemode and the dialogue index has not reached its maximum,
        //add another character using the index and increase the index by 1
        if (dialogueAnimationIndex < dialogueAnimationMax) {
            dialogueTextCurrent += dialogueTextComplete[dialogueAnimationIndex];
            dialogueAnimationIndex++;
        }
        //If done animating, set the animatingDialogue bool to false
        else {
            animatingDialogue = false;
        }
    }
}

function onKeyDown(e) {
    //When spacebar is pressed
    if (e.keyCode == 32) {
        //Skip to the end of the dialogue animation so the player can read more quickly if desired
        if (animatingDialogue) {
            dialogueTextCurrent = dialogueTextComplete;
            dialogueAnimationIndex = dialogueAnimationMax;
        }
    }
}

function showDialoguePopup(characterName, dialogueText, requiresUserInput, options, soundLength) {
    //Set all of the necessary variables to values that were passed to this function
    //so the popup will display as intended
    displayName = characterName;
    displayOptions = options;
    displayInput = requiresUserInput;
    dialogueTextComplete = dialogueText;
    dialogueTextCurrent = "";
    dialogueAnimationIndex = 0;
    dialogueAnimationMax = dialogueText.length;
    animatingDialogue = true;

    //If user input is needed, show the input field and focus on it so the player can immediately start typing
    if (requiresUserInput) {
        dialogueInputField.style.visibility = "visible";
        dialogueInputField.focus();
    }
    //Otherwise, hide the input field as it isn't needed
    else {
        dialogueInputField.style.visibility = "hidden";
    }

    //Play a printing sound based on the length of the dialogue being shown
    playSoundEffect("audio/printing" + soundLength + ".mp3");

    //set showingDialoguePopup to true so the update function and button checks know to enable/disable certain functionality
    showingDialoguePopup = true;
}

function hideDialoguePopup() {
    //Hide the input field and all dialogue UI
    dialogueInputField.style.visibility = "hidden";
    showingDialoguePopup = false;
}

function drawCharacterName() {
    //Set the text display style and draw the character's name to the screen
    context.font = "bold 23px Times New Roman";
    context.fillStyle = "#4d4c49";
    context.textAlign = "center";
    context.fillText(displayName, 140, 537);
}

function drawOptionButtonText() {
    //x and y position to draw text
    var yPos = 687;
    var xPos;
    //Set text display style
    context.font = "21px Times New Roman";
    context.fillStyle = "#4d4c49";
    context.textAlign = "center";

    //Loop through the display options and update the x position for the text
    //based on which button it should be drawn on top of
    for (var i = 0; i < displayOptions.length; i++) {
        if (i == 0) { //First button position
            xPos = 230;
        }
        else if (i === 1) { //2nd button posiion
            xPos = 640;
        }
        else { //3rd button position
            xPos = 1051;
        }
        //Draw the text for the option at this index
        context.fillText(displayOptions[i], xPos, yPos);
    }
}

function drawDialogueText() {
    const textAreaWidth = 1180; //The total width than one line of text can cover
    const lineSize = 24;        //The spacing between lines of text
    var currentLine = "";       //The current line of text to draw
    var lineCount = 1;          //The number of lines of text
    var wordArray = dialogueTextCurrent.split(" "); //Split the dialogue string into an array of words

    //Set text display style
    context.font = "23px Times New Roman";
    context.fillStyle = "#4d4c49";
    context.textAlign = "left";

    //Loop through each word in the current dialogue
    for (var i = 0; i < wordArray.length; i++) {
        //If the width the line of text after this word is added is less than the total allowed width,
        //we can keep drawing to the current line, so add the new word and a space
        if (context.measureText(currentLine + wordArray[i] + " ").width <= textAreaWidth) {
            currentLine += (wordArray[i] + " ");
        }
        //Otherwise the text has overflowed the current line, so draw the line as it is,
        //increase the line count and start a new line by resetting currentLine to just the new word and a space
        else {
            context.fillText(currentLine, 30, canvas.height - 165 + (lineCount * lineSize));
            lineCount++;
            currentLine = wordArray[i] + " ";
        }
    }
    //Ensure the final line gets drawn. The position at which text is drawn is based on lineCount and lineSize
    //so lines are spaced evenly and are not drawn on top of each other
    context.fillText(currentLine, 30, canvas.height - 160 + (lineCount * lineSize));
}